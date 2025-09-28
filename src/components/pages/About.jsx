// About
import React, { useState, useEffect } from "react";
import { useLanguage } from '../../contexts/LanguageContext';
import 'boxicons/css/boxicons.min.css';

const SkillBar = ({ skill, percentage, delay = 0 }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, delay);
    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-mono-200 font-medium">{skill}</span>
        <span className="text-accent-500 text-sm">{percentage}%</span>
      </div>
      <div className="w-full bg-mono-600 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-accent-500 to-mono-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
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

  const skills = [
    { name: "React JS", percentage: 90 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "UI/UX Design", percentage: 80 },
    { name: "Responsive Web", percentage: 95 },
    { name: "JavaScript", percentage: 88 },
    { name: "TypeScript", percentage: 75 }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-mono-800 via-mono-700 to-mono-800 text-mono-100 pt-8 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleElements.header ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mono-100 to-accent-500 bg-clip-text text-transparent">
            {t('aboutMe')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-mono-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image and Info */}
          <div className={`flex flex-col items-center lg:items-start transition-all duration-1000 ${visibleElements.profile ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="relative mb-6 group">
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-accent-500/20 group-hover:border-accent-500/40 transition-all duration-300 group-hover:shadow-accent-500/20">
                <img 
                  src="/src/assets/project/Foto Profile/Foto Joel.JPG"
                  alt="Joel Working"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-black border-2 border-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <i className='bx bx-rocket'></i> Available for Work
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`space-y-6 transition-all duration-1000 ${visibleElements.description ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <p className="text-base md:text-lg text-mono-300 leading-relaxed">
              {t('aboutDescription1').split('Joel').map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && <span className="text-accent-500 font-semibold">Joel</span>}
                </span>
              ))}
            </p>
            <p className="text-base md:text-lg text-mono-400 leading-relaxed">
              {t('aboutDescription2')} {t('aboutDescription3')}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "50+", label: "Projects Done" },
                { number: "25+", label: "Happy Clients" }
              ].map((stat, index) => (
                <div key={stat.label} className={`text-center p-4 bg-mono-700/50 rounded-xl border border-mono-600 hover:border-accent-500/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/10 ${visibleElements.description ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                     style={{ transitionDelay: `${800 + index * 100}ms` }}>
                  <div className="text-2xl font-bold text-accent-500">{stat.number}</div>
                  <div className="text-sm text-mono-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className={`bg-mono-700/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-mono-600 hover:border-accent-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/10 hover:scale-105 ${visibleElements.skills ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-mono-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-mono-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              Technical Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className={`transition-all duration-700 ${visibleElements.skills ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}
                     style={{ transitionDelay: `${index * 150}ms` }}>
                  <SkillBar
                    skill={skill.name}
                    percentage={skill.percentage}
                    delay={visibleElements.skills ? index * 200 + 300 : 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Others */}
          <div className={`bg-mono-700/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-mono-600 hover:border-accent-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/10 hover:scale-105 ${visibleElements.tools ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-mono-400 to-accent-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-mono-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
              </div>
              Tools & Platforms
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "VS Code", icon: "bx-code-alt" },
                { name: "Figma", icon: "bxl-figma" },
                { name: "Git & GitHub", icon: "bxl-git" },
                { name: "Vite", icon: "bx-bolt" },
                { name: "Node.js", icon: "bxl-nodejs" },
                { name: "MongoDB", icon: "bx-data" }
              ].map((tool, index) => (
                <div key={tool.name} className={`flex items-center gap-3 p-3 bg-mono-800/50 rounded-lg hover:bg-mono-600/50 transition-all duration-500 hover:scale-105 hover:shadow-md hover:outline hover:outline-2 hover:outline-black ${visibleElements.tools ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
                     style={{ transitionDelay: `${index * 100}ms` }}>
                  
                  <i className={`bx ${tool.icon} text-xl`}></i>
                  <span className="text-mono-300">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
