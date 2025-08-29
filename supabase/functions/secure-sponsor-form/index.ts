import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SponsorFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  sponsorshipType?: string;
  message?: string;
  captchaToken?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: SponsorFormRequest = await req.json();
    console.log("Received sponsor form submission:", { email: formData.email });

    // Extract security information
    const ipAddress = req.headers.get("cf-connecting-ip") || 
                     req.headers.get("x-forwarded-for") ||
                     req.headers.get("x-real-ip") || 
                     "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check rate limits
    const { data: rateLimitOk } = await supabase
      .rpc('check_sponsor_rate_limit', { 
        _email: formData.email, 
        _ip_address: ipAddress 
      });

    if (!rateLimitOk) {
      console.log("Rate limit exceeded for:", { email: formData.email, ip: ipAddress });
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { 
          status: 429, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    // TODO: Verify hCaptcha token if provided
    // if (formData.captchaToken) {
    //   const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     body: new URLSearchParams({
    //       secret: Deno.env.get('HCAPTCHA_SECRET_KEY')!,
    //       response: formData.captchaToken
    //     })
    //   });
    //   const captchaResult = await captchaResponse.json();
    //   if (!captchaResult.success) {
    //     return new Response(
    //       JSON.stringify({ error: "Captcha verification failed" }),
    //       { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }}
    //     );
    //   }
    // }

    // Insert sponsor form submission into database
    const { error: dbError } = await supabase
      .from('sponsor_form_submissions')
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        sponsorship_type: formData.sponsorshipType,
        message: formData.message,
        ip_address: ipAddress,
        user_agent: userAgent
      });

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save form submission" }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders }
        }
      );
    }

    console.log("Form submission saved successfully");

    // Send emails using Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    try {
      // Send confirmation email to user
      await resend.emails.send({
        from: "PARIS 2025 Conference <info@puentesparis2025.net>",
        to: [formData.email],
        subject: "Thank you for your sponsorship inquiry - PARIS 2025",
        html: `
          <h1>Thank you for your interest in sponsoring PARIS 2025!</h1>
          <p>Dear ${formData.firstName} ${formData.lastName},</p>
          <p>We have received your sponsorship inquiry and truly appreciate your interest in supporting the PARIS 2025 Conference.</p>
          <p><strong>Your submission details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            ${formData.phone ? `<li><strong>Phone:</strong> ${formData.phone}</li>` : ''}
            ${formData.organization ? `<li><strong>Organization:</strong> ${formData.organization}</li>` : ''}
            ${formData.sponsorshipType ? `<li><strong>Sponsorship Interest:</strong> ${formData.sponsorshipType}</li>` : ''}
          </ul>
          ${formData.message ? `<p><strong>Your message:</strong><br>${formData.message}</p>` : ''}
          <p>Our team will review your inquiry and get back to you within 2-3 business days with sponsorship details and opportunities.</p>
          <p>Thank you again for your heart to support this important gathering of church leaders and missionaries.</p>
          <p>Blessings,<br>The PARIS 2025 Team</p>
        `,
      });

      // Send notification email to admin
      await resend.emails.send({
        from: "PARIS 2025 Conference <info@puentesparis2025.net>",
        to: ["info@puentesparis2025.net"],
        subject: `New Sponsorship Inquiry - ${formData.firstName} ${formData.lastName}`,
        html: `
          <h1>New Sponsorship Inquiry Received</h1>
          <p><strong>Sponsor Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            ${formData.phone ? `<li><strong>Phone:</strong> ${formData.phone}</li>` : ''}
            ${formData.organization ? `<li><strong>Organization:</strong> ${formData.organization}</li>` : ''}
            ${formData.sponsorshipType ? `<li><strong>Sponsorship Interest:</strong> ${formData.sponsorshipType}</li>` : ''}
          </ul>
          ${formData.message ? `<p><strong>Message:</strong><br>${formData.message}</p>` : ''}
          <p><strong>Submission Info:</strong></p>
          <ul>
            <li><strong>IP Address:</strong> ${ipAddress}</li>
            <li><strong>User Agent:</strong> ${userAgent}</li>
            <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
          </ul>
        `,
      });

      console.log("Emails sent successfully");
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the request if email fails, but log it
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Sponsorship inquiry submitted successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error) {
    console.error("Error in secure-sponsor-form function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);