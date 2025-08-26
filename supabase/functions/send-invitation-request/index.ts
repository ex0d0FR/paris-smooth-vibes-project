import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

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

    // Email sending is now handled by the frontend via EmailJS

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