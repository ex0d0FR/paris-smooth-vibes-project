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
    
    console.log("Processing invitation request for:", requestData.email);

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save to database
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
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save request to database");
    }

    console.log("Request saved to database:", savedRequest.id);

    // Send confirmation email using Resend
    try {
      const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
      
      const emailResponse = await resend.emails.send({
        from: "PARIS 2025 <onboarding@resend.dev>",
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
          <p>Best regards,<br>The PARIS 2025 Conference Team</p>
        `,
      });

      console.log("Confirmation email sent successfully:", emailResponse);
    } catch (emailError) {
      console.error("Email sending failed, but request was saved:", emailError);
      // Don't fail the entire request if email fails
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
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);