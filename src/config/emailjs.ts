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
  SERVICE_ID: 'puentesParis', // Replace with your EmailJS Service ID
  TEMPLATE_ID: 'template_yjs45hm', // Replace with your EmailJS Template ID
  PUBLIC_KEY: 'sg6kJuqGNacHm2_Un' // Replace with your EmailJS Public Key
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