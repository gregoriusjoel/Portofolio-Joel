import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import 'boxicons/css/boxicons.min.css';

const SKILLS_DATA = [
  // Frontend & UI/UX
  { name: "React JS", category: "frontend", categoryLabel: "Frontend Library", icon: "bxl-react", color: "#61DAFB", level: "Advanced" },
  { name: "Next.js", category: "frontend", categoryLabel: "React Framework", icon: "bx-layer", color: "#000000", level: "Advanced" },
  { name: "TypeScript", category: "frontend", categoryLabel: "Programming Language", icon: "bxl-typescript", color: "#3178C6", level: "Advanced" },
  { name: "JavaScript", category: "frontend", categoryLabel: "Programming Language", icon: "bxl-javascript", color: "#F7DF1E", level: "Advanced" },
  { name: "Tailwind CSS", category: "frontend", categoryLabel: "CSS Framework", icon: "bxl-tailwind-css", color: "#38B2AC", level: "Advanced" },
  { name: "UI/UX Design", category: "frontend", categoryLabel: "Design & Prototyping", icon: "bx-palette", color: "#FF7262", level: "Advanced" },
  { name: "Responsive Web", category: "frontend", categoryLabel: "Cross-Device Layout", icon: "bx-devices", color: "#6366F1", level: "Advanced" },

  // Backend & Database
  { name: "Laravel", category: "backend", categoryLabel: "PHP Framework", icon: "bxl-php", color: "#FF2D20", level: "Advanced" },
  { name: "PHP", category: "backend", categoryLabel: "Backend Language", icon: "bxl-php", color: "#777BB4", level: "Advanced" },
  { name: "Node.js", category: "backend", categoryLabel: "Runtime Environment", icon: "bxl-nodejs", color: "#339933", level: "Intermediate" },
  { name: "Golang", category: "backend", categoryLabel: "Backend Language", icon: "bx-code-curly", color: "#00ADD8", level: "Intermediate" },
  { name: "MySQL", category: "backend", categoryLabel: "Relational Database", icon: "bx-data", color: "#4479A1", level: "Advanced" },
  { name: "AWS S3", category: "backend", categoryLabel: "Cloud Storage", icon: "bxl-aws", color: "#FF9900", level: "Intermediate" },
  { name: "RESTful APIs", category: "backend", categoryLabel: "API Architecture", icon: "bx-transfer-alt", color: "#6366F1", level: "Advanced" },

  // Mobile
  { name: "Flutter", category: "mobile", categoryLabel: "Cross-Platform Mobile", icon: "bx-mobile-alt", color: "#02569B", level: "Advanced" },
  { name: "Dart", category: "mobile", categoryLabel: "Mobile Programming", icon: "bx-code-block", color: "#0175C2", level: "Advanced" },

  // Video & Creative Editing
  { name: "Adobe Premiere Pro", category: "video", categoryLabel: "Video Editing", icon: "bx-video-recording", color: "#9999FF", level: "Advanced" },
  { name: "Adobe After Effects", category: "video", categoryLabel: "Motion & VFX", icon: "bx-film", color: "#9999FF", level: "Advanced" },
  { name: "CapCut", category: "video", categoryLabel: "Video Editing", icon: "bx-movie-play", color: "#000000", level: "Advanced" },
  { name: "Filmora", category: "video", categoryLabel: "Video Editing", icon: "bx-video", color: "#00E5FF", level: "Advanced" },
  { name: "Photoshop", category: "video", categoryLabel: "Photo & Graphics", icon: "bx-image", color: "#31A8FF", level: "Advanced" },
  { name: "Illustrator", category: "video", categoryLabel: "Vector Graphics", icon: "bx-pen", color: "#FF9A00", level: "Advanced" },
  { name: "Canva", category: "video", categoryLabel: "Visual Design", icon: "bx-palette", color: "#00C4CC", level: "Advanced" },

  // Tools & Workflow
  { name: "Figma", category: "tools", categoryLabel: "UI/UX & Prototyping", icon: "bxl-figma", color: "#F24E1E", level: "Advanced" },
  { name: "Git & GitHub", category: "tools", categoryLabel: "Version Control", icon: "bxl-git", color: "#F05032", level: "Advanced" },
  { name: "Jira", category: "tools", categoryLabel: "Agile Project Mgmt", icon: "bx-task", color: "#0052CC", level: "Advanced" },
  { name: "Trello", category: "tools", categoryLabel: "Task Management", icon: "bxl-trello", color: "#0052CC", level: "Advanced" },
  { name: "Notion & Miro", category: "tools", categoryLabel: "Documentation & Whiteboard", icon: "bx-notepad", color: "#000000", level: "Advanced" },
  { name: "Postman", category: "tools", categoryLabel: "API Testing", icon: "bx-send", color: "#FF6C37", level: "Advanced" },
];

const About = () => {
  const { t, isEnglish } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skillCategories = [
    { id: "frontend", label: t('frontendCategory'), icon: "bx-layout" },
    { id: "backend", label: t('backendCategory'), icon: "bx-data" },
    { id: "mobile", label: t('mobileCategory'), icon: "bx-mobile-alt" },
    { id: "video", label: t('videoCategory'), icon: "bx-film" },
    { id: "tools", label: t('toolsCategory'), icon: "bx-wrench" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 text-gray-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 mb-3 shadow-sm">
            <i className="bx bx-user-pin text-sm text-gray-900"></i>
            <span>{isEnglish ? "Get To Know Me" : "Mengenal Saya"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">
            {t('aboutMe')}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gray-900 mx-auto rounded-full mb-3"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* Hero Bento Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-12">

          {/* Left Column: Profile Card (5 cols) */}
          <div
            className={`lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xl shadow-gray-200/50 flex flex-col justify-between transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div>
              {/* Profile Image with Dynamic Effects */}
              <div className="relative mb-5 group overflow-hidden rounded-2xl bg-gray-100 border-2 border-gray-100 shadow-md">
                <img
                  src="/assets/project/Foto Profile/Foto Joel.JPG"
                  alt="Joel"
                  className="w-full h-72 sm:h-80 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Status Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-200/80 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-gray-800">{t('availableForWork')}</span>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                    <i className="bx bx-map text-xs text-gray-700"></i> {t('location')}
                  </span>
                </div>
              </div>

              {/* Identity & Tags */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Gregorius Joel</h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-gray-900 text-white rounded-full">
                    Web & UI/UX
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                  {isEnglish
                    ? "Passionate about creating modern web apps with seamless UI/UX & robust backend."
                    : "Fokus pada pengembangan web modern dengan UI/UX intuitif & backend yang handal."}
                </p>
              </div>
            </div>

            {/* Quick Actions & Socials */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="/assets/CV JOEL.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-black transition-all duration-300 shadow-md hover:shadow-gray-900/20 transform hover:-translate-y-0.5"
                >
                  <i className="bx bx-download text-base"></i>
                  <span>{t('downloadCV')}</span>
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-800 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-100 hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <i className="bx bx-chat text-base"></i>
                  <span>{t('letsTalk')}</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {[
                  { icon: "bxl-github", url: "https://github.com/gregoriusjoel", label: "GitHub" },
                  { icon: "bxl-linkedin", url: "https://www.linkedin.com/in/gregorius-joel/", label: "LinkedIn" },
                  { icon: "bx-envelope", url: "https://mail.google.com/mail/?view=cm&fs=1&to=hi.gregoriusjoel@gmail.com", label: "Email" },
                  { icon: "bxl-instagram", url: "https://www.instagram.com/gregorius_joel/", label: "Instagram" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200 hover:scale-105"
                  >
                    <i className={`bx ${social.icon} text-base`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Impact Stats (7 cols) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between gap-5 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Bio Narrative Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xl shadow-gray-200/50 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm shadow-sm">
                    <i className="bx bx-book-open"></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {isEnglish ? "Summary & Background" : "Ringkasan & Latar Belakang"}
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  <p>
                    {t('aboutDescription1').split('Joel').map((part, index) => (
                      <span key={index}>
                        {part}
                        {index === 0 && <strong className="text-gray-900 font-bold">Joel</strong>}
                      </span>
                    ))}
                  </p>
                  <p>
                    {t('aboutDescription2')}
                  </p>
                  <p>
                    {t('aboutDescription3')}
                  </p>
                </div>
              </div>

              {/* Core Skill Pills */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                  {isEnglish ? "Core Expertise" : "Keahlian Inti"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Frontend Development", icon: "bx-code-alt" },
                    { label: "UI/UX Prototyping", icon: "bx-palette" },
                    { label: "Backend & API", icon: "bx-server" },
                    { label: "Responsive Layout", icon: "bx-devices" },
                    { label: "SEO & Best Practices", icon: "bx-line-chart" }
                  ].map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-100 hover:text-black transition-colors"
                    >
                      <i className={`bx ${chip.icon} text-gray-900`}></i>
                      <span>{chip.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metric Cards (3 cards) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { number: "1+", label: t('yearsExp'), icon: "bx-briefcase-alt-2" },
                { number: "5+", label: t('projectsDone'), icon: "bx-layer" },
                { number: "2+", label: t('happyClients'), icon: "bx-smile" }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/40 text-center hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-900 flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                    <i className={`bx ${stat.icon} text-base`}></i>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Technologies Section */}
        <div
          className={`bg-white rounded-3xl p-5 sm:p-7 lg:p-8 border border-gray-200 shadow-xl shadow-gray-200/50 mb-10 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionDelay: '450ms' }}
        >
          {/* Main Section Title */}
          <div className="mb-6 pb-4 border-b border-gray-100">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              <i className="bx bx-chip text-sm text-gray-900"></i>
              <span>{isEnglish ? "Tech Stack & Toolkit" : "Teknologi & Peralatan"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {t('mySkills')}
            </h2>
          </div>

          {/* Grouped by Category */}
          <div className="space-y-6 sm:space-y-7">
            {skillCategories.map((cat) => {
              const skills = SKILLS_DATA.filter((skill) => skill.category === cat.id);
              if (skills.length === 0) return null;

              return (
                <div key={cat.id} className="space-y-3">
                  {/* Category Header (Compact) */}
                  <div className="flex items-center gap-2.5 pb-1">
                    <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm shadow-sm shrink-0">
                      <i className={`bx ${cat.icon}`}></i>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                      {cat.label}
                    </h3>
                    <div className="h-px bg-gray-100 flex-1 ml-2"></div>
                  </div>

                  {/* Skills Grid (Compact) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    {skills.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group p-3 sm:p-3.5 bg-gray-50/70 hover:bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col justify-between"
                        style={{
                          transitionDelay: `${index * 20}ms`
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <i className={`bx ${skill.icon} text-xl text-gray-800`}></i>
                          </div>
                          <span className="px-1.5 py-0.5 bg-white text-gray-500 border border-gray-200 rounded text-[9px] font-semibold">
                            {skill.level}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-black transition-colors truncate">
                            {skill.name}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-gray-500 truncate mt-0.5">
                            {skill.categoryLabel}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          className={`text-center transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {t('interestedToCollaborate')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                {t('openForOpportunities')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-xs sm:text-sm font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>{t('letsDiscuss')}</span>
                  <i className="bx bx-right-arrow-alt text-base"></i>
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white border border-white/30 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <span>{t('viewProjects')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
