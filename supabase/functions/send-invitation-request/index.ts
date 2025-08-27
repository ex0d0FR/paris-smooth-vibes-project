import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Define the shape of the invitation request
interface InvitationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  language: string;
  purpose: string;
  address: string;
  nationality: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: InvitationRequest = await req.json();
    
    // Extract client information for security tracking
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    console.log("Processing invitation request for:", requestData.email, "from IP:", ipAddress);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save to database with security information
    const { data: savedRequest, error: dbError } = await supabase
      .from('invitation_requests')
      .insert({
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        email: requestData.email,
        phone: requestData.phone,
        organization: requestData.organization,
        language: requestData.language,
        purpose: requestData.purpose,
        address: requestData.address,
        nationality: requestData.nationality,
        status: 'pending',
        ip_address: ipAddress !== 'unknown' ? ipAddress : null,
        user_agent: userAgent
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      
      // Log security event for failed attempts
      try {
        await supabase.rpc('log_invitation_security_event', {
          _event_type: 'submission_failed',
          _email: requestData.email,
          _ip_address: ipAddress !== 'unknown' ? ipAddress : null,
          _user_agent: userAgent,
          _details: { error: dbError.message }
        });
      } catch (logError) {
        console.error("Failed to log security event:", logError);
      }
      
      // Handle specific validation errors with user-friendly messages
      if (dbError.message.includes('Rate limit exceeded')) {
        throw new Error('You have submitted too many requests recently. Please try again later.');
      } else if (dbError.message.includes('already exists within the last 24 hours')) {
        throw new Error('You have already submitted a request recently. Please check your email or wait 24 hours before submitting again.');
      } else if (dbError.message.includes('Invalid email format')) {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error("Failed to save request. Please try again.");
      }
    }

    console.log("Request saved to database:", savedRequest.id);

    // Log successful submission for security monitoring
    try {
      await supabase.rpc('log_invitation_security_event', {
        _event_type: 'submission_success',
        _email: requestData.email,
        _ip_address: ipAddress !== 'unknown' ? ipAddress : null,
        _user_agent: userAgent,
        _details: { request_id: savedRequest.id }
      });
    } catch (logError) {
      console.error("Failed to log security event:", logError);
    }

    // Send emails using Resend (confirmation to user and notification to admin)
    try {
      const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

      const userEmail = await resend.emails.send({
        from: "Invitations <info@puentesparis2025.net>",
        to: [requestData.email],
        subject: "Invitation Letter Request Received - PARIS 2025",
        html: `
          <h1>Dear ${requestData.firstName} ${requestData.lastName},</h1>
          <p>Thank you for submitting your invitation letter request for the PARIS 2025 conference.</p>
          <h2>Request Details:</h2>
          <ul>
            <li><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</li>
            <li><strong>Email:</strong> ${requestData.email}</li>
            <li><strong>Organization:</strong> ${requestData.organization || 'Not specified'}</li>
            <li><strong>Nationality:</strong> ${requestData.nationality}</li>
            <li><strong>Language:</strong> ${requestData.language}</li>
          </ul>
          <p><strong>Important:</strong> Processing time for invitation letters is 5-7 business days. We will contact you once your invitation letter is ready.</p>
          <p>If you have any questions, please contact us at info@puentesparis2025.net</p>
          <p>Best regards,<br/>The PARIS 2025 Conference Team</p>
        `,
      });

      const adminEmail = await resend.emails.send({
        from: "Invitations <info@puentesparis2025.net>",
        to: ["info@puentesparis2025.net"],
        subject: "New Invitation Letter Request",
        html: `
          <h1>New Invitation Request</h1>
          <ul>
            <li><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</li>
            <li><strong>Email:</strong> ${requestData.email}</li>
            <li><strong>Phone:</strong> ${requestData.phone || 'N/A'}</li>
            <li><strong>Organization:</strong> ${requestData.organization || 'N/A'}</li>
            <li><strong>Nationality:</strong> ${requestData.nationality}</li>
            <li><strong>Language:</strong> ${requestData.language}</li>
            <li><strong>Address:</strong> ${requestData.address}</li>
            <li><strong>Purpose:</strong> ${requestData.purpose}</li>
          </ul>
        `,
      });

      console.log("Emails sent via Resend:", { userEmail, adminEmail });
    } catch (emailError) {
      console.error("Email sending failed, but request saved:", emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Invitation letter request submitted successfully",
        requestId: savedRequest.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error processing invitation request:", error);
    
    // Return specific error messages for better user experience
    const errorMessage = error.message || 'An unexpected error occurred. Please try again.';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      {
        status: errorMessage.includes('Rate limit') || errorMessage.includes('already exists') ? 429 : 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);