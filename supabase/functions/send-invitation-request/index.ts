import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
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

    // Send email to the organization
    const emailResponse = await resend.emails.send({
      from: "PARIS 2025 <onboarding@resend.dev>",
      to: ["info@puentesparis2025.net"],
      subject: `Invitation Letter Request - ${requestData.firstName} ${requestData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">
            Invitation Letter Request
          </h1>
          
          <h2 style="color: #1e3a8a; margin-top: 30px;">Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold;">Name:</td>
              <td style="padding: 12px; border: 1px solid #d1d5db;">${requestData.firstName} ${requestData.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold;">Email:</td>
              <td style="padding: 12px; border: 1px solid #d1d5db;">${requestData.email}</td>
            </tr>
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold;">Phone:</td>
              <td style="padding: 12px; border: 1px solid #d1d5db;">${requestData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold;">Nationality:</td>
              <td style="padding: 12px; border: 1px solid #d1d5db;">${requestData.nationality}</td>
            </tr>
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold;">Organization:</td>
              <td style="padding: 12px; border: 1px solid #d1d5db;">${requestData.organization}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold;">Preferred Language:</td>
              <td style="padding: 12px; border: 1px solid #d1d5db;">${requestData.language}</td>
            </tr>
          </table>

          <h3 style="color: #1e3a8a; margin-top: 30px;">Address</h3>
          <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #fbbf24; margin: 10px 0;">
            ${requestData.address.replace(/\n/g, '<br>')}
          </div>

          <h3 style="color: #1e3a8a; margin-top: 30px;">Purpose of Visit</h3>
          <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #fbbf24; margin: 10px 0;">
            ${requestData.purpose.replace(/\n/g, '<br>')}
          </div>

          <hr style="margin: 30px 0; border: 1px solid #d1d5db;">
          
          <p style="color: #6b7280; font-size: 14px;">
            This request was submitted through the PARIS 2025 conference website.
            <br>
            <strong>Processing time:</strong> 5-7 business days
          </p>
        </div>
      `,
    });

    // Send confirmation email to the requester
    const confirmationResponse = await resend.emails.send({
      from: "PARIS 2025 <onboarding@resend.dev>",
      to: [requestData.email],
      subject: "Invitation Letter Request Received - PARIS 2025",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">
            Thank you for your request!
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Dear ${requestData.firstName} ${requestData.lastName},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            We have received your invitation letter request for the PARIS 2025 conference. 
            Our team will process your request and contact you within <strong>5-7 business days</strong>.
          </p>
          
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">Request Summary:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Name:</strong> ${requestData.firstName} ${requestData.lastName}</li>
              <li><strong>Organization:</strong> ${requestData.organization}</li>
              <li><strong>Preferred Language:</strong> ${requestData.language}</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            If you have any urgent questions, please contact us at: 
            <a href="mailto:info@puentesparis2025.net" style="color: #fbbf24;">info@puentesparis2025.net</a>
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>PARIS 2025 Conference Team</strong>
          </p>
          
          <hr style="margin: 30px 0; border: 1px solid #d1d5db;">
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { emailResponse, confirmationResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Invitation letter request submitted successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-invitation-request function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
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