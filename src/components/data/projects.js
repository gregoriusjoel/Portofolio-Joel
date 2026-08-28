// Data Projects organized by Category: Web -> Android -> UI/UX Design -> Video
export const projects = [
  // ==========================================
  // 1. WEB DEVELOPMENT PROJECTS
  // ==========================================
  {
    title: "Memly | Collaborative Event Photo Platform",
    description: {
      id: "Platform berbagi foto acara kolaboratif yang memungkinkan penyelenggara dan tamu mengunggah serta mengakses momen secara instan melalui QR Code. Dilengkapi cloud media storage AWS S3 yang scalable, manajemen galeri otomatis, selective downloads, dan administrasi berbasis peran (RBAC).",
      en: "A collaborative event photo platform enabling organizers and guests to share memories instantly through QR Code-based event access. Features scalable AWS S3 cloud media storage, automated gallery management, selective downloads, and role-based administration."
    },
    image: "/assets/project/memly/homepage.png",
    demo: "https://www.memly.online/",
    github: "#",
    screenshots: [
      "/assets/project/memly/homepage.png",
      "/assets/project/memly/homepage2.png",
      "/assets/project/memly/dashboard-login.png",
      "/assets/project/memly/login.png",
      "/assets/project/memly/register.png"
    ],
    status: "in-progress",
    technologies: ["Next.js", "React.js", "TypeScript", "Laravel", "AWS S3", "Tailwind CSS", "MySQL", "RESTful API"],
    category: "web",
    rating: "5.0",
    duration: "Mei 2026 - Present",
    year: "2026",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Founder | Fullstack Developer",
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "GROOTS | Innovation Competition & Incubator Platform",
    description: {
      id: "Platform kompetisi dan inkubasi inovasi berskala nasional bertenaga AI untuk Peserta, Juri, dan Admin. Menghadirkan arsitektur RESTful API scalable dengan Laravel 13, private document management, VOD learning, weighted scoring, dan leaderboard real-time.",
      en: "A nationwide AI-powered innovation competition and incubation platform supporting Participants, Juries, Admins, and Super Admins. Features scalable RESTful APIs with Laravel 13, private document management, VOD learning, weighted scoring, and real-time leaderboards."
    },
    image: "/assets/project/Groots/groots1.png",
    demo: "https://g-roots.vercel.app/",
    github: "#",
    screenshots: [
      "/assets/project/Groots/groots1.png",
      "/assets/project/Groots/groots2.png",
      "/assets/project/Groots/groots3.png",
      "/assets/project/Groots/groots4.png"
    ],
    status: "in-progress",
    technologies: ["Laravel 13", "PHP 8.3", "Next.js", "React.js", "TypeScript", "Tailwind CSS", "MySQL", "RBAC"],
    category: "web",
    rating: "4.9",
    duration: "Juni 2026 - Present",
    year: "2026",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Lead Developer | Fullstack Developer",
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Universitas Adhyaksa - Campus Information System",
    description: {
      id: "Sistem informasi akademik dan administratif terintegrasi untuk kampus Universitas Adhyaksa guna mendukung proses akademik. Membangun logika backend terpusat, integrasi database, manajemen API, dan antarmuka responsif ramah pengguna.",
      en: "Integrated campus information system website for Universitas Adhyaksa supporting core academic and administrative processes. Engineered centralized backend logic, database management, APIs, and responsive user-friendly interfaces."
    },
    image: "/assets/project/Universitas Adhyaksa/login-admin.png",
    demo: "https://satu.axiona.id/",
    github: "#",
    screenshots: [
      "/assets/project/Universitas Adhyaksa/login-admin.png",
      "/assets/project/Universitas Adhyaksa/login-mahasiswa.png",
      "/assets/project/Universitas Adhyaksa/login-dosen.png",
      "/assets/project/Universitas Adhyaksa/login-parent.png",
      "/assets/project/Universitas Adhyaksa/admin-dashboard.png",
      "/assets/project/Universitas Adhyaksa/mahasiswa-dashboard.png",
      "/assets/project/Universitas Adhyaksa/dosen-dashboard.png"
    ],
    status: "in-progress",
    technologies: ["React.js", "Laravel", "MySQL", "Tailwind CSS", "RESTful API", "Figma"],
    category: "web",
    rating: "4.9",
    duration: "Desember 2025 - Present",
    year: "2025",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Lead Developer | Fullstack Developer",
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Website BISINDO SIGN Language Learning",
    description: {
      id: "Platform pembelajaran bahasa isyarat BISINDO (Bahasa Isyarat Indonesia) yang interaktif dan user-friendly. Menampilkan video pembelajaran, kamus isyarat, dan fitur live streaming dengan teknologi modern.",
      en: "Interactive and user-friendly BISINDO (Indonesian Sign Language) learning platform. Features learning videos, sign dictionary, and live streaming with modern technology."
    },
    image: "/assets/project/Bisindo/homepage.png",
    demo: "#",
    github: "#",
    screenshots: [
      "/assets/project/Bisindo/homepage.png",
      "/assets/project/Bisindo/about.png",
      "/assets/project/Bisindo/cam.png",
      "/assets/project/Bisindo/stream.png"
    ],
    status: "completed",
    technologies: ["PHP", "HTML", "CSS", "Javascript", "Jupyter Notebook", "OpenCV", "TensorFlow.js", "CNN", "MediaPipe", "YOLOv8"],
    category: "web",
    rating: "4.9",
    duration: "3 minggu",
    year: "2025",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Full Stack Developer", 
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      },
      { 
        name: "Team ML", 
        role: "Machine Learning Engineer", 
        avatar: "bx-brain",
        linkedin: "https://linkedin.com"
      }
    ]
  },
  {
    title: "Job Tracker Application",
    description: {
      id: "Aplikasi tracking lamaran kerja untuk membantu job seeker mengelola aplikasi pekerjaan mereka. Fitur reminder, status tracking, dan analytics untuk meningkatkan efektivitas pencarian kerja.",
      en: "Job application tracking application to help job seekers manage their job applications. Features reminder, status tracking, and analytics to improve job search effectiveness."
    },
    image: "/assets/project/Job Tracker/login.png",
    demo: "https://job-tracker-one-alpha.vercel.app/login",
    github: "https://github.com/gregoriusjoel/JobTracker",
    screenshots: [
      "/assets/project/Job Tracker/login.png",
      "/assets/project/Job Tracker/dashboard.png",
      "/assets/project/Job Tracker/addapplication.png",
      "/assets/project/Job Tracker/adminpanel.png",
      "/assets/project/Job Tracker/addadmin.png",
      "/assets/project/Job Tracker/accountsetting.png"
    ],
    status: "completed",
    technologies: ["Next.js", "Golang", "CSS", "JavaScript", "MySQL", "Tailwind CSS"],
    category: "web",
    rating: "4.8",
    duration: "2 Minggu",
    year: "2025",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Full Stack Developer", 
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Sistem Klinik Gudang",
    description: {
      id: "Sistem informasi manajemen klinik untuk pengelolaan data pasien, jadwal dokter, rekam medis, dan inventory obat. Solusi digital untuk efisiensi operasional klinik.",
      en: "Clinic management information system for managing patient data, doctor schedules, medical records, and drug inventory. Digital solution for clinic operational efficiency."
    },
    image: "/assets/project/Klinik Gudang/login.png",
    demo: "https://gudang-klinik-pratama.vercel.app/",
    github: "#",
    screenshots: [
      "/assets/project/Klinik Gudang/login.png",
      "/assets/project/Klinik Gudang/DASHBOARD.png",
      "/assets/project/Klinik Gudang/HALAMAN STOK.png",
      "/assets/project/Klinik Gudang/HALAMAN BARANG MASUK.png",
      "/assets/project/Klinik Gudang/HALAMAN BARANG KELUAR.png",
      "/assets/project/Klinik Gudang/STOK ALERT.png",
      "/assets/project/Klinik Gudang/LAPORAN HARIAN.png",
      "/assets/project/Klinik Gudang/REQUEST BARANG.png",
      "/assets/project/Klinik Gudang/DASHBOARD KARYAWAN.png",
      "/assets/project/Klinik Gudang/REQUEST BARANG KARYAWAN.png"
    ],
    status: "completed",
    technologies: ["React.js", "Laravel", "CSS", "JavaScript", "Tailwind CSS", "MySQL"],
    category: "web",
    rating: "4.8",
    duration: "2 minggu",
    year: "2025",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Full Stack Developer", 
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      },
      { 
        name: "Healthcare Team", 
        role: "Domain Expert", 
        avatar: "bx-user-check",
        linkedin: "https://linkedin.com"
      }
    ]
  },
  {
    title: "Petrikor",
    description: {
      id: "Landing page modern dan elegan untuk brand Petrikor dengan desain minimalis yang menarik. Fokus pada storytelling visual dan call-to-action yang efektif untuk konversi yang optimal.",
      en: "Modern and elegant landing page for Petrikor brand with attractive minimalist design. Focus on visual storytelling and effective call-to-action for optimal conversion."
    },
    image: "/assets/project/Petrikor/homepage.png",
    demo: "https://petrikor.vercel.app/",
    github: "#",
    screenshots: [
      "/assets/project/Petrikor/homepage.png"
    ],
    status: "completed",
    technologies: ["React.js", "Tailwind CSS"],
    category: "web",
    rating: "4.6",
    duration: "4 minggu",
    year: "2024",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Frontend Developer", 
        avatar: "bx-code-curly",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Vameratale E-Commerce",
    description: {
      id: "Platform e-commerce lengkap dengan sistem katalog produk, keranjang belanja, payment gateway, dan manajemen order. Desain responsive dengan user experience yang optimal untuk berbagai device.",
      en: "Complete e-commerce platform with product catalog system, shopping cart, payment gateway, and order management. Responsive design with optimal user experience for various devices."
    },
    image: "/assets/project/Vameratale/homepage.png",
    demo: "#",
    github: "#",
    screenshots: [
      "/assets/project/Vameratale/homepage.png",
      "/assets/project/Vameratale/kategori.png",
      "/assets/project/Vameratale/detail.png",
      "/assets/project/Vameratale/cart.png",
      "/assets/project/Vameratale/payment.png",
      "/assets/project/Vameratale/login.png",
      "/assets/project/Vameratale/daftar.png",
      "/assets/project/Vameratale/about.png",
      "/assets/project/Vameratale/invocie.png"
    ],
    status: "completed",
    technologies: ["TypeScript", "CSS", "JavaScript", "Tailwind CSS", "MySQL", "Midtrans API"],
    category: "web",
    rating: "4.8",
    duration: "6 minggu",
    year: "2023",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Full Stack Developer", 
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregoriusjoel"
      },
      { 
        name: "UI/UX Designer", 
        role: "Design Lead", 
        avatar: "bx-palette",
        linkedin: "https://linkedin.com/in/uiux-designer"
      }
    ]
  },

  // ==========================================
  // 2. ANDROID / MOBILE APPS
  // ==========================================
  {
    title: "SIAGA Mobile - PT Perkebunan Nusantara",
    description: {
      id: "Aplikasi enterprise pelaporan dan manajemen insiden untuk PT Perkebunan Nusantara guna mempercepat pencatatan insiden real-time dan alur persetujuan berjenjang. Dilengkapi engine pelacakan SLA 14 jam kepatuhan otomatis, multi-asset incident reporting, sinkronisasi offline draft, dan interactive location picker.",
      en: "An enterprise incident reporting and management mobile application for PT Perkebunan Nusantara, streamlining real-time incident logging and multi-tiered approval workflows. Features an automated 14-hour compliance SLA tracking engine, multi-asset incident reporting, offline auto-save sync, and interactive location picking."
    },
    image: "/assets/project/Siaga/Siaga.png",
    demo: "#",
    github: "#",
    screenshots: [
      "/assets/project/Siaga/Siaga.png",
      "/assets/project/Siaga/Siaga1.png"
    ],
    status: "in-progress",
    technologies: ["Flutter", "Dart", "GetX", "Clean Architecture", "RESTful API", "Local Storage", "SLA Engine"],
    category: "android",
    rating: "5.0",
    duration: "Maret 2026 - Present",
    year: "2026",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Mobile Developer",
        avatar: "bx-mobile-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Sistem Kasir Ayam Geprek",
    description: {
      id: "Aplikasi Point of Sale (POS) untuk restoran ayam geprek dengan fitur manajemen menu, transaksi, dan laporan penjualan. Dashboard admin yang mudah digunakan untuk tracking performa bisnis.",
      en: "Point of Sale (POS) application for ayam geprek restaurant with menu management, transaction, and sales report features. Easy-to-use admin dashboard for business performance tracking."
    },
    image: "/assets/project/Kasir Ayam Geprek/login.png",
    demo: "#",
    github: "https://github.com/gregoriusjoel/POS",
    screenshots: [
      "/assets/project/Kasir Ayam Geprek/login.png",
      "/assets/project/Kasir Ayam Geprek/dashboard.png",
      "/assets/project/Kasir Ayam Geprek/daftarmenu.png",
      "/assets/project/Kasir Ayam Geprek/pos.png",
      "/assets/project/Kasir Ayam Geprek/riwayattransaksi.png"
    ],
    status: "completed",
    technologies: ["Dart", "Flutter", "Tailwind CSS", "MySQL"],
    category: "android",
    rating: "4.8",
    duration: "4 minggu",
    year: "2025",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Mobile Developer", 
        avatar: "bx-mobile-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },

  // ==========================================
  // 3. UI/UX DESIGN PROJECTS
  // ==========================================
  {
    title: "Access Careers",
    description: {
      id: "Platform digital untuk pencari kerja dan perusahaan dengan fitur matching otomatis, tips karir, dan networking profesional. Desain UI/UX yang user-friendly untuk meningkatkan pengalaman pengguna.",
      en: "Digital platform for job seekers and companies with automatic matching features, career tips, and professional networking. User-friendly UI/UX design to enhance user experience."
    },
    image: "/assets/project/Access Careers/Landing Page.png",
    demo: "https://www.figma.com/proto/zdB2jgcv2wji4rGwe9kqTq/Design-AccessCareers?node-id=222-240&t=VYV8BkZbPkN9Qqei-1&scaling=scale-down&content-scaling=fixed&page-id=12%3A2&starting-point-node-id=222%3A240",
    github: "#",
    screenshots: [
      "/assets/project/Access Careers/Landing Page.png",
      "/assets/project/Access Careers/Homepage.png",
      "/assets/project/Access Careers/Fitur.png",
      "/assets/project/Access Careers/Mitra.png",
      "/assets/project/Access Careers/Tips.png",
      "/assets/project/Access Careers/Daftar.png",
      "/assets/project/Access Careers/Login.png",
      "/assets/project/Access Careers/Filter.png"
    ],
    status: "completed",
    technologies: ["Figma","Adobe Photoshop", "Adobe Illustrator"],
    category: "design",
    rating: "4.8",
    duration: "1 minggu",
    year: "2024",
    contributors: [
      { 
        name: "Gregorius Joel", 
        role: "Full Stack Developer", 
        avatar: "bx-code-alt",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      },
      { 
        name: "Healthcare Team", 
        role: "Domain Expert", 
        avatar: "bx-user-check",
        linkedin: "https://linkedin.com"
      }
    ]
  },

  // ==========================================
  // 4. VIDEO & EDITING PROJECTS
  // ==========================================
  {
    title: "Bercerita Bersama KOMSOS BMV Katedral Bogor dan KOMSOS Katedral Bandung",
    description: {
      id: "Proyek video dokumentasi kunjungan KOMSOS BMV Katedral Bogor ke KOMSOS Katedral Bandung untuk studi banding, berbagi cerita, dan kegiatan bersama. Video menampilkan momen kegiatan, wawancara, dan rangkuman acara.",
      en: "Video documenting the visit of KOMSOS BMV Katedral Bogor to KOMSOS Katedral Bandung for a comparative study, shared storytelling, and joint activities. The reel showcases event moments, interviews, and a highlights summary."
    },
    image: "/assets/project/Video/bercerita_komsos.jpg",
    demo: "https://www.instagram.com/reel/DO0FwL1j6Hn/?utm_source=ig_web_copy_link&igsh=MW5oZnM0dTRlc2d2cA==",
    video: "https://www.instagram.com/reel/DO0FwL1j6Hn/embed",
    github: "#",
    platform: "Instagram",
    location: "Bogor / Bandung",
    screenshots: [
      "/assets/project/Video/bercerita_komsos.jpg"
    ],
    status: "completed",
    technologies: ["Capcut", "Premiere Pro"],
    category: "video",
    rating: "4.6",
    duration: "2 Hari",
    year: "2026",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Rekrutmen KOMSOS BMV Katedral Bogor 2025",
    description: {
      id: "Rekrutmen KOMSOS BMV Katedral Bogor 2025 — Bergabunglah menjadi relawan! Daftarkan dirimu sekarang untuk pelatihan singkat, pengalaman kegiatan sosial, dan kesempatan berbagi. Ayo ikut berkontribusi — daftar segera.",
      en: "KOMSOS BMV Cathedral Bogor 2025 recruitment — Join us as a volunteer! Sign up now for short training, hands-on social activities, and a chance to make an impact. Be part of the team — register today."
    },
    image: "/assets/project/Video/rekrutmen_komsos.jpg",
    demo: "https://www.instagram.com/reel/DQL0-tRD8Tc/",
    video: "https://www.instagram.com/reel/DQL0-tRD8Tc/embed",
    github: "#",
    platform: "Instagram",
    location: "Bogor",
    screenshots: [
      "/assets/project/Video/rekrutmen_komsos.jpg"
    ],
    status: "completed",
    technologies: ["Capcut"],
    category: "video",
    rating: "4.7",
    duration: "3 Hari",
    year: "2025",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Teaser Podcast",
    description: {
      id: "Cuplikan teaser untuk podcast 'Siniar Teman Cerita dan Joki' — Segera hadir: Season 4. Menampilkan potongan tema episode, suasana, dan pengenalan host/guest untuk membangkitkan antusiasme pendengar dan mengundang mereka mengikuti season baru.",
      en: "Teaser for the podcast 'Siniar Teman Cerita dan Joki' — Coming soon: Season 4. Showcasing episode themes, atmosphere, and host/guest introductions to build excitement and invite listeners to follow the new season."
    },
    image: "/assets/project/Video/teaser_podcast.jpg",
    demo: "https://www.instagram.com/p/DLCtUfnyfce/",
    video: "https://www.instagram.com/p/DLCtUfnyfce/embed",
    github: "#",
    platform: "Instagram",
    location: "",
    screenshots: [
      "/assets/project/Video/teaser_podcast.jpg"
    ],
    status: "completed",
    technologies: ["Capcut"],
    category: "video",
    rating: "4.6",
    duration: "",
    year: "2025",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Highlight Acara HUT KOMSOS",
    description: {
      id: "Highlight singkat acara HUT KOMSOS — kompilasi momen penting seperti sambutan, kegiatan komunitas, dan penampilan khusus. Disunting untuk platform sosial media sebagai dokumentasi dan materi promosi komunitas.",
      en: "Short highlights of the KOMSOS anniversary event — a compilation of key moments such as speeches, community activities, and special performances. Edited for social media platforms as documentation and promotional material for the community."
    },
    image: "/assets/project/Video/hut_komsos.jpg",
    demo: "https://www.instagram.com/p/DKgi2e6S_Gm/",
    video: "https://www.instagram.com/p/DKgi2e6S_Gm/embed",
    github: "#",
    platform: "Instagram",
    location: "",
    screenshots: [
      "/assets/project/Video/hut_komsos.jpg"
    ],
    status: "completed",
    technologies: ["Capcut"],
    category: "video",
    rating: "4.6",
    duration: "",
    year: "2025",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Hari Komsos Sedunia",
    description: {
      id: "Dokumentasi singkat peringatan Hari KOMSOS Sedunia — menampilkan rangkaian kegiatan, pesan utama, dan cuplikan partisipasi komunitas. Disusun untuk posting ringkas yang informatif dan sebagai arsip kegiatan.",
      en: "Short documentation of World KOMSOS Day — showcasing the sequence of activities, key messages, and community participation clips. Prepared for concise informative posts and as an activity archive."
    },
    image: "/assets/project/Video/hari_komsos.jpg",
    demo: "https://www.instagram.com/p/DKVp-h3SCR0/",
    video: "https://www.instagram.com/p/DKVp-h3SCR0/embed",
    github: "#",
    platform: "Instagram",
    location: "",
    screenshots: [
      "/assets/project/Video/hari_komsos.jpg"
    ],
    status: "completed",
    technologies: ["Capcut"],
    category: "video",
    rating: "4.6",
    duration: "",
    year: "2025",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Siniar Teman Cerita",
    description: {
      id: "Video pendek (YouTube) — lihat cuplikan di link. Ditambahkan ke portofolio sebagai contoh video berdurasi pendek.",
      en: "Short YouTube video — see the clip at the link. Added to portfolio as an example of short-format video."
    },
    image: "/assets/project/Video/siniar_teman_cerita.jpg",
    demo: "https://youtu.be/OE3feTgNN5A",
    video: "https://www.youtube.com/embed/OE3feTgNN5A",
    github: "#",
    platform: "YouTube",
    location: "https://youtu.be/OE3feTgNN5A?si=tO7szQVR-oh1cjYq",
    screenshots: [
      "/assets/project/Video/siniar_teman_cerita.jpg"
    ],
    status: "completed",
    technologies: ["Video Editing"],
    category: "video",
    rating: "4.5",
    duration: "",
    year: "2024",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  },
  {
    title: "Wedding Highlights",
    description: {
      id: "Video pendek (YouTube) — ditambahkan ke portofolio sebagai contoh konten video. Lihat link untuk full clip.",
      en: "Short YouTube video — added to the portfolio as a sample of short-format content. See the link for the full clip."
    },
    image: "/assets/project/Video/wedding_highlights.jpg",
    demo: "https://www.youtube.com/watch?v=dx1-iQG4p3I",
    video: "https://www.youtube.com/embed/dx1-iQG4p3I",
    github: "#",
    platform: "YouTube",
    location: "",
    screenshots: [
      "/assets/project/Video/wedding_highlights.jpg"
    ],
    status: "completed",
    technologies: ["Video Editing"],
    category: "video",
    rating: "4.5",
    duration: "",
    year: "2023",
    contributors: [
      {
        name: "Gregorius Joel",
        role: "Video Editor",
        avatar: "bx-video",
        linkedin: "https://linkedin.com/in/gregorius-joel"
      }
    ]
  }
];
