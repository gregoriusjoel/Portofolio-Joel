import React, { createContext, useContext, useState } from 'react';

const translations = {
  id: {
    // Navigation
    dashboard: 'Dashboard',
    about: 'Tentang',
    // Experience Page
    experience: 'Pengalaman',
    present: 'Present',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    freelance: 'Freelance',
    internship: 'Internship',
    
    // Experience Responsibilities - Frontend Developer
    frontendResp1: 'Building responsive and modern company profile websites and landing pages',
    frontendResp2: 'Collaborating with UI/UX team to implement interactive designs',
    frontendResp3: 'Applying Tailwind CSS and React.js for efficient styling and development',
    frontendResp4: 'Website performance optimization and SEO best practices implementation',
    frontendResp5: 'Mentoring junior developers and code review to maintain code quality',
    
    // Experience Responsibilities - UI/UX Designer
    uiuxResp1: 'Designing mobile and web applications for various clients from startups to enterprise',
    uiuxResp2: 'Conducting user research and usability testing to improve user experience',
    uiuxResp3: 'Creating design systems and component libraries for design consistency',
    uiuxResp4: 'Interactive prototyping using Figma and Adobe XD',
    
    // Experience Responsibilities - Web Developer Intern
    internResp1: 'Learning web development fundamentals and modern frameworks',
    internResp2: 'Assisting in company website feature development',
    internResp3: 'Bug fixing and testing on web applications under development',
    internResp4: 'Technical documentation and user manual creation',
    present: 'Sekarang',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    freelance: 'Freelance',
    internship: 'Magang',
    studyIndependent: 'Study Independent',
    
    // Experience Responsibilities - Frontend Developer
    frontendResp1: 'Membangun website company profile dan landing page yang responsif dan modern',
    frontendResp2: 'Kolaborasi dengan tim UI/UX untuk mengimplementasikan desain yang interaktif',
    frontendResp3: 'Menerapkan Tailwind CSS dan React.js untuk styling dan development yang efisien',
    frontendResp4: 'Optimasi performa website dan implementasi best practices SEO',
    frontendResp5: 'Mentoring junior developer dan code review untuk maintain kualitas kode',
    
    // Experience Responsibilities - UI/UX Designer
    uiuxResp1: 'Desain aplikasi mobile dan web untuk berbagai klien dari startup hingga enterprise',
    uiuxResp2: 'Melakukan user research dan usability testing untuk meningkatkan user experience',
    uiuxResp3: 'Membuat design system dan component library untuk konsistensi design',
    uiuxResp4: 'Prototyping interaktif menggunakan Figma dan Adobe XD',
    
    // Experience Responsibilities - Web Developer Intern
    internResp1: 'Belajar fundamental web development dan framework modern',
    internResp2: 'Assist dalam pengembangan fitur-fitur website company',
    internResp3: 'Bug fixing dan testing pada aplikasi web yang sedang dikembangkan',
    internResp4: 'Dokumentasi teknis dan user manual',
    
    // Experience Responsibilities - Project Manager
    pmResp1: 'Mengelola project pengembangan website dari planning hingga deployment',
    pmResp2: 'Koordinasi dengan tim developer, designer, dan stakeholder untuk memastikan timeline project',
    pmResp3: 'Melakukan requirements gathering dan analisis kebutuhan klien',
    pmResp4: 'Monitoring progress project menggunakan metodologi Agile dan Scrum',
    pmResp5: 'Quality assurance dan testing untuk memastikan deliverable sesuai standar',
    
    // Experience Responsibilities - Web Developer Maintenance
    maintenanceResp1: 'Update konten website dan pemeliharaan rutin untuk berbagai klien',
    maintenanceResp2: 'Melakukan maintenance dan troubleshooting issue pada website yang sudah live',
    maintenanceResp3: 'Optimasi SEO dan performance website untuk meningkatkan ranking',
    maintenanceResp4: 'Backup data dan monitoring keamanan website secara berkala',
    
    // Experience Responsibilities - Redaktur Penyiaran
    editorResp1: 'Editing dan review konten siaran radio untuk program harian',
    editorResp2: 'Koordinasi dengan tim produksi untuk scheduling dan timeline siaran',
    editorResp3: 'Quality control audio dan script sebelum dipublikasikan',
    editorResp4: 'Dokumentasi dan arsip konten siaran untuk keperluan evaluasi',
    projects: 'Proyek',
    contact: 'Kontak',
    
    // Dashboard
    greeting: 'Halo, Saya Joel',
    welcomeMessage: 'Hi I\'m Joel, Welcome to My Portfolio',
    description: 'Inovasi digital yang mengubah ide menjadi solusi nyata. Setiap project adalah perjalanan untuk menciptakan pengalaman yang bermakna dan berdampak.',
    viewProjects: 'Lihat Project',
    contactMe: 'Hubungi Saya',
    
    // Job titles
    projectManager: 'Project Manager',
    redakturPenyiaran: 'Redaktur Penyiaran',
    frontendDeveloper: 'Frontend Developer',
    backendDeveloper: 'Backend Developer',
    fullstackDeveloper: 'Fullstack Developer',
    uiuxDesigner: 'UI/UX Designer',
    videoEditor: 'Video Editor',
    graphicDesigner: 'Graphic Designer',
    
    // About Page
    aboutMe: 'Tentang Saya',
    aboutDescription1: 'Saya Joel, seorang web developer yang berfokus pada desain UI/UX dan pengembangan frontend serta backend.',
    aboutDescription2: 'Saya memiliki passion dalam membangun website yang tidak hanya fungsional, tapi juga estetis dan mudah digunakan.',
    aboutDescription3: 'Dengan pengalaman 1+ tahun di bidang web development, saya selalu berusaha mengikuti tren teknologi terbaru.',
    mySkills: 'Keahlian Saya',
    
    // Experience Page
    professionalExperience: 'Pengalaman Profesional',
    experienceDescription: 'Perjalanan karir saya dalam dunia web development dan design, dari study independent hingga freelance',
    openForOpportunities: 'Saya selalu terbuka untuk proyek menarik dan peluang karir baru',
    interestedToCollaborate: 'Tertarik untuk berkolaborasi?',
    letsDiscuss: 'Mari Diskusi',
    
    // Project Cards
    completed: 'Selesai',
    contributors: 'Kontributor',
    viewTeam: 'View Team',
    liveDemo: 'Live Demo',
    code: 'Code',
    preview: 'Preview',
    weeks: 'minggu',
    rating: '4.8',
    projectsDescription: 'Kumpulan project terbaik yang pernah saya kerjakan, dari web development hingga UI/UX design',
    allProjects: 'Semua Project',
    webDevelopment: 'Web Development',
    androidApps: 'Android Apps',
    uiuxDesign: 'UI/UX Design',
    viewProject: 'Lihat Proyek',
    projectDetails: 'Detail Proyek',
    technologies: 'Teknologi',
    contributors: 'Kontributor',
    
    // Contact Page
    contactTitle: 'Mari Berkolaborasi',
    contactSubtitle: 'Project Anda',
    contactDescription: 'Saya siap membantu mewujudkan ide digital Anda menjadi kenyataan. Mari kita ciptakan sesuatu yang luar biasa bersama-sama!',
    
    // Contact Methods
    email: 'Email',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    
    // Contact Form
    sendMessage: 'Kirim Pesan',
    fullName: 'Nama Lengkap',
    fullNamePlaceholder: 'Masukkan nama Anda',
    emailPlaceholder: 'nama@email.com',
    subject: 'Subjek',
    subjectPlaceholder: 'Apa yang ingin Anda diskusikan?',
    message: 'Pesan',
    messagePlaceholder: 'Ceritakan lebih detail tentang project atau ide Anda...',
    
    // Form Actions
    sending: 'Mengirim Pesan...',
    messageSent: 'Pesan Terkirim!',
    sendFailed: 'Gagal Kirim',
    sendButton: 'Kirim Pesan',
    
    // Success/Error Messages
    successMessage: 'Pesan Anda telah berhasil dikirim! Saya akan membalas dalam waktu 1x24 jam.',
    errorMessage: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi langsung via email.',
    
    // Validation
    required: 'wajib diisi',
    invalidEmail: 'Format email tidak valid',
    messageMinLength: 'Pesan minimal 10 karakter',
    networkError: 'Koneksi internet bermasalah. Silakan coba lagi.',
    accessDenied: 'Akses ditolak. Silakan hubungi administrator.',
    serviceNotFound: 'Service email tidak ditemukan. Silakan hubungi administrator.',
    unexpectedError: 'Terjadi kesalahan tidak terduga. Silakan coba lagi atau hubungi langsung via email.',
    
    // Project Categories
    all: 'Semua',
    web: 'Web',
    android: 'Android', 
    design: 'Desain',
    
    // Experience Responsibilities - Frontend Developer
    frontendResp1: 'Membangun website company profile dan landing page yang responsif dan modern',
    frontendResp2: 'Kolaborasi dengan tim UI/UX untuk mengimplementasikan desain yang interaktif',
    frontendResp3: 'Menerapkan Tailwind CSS dan React.js untuk styling dan development yang efisien',
    frontendResp4: 'Optimasi performa website dan implementasi best practices SEO',
    frontendResp5: 'Mentoring junior developer dan code review untuk maintain kualitas kode',
    
    // Experience Responsibilities - UI/UX Designer
    uiuxResp1: 'Desain aplikasi mobile dan web untuk berbagai klien dari startup hingga enterprise',
    uiuxResp2: 'Melakukan user research dan usability testing untuk meningkatkan user experience',
    uiuxResp3: 'Membuat design system dan component library untuk konsistensi design',
    uiuxResp4: 'Prototyping interaktif menggunakan Figma dan Adobe XD',
    
    // Experience Responsibilities - Web Developer Intern  
    internResp1: 'Belajar fundamental web development dan framework modern',
    internResp2: 'Assist dalam pengembangan fitur-fitur website company',
    internResp3: 'Bug fixing dan testing pada aplikasi web yang sedang dikembangkan',
    internResp4: 'Dokumentasi teknis dan user manual',
    
    // Projects page CTA section
    projectsCtaTitle: 'Punya ide project menarik?',
    projectsCtaDescription: 'Mari diskusikan bagaimana saya bisa membantu mewujudkan ide Anda menjadi kenyataan',
    projectsCtaButton: 'Mulai Project Baru',
    
    // Skills Section
    technicalSkills: 'Technical Skills',
    programmingDevelopment: 'Programming & Development',
    toolsPlatforms: 'Tools & Platforms',
    developmentEnvironment: 'Development Environment',
    codeEditor: 'Code Editor',
    designTool: 'Design Tool',
    versionControl: 'Version Control',
    database: 'Database',
    
    // Job Titles
    webDeveloperUiUxDesigner: 'Web Developer & UI/UX Designer',
    webDeveloper: 'Web Developer',
    studyIndependent: 'Study Independent',
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    
    // Dashboard
    greeting: 'Hello, I\'m Joel',
    welcomeMessage: 'Hi I\'m Joel, Welcome to My Portfolio',
    description: 'Digital innovation that transforms ideas into real solutions. Every project is a journey to create meaningful and impactful experiences.',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
    
    // Job titles
    projectManager: 'Project Manager',
    redakturPenyiaran: 'Broadcast Editor',
    frontendDeveloper: 'Frontend Developer',
    backendDeveloper: 'Backend Developer',
    fullstackDeveloper: 'Fullstack Developer',
    uiuxDesigner: 'UI/UX Designer',
    videoEditor: 'Video Editor',
    graphicDesigner: 'Graphic Designer',
    
    // About Page
    aboutMe: 'About Me',
    aboutDescription1: 'I am Joel, a web developer focused on UI/UX design and frontend as well as backend development.',
    aboutDescription2: 'I have a passion for building websites that are not only functional, but also aesthetic and easy to use.',
    aboutDescription3: 'With 1+ years of experience in web development, I always strive to keep up with the latest technology trends.',
    mySkills: 'My Skills',
    
    // Experience Page
    professionalExperience: 'Professional Experience',
    experienceDescription: 'My career journey in web development and design, from independent study to freelance',
    openForOpportunities: 'I am always open to exciting projects and new career opportunities',
    interestedToCollaborate: 'Interested to collaborate?',
    letsDiscuss: 'Let\'s Discuss',
    openForOpportunities: 'I am always open to exciting projects and new career opportunities',
    interestedToCollaborate: 'Interested to collaborate?',
    letsDiscuss: 'Let\'s Discuss',
    
    // Project Cards
    completed: 'Completed',
    contributors: 'Contributors',
    viewTeam: 'View Team',
    liveDemo: 'Live Demo',
    code: 'Code',
    preview: 'Preview',
    weeks: 'weeks',
    rating: '4.8',
    projectsDescription: 'Collection of best projects I\'ve worked on, from web development to UI/UX design',
    allProjects: 'All Projects',
    webDevelopment: 'Web Development',
    androidApps: 'Android Apps',
    uiuxDesign: 'UI/UX Design',
    viewProject: 'View Project',
    projectDetails: 'Project Details',
    technologies: 'Technologies',
    contributors: 'Contributors',
    
    // Contact Page
    contactTitle: 'Let\'s Collaborate',
    contactSubtitle: 'Your Project',
    contactDescription: 'I\'m ready to help bring your digital ideas to life. Let\'s create something extraordinary together!',
    
    // Contact Methods
    email: 'Email',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    
    // Contact Form
    sendMessage: 'Send Message',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your name',
    emailPlaceholder: 'name@email.com',
    subject: 'Subject',
    subjectPlaceholder: 'What would you like to discuss?',
    message: 'Message',
    messagePlaceholder: 'Tell me more about your project or ideas...',
    
    // Form Actions
    sending: 'Sending Message...',
    messageSent: 'Message Sent!',
    sendFailed: 'Send Failed',
    sendButton: 'Send Message',
    
    // Success/Error Messages
    successMessage: 'Your message has been sent successfully! I will reply within 24 hours.',
    errorMessage: 'Sorry, an error occurred. Please try again or contact me directly via email.',
    
    // Validation
    required: 'is required',
    invalidEmail: 'Invalid email format',
    messageMinLength: 'Message must be at least 10 characters',
    networkError: 'Network connection problem. Please try again.',
    accessDenied: 'Access denied. Please contact administrator.',
    serviceNotFound: 'Email service not found. Please contact administrator.',
    unexpectedError: 'An unexpected error occurred. Please try again or contact directly via email.',
    
    // Project Categories
    all: 'All',
    web: 'Web',
    android: 'Android',
    design: 'Design',
    
    // Experience Page
    experience: 'Experience',
    present: 'Present',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    freelance: 'Freelance',
    internship: 'Internship',
    
    // Experience Responsibilities - Frontend Developer
    frontendResp1: 'Building responsive and modern company profile websites and landing pages',
    frontendResp2: 'Collaborating with UI/UX team to implement interactive designs',
    frontendResp3: 'Applying Tailwind CSS and React.js for efficient styling and development',
    frontendResp4: 'Website performance optimization and SEO best practices implementation',
    frontendResp5: 'Mentoring junior developers and code review to maintain code quality',
    
    // Experience Responsibilities - UI/UX Designer
    uiuxResp1: 'Designing mobile and web applications for various clients from startups to enterprise',
    uiuxResp2: 'Conducting user research and usability testing to improve user experience',
    uiuxResp3: 'Creating design systems and component libraries for design consistency',
    uiuxResp4: 'Interactive prototyping using Figma and Adobe XD',
    
    // Experience Responsibilities - Web Developer Intern
    internResp1: 'Learning web development fundamentals and modern frameworks',
    internResp2: 'Assisting in company website feature development',
    internResp3: 'Bug fixing and testing on web applications under development',
    internResp4: 'Technical documentation and user manual creation',
    
    // Experience Responsibilities - Project Manager
    pmResp1: 'Managing website development projects from planning to deployment',
    pmResp2: 'Coordinating with developer, designer, and stakeholder teams to ensure project timelines',
    pmResp3: 'Conducting requirements gathering and client needs analysis',
    pmResp4: 'Monitoring project progress using Agile and Scrum methodologies',
    pmResp5: 'Quality assurance and testing to ensure deliverables meet standards',
    
    // Experience Responsibilities - Web Developer Maintenance
    maintenanceResp1: 'Website content updates and routine maintenance for various clients',
    maintenanceResp2: 'Performing maintenance and troubleshooting issues on live websites',
    maintenanceResp3: 'SEO and website performance optimization to improve rankings',
    maintenanceResp4: 'Data backup and regular website security monitoring',
    
    // Experience Responsibilities - Redaktur Penyiaran
    editorResp1: 'Editing and reviewing radio broadcast content for daily programs',
    editorResp2: 'Coordinating with production team for broadcast scheduling and timelines',
    editorResp3: 'Quality control of audio and scripts before publication',
    editorResp4: 'Documentation and archiving of broadcast content for evaluation purposes',
    
    // Projects page CTA section
    projectsCtaTitle: 'Have an interesting project idea?',
    projectsCtaDescription: 'Let\'s discuss how I can help bring your ideas to life',
    projectsCtaButton: 'Start New Project',
    
    // Skills Section
    technicalSkills: 'Technical Skills',
    programmingDevelopment: 'Programming & Development',
    toolsPlatforms: 'Tools & Platforms',
    developmentEnvironment: 'Development Environment',
    codeEditor: 'Code Editor',
    designTool: 'Design Tool',
    versionControl: 'Version Control',
    database: 'Database',
    
    // Job Titles
    webDeveloperUiUxDesigner: 'Web Developer & UI/UX Designer',
    webDeveloper: 'Web Developer',
    studyIndependent: 'Study Independent',
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage or default to Indonesian
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'id';
  });

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    switchLanguage,
    t,
    isIndonesian: language === 'id',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;