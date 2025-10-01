import React, { useState } from "react";
import ContributorsPopup from "./ContributorsPopup";
import { useLanguage } from '../../contexts/LanguageContext';
import 'boxicons/css/boxicons.min.css';

const ProjectCard = ({ project, delay = 0, onPreviewClick }) => {
  const { t, isEnglish } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showContributors, setShowContributors] = useState(false);

  const translateDuration = (duration) => {
    if (!duration) return '';
    
    if (isEnglish) {
      return duration.replace(/minggu/gi, 'weeks').replace(/Minggu/gi, 'Weeks');
    }
    return duration;
  };

  const getDescription = (description) => {
    if (typeof description === 'object' && description !== null) {
      return isEnglish ? description.en : description.id;
    }
    return description;
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group relative bg-gradient-to-br from-mono-800 to-mono-700 rounded-2xl overflow-hidden border border-mono-600 hover:border-accent-500/50 transition-all duration-700 hover:shadow-2xl hover:shadow-accent-500/20 transform hover:scale-[1.02] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mono-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Overlay with buttons */}
        <div className={`absolute inset-0 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 transition-all duration-500 flex-wrap p-2 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Demo button - Show only for projects that are NOT in the excluded list */}
          {!["Vameratale E-Commerce", "Sistem Kasir Ayam Geprek", "Website BISINDO SIGN Language"].includes(project.title) && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/50 text-black rounded-full font-semibold hover:bg-white/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg border-2 border-black text-xs sm:text-sm flex items-center gap-1 sm:gap-2 min-w-0"
            >
              <i className='bx bx-link-external text-sm'></i> 
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Demo</span>
            </a>
          )}
          
          {/* Code button - Hide for specific projects */}
          {!["Sistem Klinik Gudang", "Petrikor", "Vameratale E-Commerce"].includes(project.title) && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/50 text-black rounded-full font-semibold hover:bg-white/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg border-2 border-black text-xs sm:text-sm flex items-center gap-1 sm:gap-2 min-w-0"
            >
              <i className='bx bx-code-alt text-sm'></i>
              <span className="hidden sm:inline">Code</span>
              <span className="sm:hidden">Code</span>
            </a>
          )}
          
          <button 
            onClick={() => onPreviewClick(project)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/50 text-black rounded-full font-semibold hover:bg-white/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg border-2 border-black text-xs sm:text-sm flex items-center gap-1 sm:gap-2 min-w-0"
          >
            <i className='bx bx-image-alt text-sm'></i>
            <span className="hidden sm:inline">Preview</span>
            <span className="sm:hidden">View</span>
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Status Badge */}
        <div className="mb-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 hover:scale-110 flex items-center gap-1 ${
            project.status === 'completed' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
              : project.status === 'in-progress'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
          }`}>
            {project.status === 'completed' ? (
              <>
                <i className='bx bx-check-circle'></i> {t('completed')}
              </>
            ) : project.status === 'in-progress' ? (
              <>
                <i className='bx bx-loader-circle bx-spin'></i> In Progress
              </>
            ) : (
              <>
                <i className='bx bx-bulb'></i> Konsep
              </>
            )}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold mb-3 text-mono-100 group-hover:text-accent-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-mono-400 mb-4 leading-relaxed group-hover:text-mono-300 transition-colors duration-300">
          {getDescription(project.description)}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-mono-600/50 text-mono-300 rounded-md text-xs border border-mono-500 hover:border-accent-500/50 hover:bg-accent-500/10 hover:text-accent-400 transition-all duration-300 hover:scale-110"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-sm text-mono-400 pt-4 border-t border-mono-600 group-hover:border-mono-500 transition-colors">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 group-hover:text-accent-500 transition-colors">
              <i className='bx bx-star'></i>
              {project.rating || '5.0'}
            </span>
            <span className="flex items-center gap-1 group-hover:text-accent-500 transition-colors">
              <i className='bx bx-time'></i>
              {translateDuration(project.duration)}
            </span>
          </div>
          <span className="text-accent-500 font-medium group-hover:text-accent-400 transition-colors">{project.year}</span>
        </div>

        {/* Contributors Section */}
        {project.contributors && project.contributors.length > 0 && (
          <div className="mt-4 pt-4 border-t border-mono-600 group-hover:border-mono-500 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <i className="bx bx-group text-mono-400 text-sm"></i>
                  <span className="text-mono-400 text-sm">{t('contributors')}</span>
                </div>
                <div className="flex -space-x-2">
                  {project.contributors.slice(0, 3).map((contributor, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gradient-to-br from-accent-500 to-mono-600 rounded-full border-2 border-mono-700 flex items-center justify-center text-sm hover:scale-110 transition-transform duration-200 text-white"
                      title={contributor.name}
                    >
                      <i className={`bx ${contributor.avatar}`}></i>
                    </div>
                  ))}
                  {project.contributors.length > 3 && (
                    <div className="w-8 h-8 bg-mono-600 rounded-full border-2 border-mono-700 flex items-center justify-center text-xs text-mono-300">
                      +{project.contributors.length - 3}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowContributors(true)}
                className="text-xs text-accent-400 hover:text-accent-300 hover:underline transition-colors duration-200"
              >
                {t('viewTeam')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contributors Popup */}
      <ContributorsPopup 
        isOpen={showContributors}
        onClose={() => setShowContributors(false)}
        contributors={project.contributors}
        projectTitle={project.title}
      />
    </div>
  );
};

export default ProjectCard;