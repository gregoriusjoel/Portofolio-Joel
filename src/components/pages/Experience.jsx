// Experience
import React, { useState, useEffect } from "react";
import { useLanguage } from '../../contexts/LanguageContext';

const ExperienceItem = ({ experience, isLast, index, isVisible }) => {
  const { t, isEnglish } = useLanguage();
  
  const translatePeriod = (period) => {
    if (isEnglish) {
      return period.replace(/Sekarang/gi, t('present'));
    }
    return period;
  };
  
  const translateType = (type) => {
    if (isEnglish) {
      if (type === 'Full-time') return t('fullTime');
      if (type === 'Part-time') return t('partTime');  
      if (type === 'Freelance') return t('freelance');
      if (type === 'Magang') return t('internship');
      if (type === 'Study Independent') return 'Study Independent';
    }
    return type;
  };

  const translateJobTitle = (title) => {
    if (!isEnglish) return title;
    
    if (title === 'Web Developer & UI/UX Designer') return t('webDeveloperUiUxDesigner');
    if (title === 'Web Developer') return t('webDeveloper');
    
    return title;
  };

  const translateResponsibilities = (responsibilities, jobTitle) => {
    if (!isEnglish) return responsibilities;
    
    // Map responsibilities based on job title and company context
    if (jobTitle === "Web Developer & UI/UX Designer" && responsibilities[0].includes("website company profile")) {
      return [
        t('frontendResp1'),
        t('frontendResp2'),
        t('frontendResp3'),
        t('frontendResp4'),
        t('frontendResp5')
      ];
    } else if (jobTitle === "Web Developer" && responsibilities[0].includes("Desain aplikasi")) {
      return [
        t('uiuxResp1'),
        t('uiuxResp2'),
        t('uiuxResp3'),
        t('uiuxResp4')
      ];
    } else if (jobTitle === "Web Developer & UI/UX Designer" && responsibilities[0].includes("Belajar fundamental")) {
      return [
        t('internResp1'),
        t('internResp2'),
        t('internResp3'),
        t('internResp4')
      ];
    }
    
    return responsibilities;
  };
  return (
    <div className={`relative flex items-start group transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}
         style={{ transitionDelay: `${index * 300}ms` }}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 sm:left-6 lg:left-8 top-12 sm:top-14 lg:top-16 w-0.5 h-24 sm:h-28 lg:h-32 bg-gradient-to-b from-accent-500 to-mono-600 group-hover:from-accent-400 group-hover:to-accent-600 transition-all duration-500"></div>
      )}
      
      {/* Timeline dot */}
      <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-accent-500 to-mono-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-accent-500/30 transition-all duration-500 border-2 sm:border-3 lg:border-4 border-mono-800 group-hover:border-accent-500/50">
        <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-mono-100 rounded-full flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
          <svg className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 min-w-2 sm:min-w-3 lg:min-w-4 min-h-2 sm:min-h-3 lg:min-h-4 text-mono-800 group-hover:text-mono-100 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="ml-4 sm:ml-6 lg:ml-8 flex-1">
        <div className="bg-mono-800/50 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl border border-mono-700 group-hover:border-accent-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/10 hover:scale-105 hover:-translate-y-2 hover:translate-x-2">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-mono-100 group-hover:text-accent-400 transition-colors duration-300 leading-tight">
              {translateJobTitle(experience.title)}
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-shrink-0">
              <div className="px-2 sm:px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-xs sm:text-sm font-medium border border-accent-500/30 group-hover:bg-accent-500/30 transition-colors">
                {translatePeriod(experience.period)}
              </div>
              {experience.type && (
                <div className="px-2 sm:px-3 py-1 bg-mono-600/50 text-mono-300 rounded-full text-xs sm:text-sm group-hover:bg-mono-500/50 group-hover:text-mono-200 transition-colors">
                  {translateType(experience.type)}
                </div>
              )}
            </div>
          </div>

          <h4 className="text-sm sm:text-base lg:text-lg text-accent-500 mb-2 sm:mb-3 font-medium group-hover:text-accent-400 transition-colors">{experience.company}</h4>

          {/* Description */}
          <ul className="space-y-1.5 sm:space-y-2 text-mono-300">
              {translateResponsibilities(experience.responsibilities, experience.title).map((responsibility, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-3 group-hover:text-mono-200 transition-colors duration-300" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="leading-relaxed text-xs sm:text-sm lg:text-base">{responsibility}</span>
                </li>
              ))}
          </ul>

          {/* Technologies */}
          {experience.technologies && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-mono-700 group-hover:border-mono-600 transition-colors">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-mono-700/50 text-mono-300 rounded-md text-xs border border-mono-600 hover:border-accent-500/50 hover:bg-accent-500/10 hover:text-accent-400 transition-all duration-300 hover:scale-110"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const [visibleElements, setVisibleElements] = useState({
    header: false,
    experiences: false,
    cta: false
  });

  useEffect(() => {
    // Sequential animation timing
    const timeouts = [
      setTimeout(() => setVisibleElements(prev => ({ ...prev, header: true })), 200),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, experiences: true })), 600),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, cta: true })), 1400)
    ];

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);
  const experiences = [
    {
      title: "Web Developer & UI/UX Designer",
      company: "Petrikor",
      period: "2023 - Present",
      type: "Freelance",
      responsibilities: [
        "Membangun website company profile dan landing page yang responsif dan modern",
        "Kolaborasi dengan tim UI/UX untuk mengimplementasikan desain yang interaktif",
        "Menerapkan Tailwind CSS dan React.js untuk styling dan development yang efisien",
        "Optimasi performa website dan implementasi best practices SEO",
        "Mentoring junior developer dan code review untuk maintain kualitas kode"
      ],
      technologies: ["React.js", "Tailwind CSS", "TypeScript", "Git", "Figma"]
    },
    {
      title: "Web Developer",
      company: "Komsos",
      period: "2023 - Present",
      type: "Freelance",
      responsibilities: [
        "Desain aplikasi mobile dan web untuk berbagai klien dari startup hingga enterprise",
        "Melakukan user research dan usability testing untuk meningkatkan user experience",
        "Membuat design system dan component library untuk konsistensi design",
        "Prototyping interaktif menggunakan Figma dan Adobe XD"
      ],
      technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Sketch", "InVision"]
    },
    {
      title: "Web Developer & UI/UX Designer",
      company: "PT Kinema Systrans Multimedia",
      period: "2024",
      type: "Study Independent",
      responsibilities: [
        "Belajar fundamental web development dan framework modern",
        "Membangun beberapa proyek sederhana untuk praktik",
        "Membuat desain UI/UX untuk aplikasi web dan mobile",
        "Prototyping interaktif menggunakan Figma"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery", "WordPress"]
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-mono-900 via-mono-800 to-mono-900 text-mono-100 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${visibleElements.header ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-mono-100 to-accent-500 bg-clip-text text-transparent">
            {t('professionalExperience')}
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-accent-500 to-mono-400 mx-auto rounded-full mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-mono-400 max-w-2xl mx-auto px-4">
            {t('experienceDescription')}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={index}
              experience={experience}
              index={index}
              isVisible={visibleElements.experiences}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-mono-800 to-mono-700 p-4 sm:p-6 lg:p-8 rounded-2xl border border-mono-600 hover:border-accent-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/10 hover:scale-105">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('interestedToCollaborate')}</h3>
            <p className="text-sm sm:text-base text-mono-400 mb-4 sm:mb-6 px-2 sm:px-0">
              {t('openForOpportunities')}
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-accent-500 to-mono-600 text-mono-100 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-accent-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border-2 border-black"
            >
              {t('letsDiscuss')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 min-w-4 sm:min-w-5 min-h-4 sm:min-h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
