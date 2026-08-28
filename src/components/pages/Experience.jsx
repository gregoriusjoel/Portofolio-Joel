import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../../contexts/LanguageContext';
import { experiences } from '../data/experience';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import 'boxicons/css/boxicons.min.css';

const getCompanyIcon = (experience) => {
  const title = (experience.title.en || '').toLowerCase();
  const company = (experience.company || '').toLowerCase();
  if (title.includes('manager')) return 'bx-task';
  if (title.includes('audio') || title.includes('penyiaran') || title.includes('broadcast')) return 'bx-broadcast';
  if (title.includes('editor')) return 'bx-microphone';
  if (company.includes('kinema') || experience.type.en === 'Study Independent') return 'bx-terminal';
  if (title.includes('ui/ux')) return 'bx-palette';
  return 'bx-code-alt';
};

const Experience = () => {
  const { t, isEnglish } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const translatePeriod = (exp) => (isEnglish ? exp.period.en : exp.period.id);
  const translateType = (exp) => (isEnglish ? exp.type.en : exp.type.id);
  const translateJobTitle = (exp) => (isEnglish ? exp.title.en : exp.title.id);
  const translateResponsibilities = (exp) => (isEnglish ? exp.responsibilities.en : exp.responsibilities.id);

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 text-gray-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 mb-3 shadow-sm">
            <i className="bx bx-briefcase text-sm text-gray-900"></i>
            <span>{isEnglish ? "Career Journey" : "Perjalanan Karir"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 text-gray-900 tracking-tight">
            {t('professionalExperience')}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gray-900 mx-auto rounded-full mb-3"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto px-4 font-normal leading-relaxed">
            {t('experienceDescription')}
          </p>
        </div>

        {/* ScrollStack Component */}
        <ScrollStack
          itemDistance={28}
          itemScale={0.03}
          itemStackDistance={16}
          stackPosition={90}
        >
          {experiences.map((experience, index) => (
            <ScrollStackItem 
              key={experience.id || index} 
              itemClassName="bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-xl shadow-gray-200/50 hover:border-gray-300 hover:shadow-2xl transition-all duration-300"
            >
              <div 
                className={`flex flex-col justify-between h-full transition-all duration-700 ease-out ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${150 + index * 100}ms`
                }}
              >
                <div>
                  {/* Top Badges & Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">
                        <i className={`bx ${getCompanyIcon(experience)}`}></i>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                          {experience.company}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mt-0.5">
                          {translateJobTitle(experience)}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0 pl-14 sm:pl-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-semibold border border-gray-200 whitespace-nowrap shadow-2xs">
                        <i className="bx bx-calendar text-xs text-gray-500"></i>
                        <span>{translatePeriod(experience)}</span>
                      </span>
                      <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-medium whitespace-nowrap shadow-2xs">
                        {translateType(experience)}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                      {isEnglish ? "Key Responsibilities & Achievements" : "Tanggung Jawab & Kontribusi"}
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                      {translateResponsibilities(experience).map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="w-4 h-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-900 text-[10px] flex-shrink-0 mt-0.5">
                            <i className="bx bx-check"></i>
                          </span>
                          <span className="flex-1">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies Stack */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="pt-3.5 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                        Stack:
                      </span>
                      {experience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-lg text-[11px] font-semibold border border-gray-200 transition-all hover:bg-gray-900 hover:text-white hover:border-gray-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* Call to Action Banner */}
        <div 
          className={`mt-10 text-center transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{ transitionDelay: `${200 + experiences.length * 100}ms` }}
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
            {/* Background glow accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
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

export default Experience;
