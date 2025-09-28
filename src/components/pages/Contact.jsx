// Contact
import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../contexts/LanguageContext';

const ContactInfo = ({ icon, title, info, link, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <a
      href={link}
      target={link.startsWith('http') ? '_blank' : '_self'}
      rel={link.startsWith('http') ? 'noopener noreferrer' : ''}
      className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-mono-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-mono-700 hover:border-accent-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/10 transform sm:hover:scale-[1.02] sm:hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-500 to-mono-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-accent-500/20">
        <i className={`bx ${icon} text-mono-100 text-lg sm:text-xl`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-mono-100 group-hover:text-accent-400 transition-colors duration-300">{title}</h3>
        <p className="text-mono-400 text-xs sm:text-sm truncate group-hover:text-mono-300 transition-colors">{info}</p>
      </div>
      <div className="flex-shrink-0">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-mono-500 group-hover:text-accent-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </a>
  );
};

const FormField = ({ label, type = "text", name, placeholder, rows, required = true, icon }) => {
  const { t } = useLanguage();
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError('');
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (required && !value.trim()) {
      setError(`${label} ${t('required')}`);
    }
  };

  const InputComponent = rows ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label className="block text-mono-200 font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <div className={`absolute left-4 text-mono-400 ${rows ? 'top-4' : 'top-1/2 transform -translate-y-1/2'}`}>
            {icon}
          </div>
        )}
        <InputComponent
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-mono-700/50 border rounded-xl text-mono-100 placeholder-mono-500 focus:outline-none transition-all duration-300 ${
            error 
              ? 'border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20' 
              : isFocused || value
              ? 'border-accent-500 focus:ring-2 focus:ring-accent-500/20'
              : 'border-mono-600 hover:border-mono-500'
          }`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [mounted, setMounted] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    setTimeout(() => setHeaderVisible(true), 200);
    setTimeout(() => setFormVisible(true), 600);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Untuk development, kita akan gunakan demo EmailJS configuration
      // Anda perlu mendaftar di EmailJS dan mengganti dengan kredensial yang benar
      const serviceID = 'service_demo'; 
      const templateID = 'template_demo'; 
      const publicKey = 'demo_public_key'; 
      
      // Get form data
      const formData = new FormData(e.target);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_email: 'hi.gregoriusjoel@gmail.com'
      };
      
      // For now, simulate email sending since we don't have real EmailJS credentials
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Would send email with data:', templateParams);
      setSubmitStatus('success');
      
      // Reset form
      e.target.reset();
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
    
    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  const contactMethods = [
    {
      icon: "bx-envelope",
      title: t('email'),
      info: "hi.gregoriusjoel@gmail.com",
      link: "mailto:hi.gregoriusjoel@gmail.com"
    },
    {
      icon: "bx-phone",
      title: t('whatsapp'),
      info: "+62 822-8226-2157",
      link: "https://wa.me/6282282262157"
    },
    {
      icon: "bxl-linkedin-square",
      title: t('linkedin'),
      info: "linkedin.com/in/gregorius-joel",
      link: "https://www.linkedin.com/in/gregorius-joel/"
    },
    {
      icon: "bxl-github",
      title: t('github'),
      info: "github.com/gregoriusjoel",
      link: "https://github.com/gregoriusjoel"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-mono-900 via-mono-800 to-mono-900 flex items-center pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(120,119,198,0.3),_transparent_50%)] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(255,111,97,0.2),_transparent_50%)] opacity-30"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-accent-500/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className={`transition-all duration-1000 ${headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-mono-100 mb-2">
                {t('contactTitle')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-mono-400">
                  {t('contactSubtitle')}
                </span>
              </h2>
              <p className="text-mono-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                {t('contactDescription')}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <ContactInfo
                  key={index}
                  icon={method.icon}
                  title={method.title}
                  info={method.info}
                  link={method.link}
                  delay={800 + index * 100}
                />
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:pl-8 flex">
            <div className={`bg-mono-800/30 backdrop-blur-xl rounded-3xl border border-mono-700/50 p-8 shadow-2xl transition-all duration-1000 w-full flex flex-col ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h3 className="text-2xl font-bold text-mono-100 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-mono-600 rounded-lg flex items-center justify-center">
                <i className="bx bx-envelope text-mono-100 text-lg"></i>
              </div>
              {t('sendMessage')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`transition-all duration-700 ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '900ms' }}>
                  <FormField
                    label={t('fullName')}
                    name="name"
                    placeholder={t('fullNamePlaceholder')}
                    icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>}
                  />
                </div>
                <div className={`transition-all duration-700 ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
                  <FormField
                    label={t('email')}
                    type="email"
                    name="email"
                    placeholder={t('emailPlaceholder')}
                    icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>}
                  />
                </div>
              </div>

              <div className={`transition-all duration-700 ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '1100ms' }}>
                <FormField
                  label={t('subject')}
                  name="subject"
                  placeholder={t('subjectPlaceholder')}
                  icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/></svg>}
                />
              </div>

              <div className={`transition-all duration-700 ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
                <FormField
                  label={t('message')}
                  name="message"
                  placeholder={t('messagePlaceholder')}
                  rows="5"
                  icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>}
                />
              </div>
              </div>

              <div className={`transition-all duration-700 ${formVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '1300ms' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${
                    isSubmitting
                      ? 'bg-mono-600 text-mono-400 cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-green-500 text-mono-100 hover:shadow-lg hover:shadow-green-500/25'
                      : submitStatus === 'error'
                      ? 'bg-red-500 text-mono-100 hover:shadow-lg hover:shadow-red-500/25'
                      : 'bg-gradient-to-r from-accent-500 to-mono-600 text-mono-100 hover:from-accent-400 hover:to-mono-500 hover:shadow-xl hover:shadow-accent-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      {t('sending')}
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {t('messageSent')}
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {t('sendFailed')}
                    </>
                  ) : (
                    <>
                      <i className="bx bx-paper-plane text-lg transition-transform group-hover:translate-x-1"></i>
                      {t('sendButton')}
                    </>
                  )}
                </button>
              </div>
            </form>

            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  {t('successMessage')}
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {t('errorMessage')}
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;