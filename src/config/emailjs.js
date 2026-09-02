// EmailJS Configuration
// Untuk menggunakan EmailJS, ikuti langkah berikut:

// 1. Daftar di https://www.emailjs.com/
// 2. Buat service baru (Gmail, Outlook, dll)
// 3. Buat email template
// 4. Dapatkan Service ID, Template ID, dan Public Key
// 5. Ganti nilai di bawah ini dengan kredensial Anda

export const emailjsConfig = {
  // Service ID dari EmailJS dashboard
  serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_e7glfot',
  
  // Template ID dari EmailJS dashboard  
  templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_gisc8ed',
  
  // Public Key dari EmailJS dashboard
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ritmFnMqZLzw3He8x'
};

// Template email yang disarankan:
// Subject: New message from {{from_name}} - {{subject}}
// Body:
// Name: {{from_name}}
// Email: {{from_email}}
// Subject: {{subject}}
// 
// Message:
// {{message}}
// 
// ---
// This message was sent from your portfolio contact form.

// Template variables yang digunakan:
// - from_name: Nama pengirim
// - from_email: Email pengirim  
// - subject: Subjek pesan
// - message: Isi pesan
// - to_email: Email tujuan (hi.gregoriusjoel@gmail.com)
// - reply_to: Email untuk reply (sama dengan from_email)

export default emailjsConfig;