// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template with these variables:
//    - from_name: {{from_name}}
//    - from_email: {{from_email}}
//    - phone: {{phone}}
//    - organization: {{organization}}
//    - language: {{language}}
//    - purpose: {{purpose}}
//    - address: {{address}}
//    - nationality: {{nationality}}
//    - to_email: {{to_email}}
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'puentesParis',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_yjs45hm',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Gm-hmr2B5CQH9F2w-nntP'
};

// Email template variables that will be used:
// - from_name: Sender's full name
// - from_email: Sender's email address
// - phone: Sender's phone number
// - organization: Sender's organization/church
// - language: Preferred letter language
// - purpose: Purpose of visit description
// - address: Full address including country
// - nationality: Sender's nationality
// - to_email: Recipient email (info@puentesparis2025.net)