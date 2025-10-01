// EmailJS Configuration
// Untuk menggunakan EmailJS, ikuti langkah berikut:

// 1. Daftar di https://www.emailjs.com/
// 2. Buat service baru (Gmail, Outlook, dll)
// 3. Buat email template
// 4. Dapatkan Service ID, Template ID, dan Public Key
// 5. Ganti nilai di bawah ini dengan kredensial Anda

export const emailjsConfig = {
  // Service ID dari EmailJS dashboard
  serviceID: 'service_6n8pj4o',
  
  // Template ID dari EmailJS dashboard  
  templateID: 'template_hfosicc',
  
  // Public Key dari EmailJS dashboard
  publicKey: 'fGj39asVtc8bCg7ON'
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