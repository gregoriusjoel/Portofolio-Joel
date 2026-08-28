import React, { useState } from "react";
import ContributorsPopup from "./ContributorsPopup";
import { useLanguage } from '../../contexts/LanguageContext';
import 'boxicons/css/boxicons.min.css';

const getVideoThumbnail = (project) => {
  if (project.image && project.image !== '#' && project.image !== '') {
    return project.image;
  }
  const url = project.video || project.demo || '';
  
  // YouTube link
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }

  // Instagram Reel / Post link
  const igMatch = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    return `https://www.instagram.com/p/${igMatch[1]}/media/?size=l`;
  }

  return null;
};

const ProjectCard = ({ project, delay = 0, onPreviewClick }) => {
  const { t, isEnglish } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showContributors, setShowContributors] = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const isEditorOrVideo = (
    project?.category === 'video' ||
    (project?.contributors && project.contributors.some(c => c.role && c.role.toLowerCase().includes('video')))
  );

  const rawThumbnail = (project.category === 'video' || project.video || (project.demo && project.demo.includes('instagram.com')))
    ? getVideoThumbnail(project)
    : (project.image && project.image !== '#' && project.image !== '') ? project.image : null;

  const displayThumbnail = !imgError ? rawThumbnail : null;

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-1.5 flex flex-col justify-between ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Project Thumbnail */}
        <div 
          className="relative h-52 sm:h-56 overflow-hidden bg-gray-950 border-b border-gray-100 cursor-pointer"
          onClick={() => onPreviewClick(project)}
        >
          {displayThumbnail ? (
            <>
              <img 
                src={displayThumbnail}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 group-hover:from-black/70 transition-colors duration-300"></div>
              {/* Center Play Button Badge for Video */}
              {(project.category === 'video' || project.video || (project.demo && project.demo.includes('instagram.com'))) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-13 h-13 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                    <i className="bx bx-play text-3xl ml-0.5"></i>
                  </div>
                </div>
              )}
            </>
          ) : (project.category === 'video' || project.video || (project.demo && project.demo.includes('instagram.com'))) ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-13 h-13 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  <i className="bx bx-play text-3xl ml-0.5"></i>
                </div>
                <span className="text-xs font-semibold text-gray-300 mt-1 line-clamp-1">{project.title}</span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <i className="bx bx-image text-3xl text-gray-400"></i>
            </div>
          )}

          {/* Floating Category & Year Tag (Top-Left) */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white rounded-full text-[11px] font-semibold tracking-wide capitalize flex items-center gap-1 shadow-sm">
              <i className={`bx ${
                project.category === 'web' ? 'bx-laptop' :
                project.category === 'android' ? 'bx-mobile-alt' :
                project.category === 'design' ? 'bx-palette' :
                project.category === 'video' ? 'bx-film' : 'bx-folder'
              } text-xs`}></i>
              <span>{project.category || 'Project'}</span>
            </span>
          </div>

          {/* Floating Status Badge (Top-Right) */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full backdrop-blur-md shadow-sm ${
              project.status === 'completed' 
                ? 'bg-emerald-500/90 text-white' 
                : project.status === 'in-progress'
                ? 'bg-amber-500/90 text-white'
                : 'bg-blue-500/90 text-white'
            }`}>
              {project.status === 'completed' ? (
                <>
                  <i className="bx bx-check-circle text-xs"></i>
                  <span>{t('completed')}</span>
                </>
              ) : project.status === 'in-progress' ? (
                <>
                  <i className="bx bx-loader-circle bx-spin text-xs"></i>
                  <span>In Progress</span>
                </>
              ) : (
                <>
                  <i className="bx bx-bulb text-xs"></i>
                  <span>Konsep</span>
                </>
              )}
            </span>
          </div>
          
          {/* Action Buttons Overlay */}
          <div className={`absolute inset-0 z-20 flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-[3px] p-3 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}>
            {(project.video || (project.demo && project.demo.includes('instagram.com'))) && (
              <button
                onClick={() => onPreviewClick(project)}
                className="px-3.5 py-2 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
              >
                <i className="bx bx-play-circle text-base"></i>
                <span>Watch</span>
              </button>
            )}

            {/* Demo Button: only rendered if valid demo link exists */}
            {project.demo && project.demo !== '#' && project.demo.trim() !== '' && !project.demo.includes('instagram.com') && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl text-xs sm:text-sm flex items-center gap-1.5 transform hover:scale-105"
              >
                <i className="bx bx-link-external text-base"></i> 
                <span>Demo</span>
              </a>
            )}

            {/* Preview Button */}
            {!isEditorOrVideo && (
              <button 
                onClick={() => onPreviewClick(project)}
                className="px-3.5 py-2 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all duration-200 shadow-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
              >
                <i className="bx bx-images text-base"></i>
                <span>Preview</span>
              </button>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-black transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 font-normal">
            {getDescription(project.description)}
          </p>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-2.5 py-0.5 bg-gray-50 text-gray-700 rounded-lg text-[11px] font-semibold border border-gray-200/90 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Area: Duration & Team (Star Rating Removed) */}
      <div className="px-6 pb-6 pt-3.5 border-t border-gray-100 space-y-3">
        {/* Project Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>
            {project.duration ? (
              <span className="inline-flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 font-medium">
                <i className="bx bx-time-five text-gray-400"></i>
                <span>{translateDuration(project.duration)}</span>
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md text-[11px]">
            {project.year}
          </span>
        </div>

        {/* Contributors Bar */}
        {project.contributors && project.contributors.length > 0 && (
          <div className="pt-2.5 border-t border-gray-100/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">{t('contributors')}</span>
              <div className="flex -space-x-1.5">
                {project.contributors.slice(0, 3).map((contributor, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-gray-900 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white shadow-sm"
                    title={contributor.name}
                  >
                    <i className={`bx ${contributor.avatar || 'bx-user'}`}></i>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowContributors(true)}
              className="text-xs font-semibold text-gray-700 hover:text-black hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{t('viewTeam')}</span>
              <i className="bx bx-chevron-right text-sm"></i>
            </button>
          </div>
        )}
      </div>

      {/* Contributors Modal */}
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