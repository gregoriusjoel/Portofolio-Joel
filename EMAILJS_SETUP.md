# EmailJS Setup Guide

## Langkah-langkah Setup EmailJS

### 1. Daftar di EmailJS
- Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
- Klik "Sign Up" dan buat akun baru
- Verifikasi email Anda

### 2. Buat Email Service
- Login ke dashboard EmailJS
- Klik "Email Services"
- Klik "Add New Service"
- Pilih provider email Anda (Gmail, Outlook, Yahoo, dll)
- Ikuti instruksi untuk menghubungkan akun email
- **Salin Service ID yang diberikan**

### 3. Buat Email Template
- Klik "Email Templates"
- Klik "Create New Template"
- Atur template dengan format berikut:

```
Subject: New message from {{from_name}} - {{subject}}

Body:
Nama: {{from_name}}
Email: {{from_email}}
Subjek: {{subject}}

Pesan:
{{message}}

---
Pesan ini dikirim dari form kontak portfolio Joel.
```

- **Salin Template ID yang diberikan**

### 4. Dapatkan Public Key
- Klik "Account" di menu
- Klik "General"
- **Salin Public Key**

### 5. Update Konfigurasi
Buka file `src/config/emailjs.js` dan ganti:
```javascript
export const emailjsConfig = {
  serviceID: 'service_xxxxxxx',     // Ganti dengan Service ID Anda
  templateID: 'template_xxxxxxx',   // Ganti dengan Template ID Anda
  publicKey: 'xxxxxxxxxxxxxxx'     // Ganti dengan Public Key Anda
};
```

### 6. Test Email
- Jalankan aplikasi: `npm run dev`
- Buka halaman Contact
- Isi form dan kirim
- Cek email tujuan (hi.gregoriusjoel@gmail.com)

## Template Variables
Variables yang digunakan dalam template:
- `{{from_name}}` - Nama pengirim
- `{{from_email}}` - Email pengirim
- `{{subject}}` - Subjek pesan
- `{{message}}` - Isi pesan
- `{{to_email}}` - Email tujuan
- `{{reply_to}}` - Email untuk reply

## Troubleshooting

### Email tidak terkirim
1. Cek kredensial di `src/config/emailjs.js`
2. Pastikan Service sudah connected di dashboard EmailJS
3. Cek console browser untuk error
4. Pastikan email service tidak di-block oleh provider

### Error 403 Forbidden
1. Cek Public Key
2. Pastikan domain aplikasi sudah terdaftar di EmailJS

### Template tidak ditemukan
1. Cek Template ID
2. Pastikan template sudah di-save dan active

## Fitur Saat Ini
✅ Form validation
✅ Loading state
✅ Success/error messages
✅ Form reset setelah submit
✅ Responsive design
✅ Multi-language support
✅ EmailJS integration

## Security Note
- Public Key aman untuk di-expose di frontend
- Service ID dan Template ID juga aman
- EmailJS menangani authentication di backend mereka
- Rate limiting otomatis tersedia