// About
import React, { useState, useEffect } from "react";
import { useLanguage } from '../../contexts/LanguageContext';
import { skills, getTools } from '../data/aboutData';
import 'boxicons/css/boxicons.min.css';

const SkillBar = ({ skill, percentage, delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  const getSkillIcon = (skillName) => {
    const icons = {
      'Python': 'bxl-python',
      'JavaScript': 'bxl-javascript',
      'React JS': 'bxl-react',
      'TypeScript': 'bxl-typescript',
      'Laravel': 'bxl-php',
      'Golang': 'bx-code-curly',
      'Flutter': 'bx-mobile-alt',
      'MySQL': 'bx-data',
      'Tailwind CSS': 'bxl-css3',
      'UI/UX Design': 'bx-palette',
      'Responsive Web': 'bx-devices'
    };
    return icons[skillName] || 'bx-code-alt';
  };

  return (
    <div 
      className="mb-3 sm:mb-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-gray-800 to-black border border-gray-600 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-black/20`}>
            <i className={`bx ${getSkillIcon(skill)} text-white text-sm sm:text-base`}></i>
          </div>
          <span className="text-gray-800 font-medium text-sm sm:text-base group-hover:text-black transition-colors duration-300">{skill}</span>
        </div>
        <span className={`text-xs sm:text-sm font-bold px-2 py-1 rounded-md bg-gray-800 text-white border border-gray-600 transform transition-all duration-300 ${isHovered ? 'scale-105 shadow-md' : ''}`}>
          {percentage}%
        </span>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-md h-2 overflow-hidden border border-gray-300">
          <div
            className={`h-full bg-gradient-to-r from-gray-800 to-black rounded-md transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: `${width}%` }}
          >
            {/* Elegant shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visibleElements, setVisibleElements] = useState({
    header: false,
    profile: false,
    description: false,
    skills: false,
    tools: false
  });

  useEffect(() => {
    setMounted(true);
    
    const timers = [
      setTimeout(() => setVisibleElements(prev => ({ ...prev, header: true })), 200),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, profile: true })), 400),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, description: true })), 600),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, skills: true })), 800),
      setTimeout(() => setVisibleElements(prev => ({ ...prev, tools: true })), 1000)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Import tools from data file
  const tools = getTools(t);

  return (
    <section className="min-h-screen bg-gradient-to-br from-mono-800 via-mono-700 to-mono-800 text-mono-100 pt-0.5 pb-8 sm:pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${visibleElements.header ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-mono-100 to-accent-500 bg-clip-text text-transparent">
            {t('aboutMe')}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-accent-500 to-mono-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Profile Image and Info */}
          <div className={`flex flex-col items-center lg:items-start transition-all duration-1000 ${visibleElements.profile ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="relative mb-6 group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-accent-500/20 group-hover:border-accent-500/40 transition-all duration-300 group-hover:shadow-accent-500/20">
                <img 
                  src="/assets/project/Foto Profile/Foto Joel.JPG"
                  alt="Joel Working"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white text-black border-2 border-black px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1 sm:gap-2">
                <i className='bx bx-rocket'></i> 
                <span className="hidden sm:inline">Available for Work</span>
                <span className="sm:hidden">Available</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`space-y-4 lg:space-y-6 transition-all duration-1000 ${visibleElements.description ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <p className="text-sm sm:text-base lg:text-lg text-mono-300 leading-relaxed">
              {t('aboutDescription1').split('Joel').map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && <span className="text-accent-500 font-semibold">Joel</span>}
                </span>
              ))}
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-mono-400 leading-relaxed">
              {t('aboutDescription2')} {t('aboutDescription3')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 lg:mt-8">
              {[
                { number: "1+", label: "Years Experience" },
                { number: "5+", label: "Projects Done" },
                { number: "2+", label: "Happy Clients" }
              ].map((stat, index) => (
                <div key={stat.label} className={`text-center p-2 sm:p-4 bg-mono-700/50 rounded-xl border border-mono-600 hover:border-accent-500/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/10 ${visibleElements.description ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                     style={{ transitionDelay: `${800 + index * 100}ms` }}>
                  <div className="text-lg sm:text-2xl font-bold text-accent-500">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-mono-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section - Compact Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Technical Skills */}
            <div className={`bg-white backdrop-blur-sm p-5 sm:p-6 lg:p-7 rounded-2xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200 relative overflow-hidden group ${visibleElements.skills ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-3">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-800 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gray-600 rounded-full translate-y-10 -translate-x-10 group-hover:scale-125 transition-transform duration-700"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-3 text-gray-800 group-hover:text-black transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-black/20 group-hover:scale-105 transition-all duration-300 border border-gray-600">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-base sm:text-lg">{t('technicalSkills')}</span>
                    <div className="text-xs text-gray-500 font-normal">{t('programmingDevelopment')}</div>
                  </div>
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className={`transition-all duration-700 ${visibleElements.skills ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}
                         style={{ transitionDelay: `${index * 100}ms` }}>
                      <SkillBar
                        skill={skill.name}
                        percentage={skill.percentage}
                        delay={visibleElements.skills ? index * 150 + 200 : 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className={`bg-white backdrop-blur-sm p-5 sm:p-6 lg:p-7 rounded-2xl border border-gray-300 hover:border-gray-400 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200 relative overflow-hidden group ${visibleElements.tools ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-3">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gray-600 rounded-full -translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 bg-gray-800 rounded-full translate-y-14 translate-x-14 group-hover:scale-125 transition-transform duration-700"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-3 text-gray-800 group-hover:text-black transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-black/20 group-hover:scale-105 transition-all duration-300 border border-gray-600">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-base sm:text-lg">{t('toolsPlatforms')}</span>
                    <div className="text-xs text-gray-500 font-normal">{t('developmentEnvironment')}</div>
                  </div>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {tools.map((tool, index) => (
                    <div key={tool.name} className={`group/tool flex items-center gap-3 p-3 sm:p-4 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${visibleElements.tools ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                         style={{ transitionDelay: `${index * 80}ms` }}>
                      
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-gray-800 to-black border border-gray-600 flex items-center justify-center shadow-md group-hover/tool:shadow-lg group-hover/tool:scale-110 transition-all duration-300`}>
                        <i className={`bx ${tool.icon} text-white text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-800 text-sm sm:text-base font-medium group-hover/tool:text-black transition-colors duration-300 block">{tool.name}</span>
                        <div className="text-xs text-gray-500 group-hover/tool:text-gray-600 transition-colors duration-300">{tool.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
