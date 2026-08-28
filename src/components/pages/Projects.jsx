import React, { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../ui/ProjectCard";
import Modal from "../ui/Modal";
import { useLanguage } from '../../contexts/LanguageContext';
import 'boxicons/css/boxicons.min.css';

const Projects = () => {
  const { t, isEnglish } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreviewClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const categoryPriority = { web: 1, android: 2, design: 3, video: 4 };

  const filteredProjects = (filter === 'all' 
    ? [...projects] 
    : projects.filter(project => project.category === filter))
    .sort((a, b) => {
      // 1. In-progress status always comes first at the very beginning
      const aProgress = a.status === 'in-progress' ? 0 : 1;
      const bProgress = b.status === 'in-progress' ? 0 : 1;
      if (aProgress !== bProgress) return aProgress - bProgress;

      // 2. Category order (Web -> Android -> Design -> Video) when viewing all
      if (filter === 'all') {
        const catDiff = (categoryPriority[a.category] || 99) - (categoryPriority[b.category] || 99);
        if (catDiff !== 0) return catDiff;
      }

      // 3. Year newest first
      return parseInt(b.year) - parseInt(a.year);
    });

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 text-gray-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 mb-3 shadow-sm">
            <i className="bx bx-folder-open text-sm text-gray-900"></i>
            <span>{isEnglish ? "Featured Works" : "Portofolio Pilihan"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 text-gray-900 tracking-tight">
            {t('myProjects')}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gray-900 mx-auto rounded-full mb-3"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4 font-normal leading-relaxed">
            {t('projectsDescription')}
          </p>

          {/* Filter Pill Buttons */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-8 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            {[
              { key: 'all', label: t('allProjects'), icon: 'bx-grid-alt' },
              { key: 'web', label: t('webDevelopment'), icon: 'bx-laptop' },
              { key: 'android', label: t('androidApps'), icon: 'bx-mobile-alt' },
              { key: 'design', label: t('uiuxDesign'), icon: 'bx-palette' },
              { key: 'video', label: 'Video & Editing', icon: 'bx-film' }
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm cursor-pointer ${
                  filter === category.key
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-black shadow-xs'
                }`}
              >
                <i className={`bx ${category.icon} text-sm`}></i>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              delay={mounted ? 150 + index * 80 : 0}
              onPreviewClick={handlePreviewClick}
            />
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className={`mt-16 sm:mt-20 text-center transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full filter blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white">
                {t('projectsCtaTitle')}
              </h3>
              <p className="text-gray-300 mb-6 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                {t('projectsCtaDescription')}
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
              >
                <span>{t('projectsCtaButton')}</span>
                <i className="bx bx-right-arrow-alt text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={selectedProject?.screenshots}
        videoUrl={selectedProject?.video || (selectedProject?.demo && selectedProject.demo.includes('instagram.com') ? selectedProject.demo.replace(/\/?(\?.*)?$/, '/embed') : null)}
        title={selectedProject?.title}
      />
    </section>
  );
};

export default Projects;