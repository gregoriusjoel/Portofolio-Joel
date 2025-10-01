import React, { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../ui/ProjectCard";
import Modal from "../ui/Modal";
import { useLanguage } from '../../contexts/LanguageContext';
import 'boxicons/css/boxicons.min.css';

const Projects = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    setTimeout(() => setHeaderVisible(true), 200);
    setTimeout(() => setFiltersVisible(true), 600);
  }, []);

  const handlePreviewClick = (project) => {
    console.log('Preview clicked for project:', project);
    console.log('Project screenshots:', project.screenshots);
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = (filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year)); // Sort by year, newest first

  return (
    <section className="min-h-screen bg-gradient-to-br from-mono-800 via-mono-700 to-mono-800 text-mono-100 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-mono-100 to-accent-500 bg-clip-text text-transparent">
            {t('myProjects')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-mono-400 mx-auto rounded-full mb-4"></div>
          <p className="text-mono-400 max-w-2xl mx-auto mb-6">
            {t('projectsDescription')}
          </p>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 transition-all duration-1000 ${filtersVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {[
              { key: 'all', label: t('allProjects'), icon: 'bx-target-lock' },
              { key: 'web', label: t('webDevelopment'), icon: 'bx-laptop' },
              { key: 'android', label: t('androidApps'), icon: 'bx-mobile-alt' },
              { key: 'design', label: t('uiuxDesign'), icon: 'bx-palette' }
            ].map((category, index) => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-medium transition-all duration-500 flex items-center gap-1 sm:gap-2 hover:scale-105 hover:-translate-y-1 border-2 border-black text-xs sm:text-sm md:text-base ${
                  filter === category.key
                    ? 'bg-gradient-to-r from-accent-500 to-mono-600 text-mono-100 shadow-lg shadow-accent-500/25 hover:from-accent-400 hover:to-mono-500 hover:shadow-xl hover:shadow-accent-500/40'
                    : 'bg-mono-700/50 text-mono-300 hover:bg-mono-600/50 hover:text-mono-200 hover:shadow-lg hover:border-accent-500'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <i className={`bx ${category.icon} transition-transform duration-300 hover:scale-125 text-sm sm:text-base`}></i>
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              delay={filtersVisible ? 1000 + index * 200 : 0}
              onPreviewClick={handlePreviewClick}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-2000 ${filtersVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="bg-gradient-to-r from-mono-800 to-mono-700 p-8 rounded-2xl border border-mono-600 max-w-2xl mx-auto hover:border-accent-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/10 hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">{t('projectsCtaTitle')}</h3>
            <p className="text-mono-400 mb-6">
              {t('projectsCtaDescription')}
            </p>
            <a 
              href="/contact" 
              className="group relative inline-flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-black text-white rounded-full font-semibold border-2 border-gray-700 overflow-hidden text-sm sm:text-base"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative flex items-center gap-2">
                {t('projectsCtaButton')}
                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Pulsing border */}
              <div className="absolute inset-0 rounded-full border-2 border-accent-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Modal - Level layar penuh */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={selectedProject?.screenshots}
        title={selectedProject?.title}
      />
    </section>
  );
};

export default Projects;