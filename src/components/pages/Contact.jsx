import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../contexts/LanguageContext';
import { emailjsConfig } from '../../config/emailjs';

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
      className={`group flex items-center gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-md">
        <i className={`bx ${icon} text-2xl`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
          {title}
        </span>
        <p className="font-bold text-gray-900 text-sm sm:text-base truncate mt-0.5 group-hover:text-black">
          {info}
        </p>
      </div>
      <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300 flex-shrink-0">
        <i className="bx bx-right-arrow-alt text-lg"></i>
      </div>
    </a>
  );
};

const FormField = ({ label, type = "text", name, placeholder, rows, required = true, icon, error }) => {
  const InputComponent = rows ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label className="block text-gray-800 text-xs sm:text-sm font-bold tracking-tight">{label}</label>
      <div className="relative">
        {icon && (
          <div className={`absolute left-4 text-gray-400 ${rows ? 'top-4' : 'top-1/2 transform -translate-y-1/2'}`}>
            {icon}
          </div>
        )}
        <InputComponent
          type={type}
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 sm:py-3.5 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all duration-200 text-xs sm:text-sm ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : 'border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 hover:border-gray-300'
          }`}
        />
      </div>
      {error && (
        <p className="text-red-600 text-xs flex items-center gap-1.5 mt-1 font-medium">
          <i className="bx bx-error-circle text-sm"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

const Contact = () => {
  const { t, isEnglish } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [mounted, setMounted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.get('name')?.trim()) {
      errors.name = t('fullName') + ' ' + t('required');
    }
    
    const email = formData.get('email')?.trim();
    if (!email) {
      errors.email = t('email') + ' ' + t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('invalidEmail');
    }
    
    if (!formData.get('subject')?.trim()) {
      errors.subject = t('subject') + ' ' + t('required');
    }
    
    const message = formData.get('message')?.trim();
    if (!message) {
      errors.message = t('message') + ' ' + t('required');
    } else if (message.length < 10) {
      errors.message = t('messageMinLength');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setFormErrors({});
    
    const form = e.target;
    const formData = new FormData(form);
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const { serviceID, templateID, publicKey } = emailjsConfig;
      
      if (serviceID === 'YOUR_SERVICE_ID' || templateID === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitStatus('success');
        form.reset();
        return;
      }
      
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_email: 'hi.gregoriusjoel@gmail.com',
        reply_to: formData.get('email')
      };
      
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setSubmitStatus('success');
      form.reset();
    } catch (err) {
      console.error('Email send failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: "bx-envelope",
      title: t('email'),
      info: "hi.gregoriusjoel@gmail.com",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=hi.gregoriusjoel@gmail.com"
    },
    {
      icon: "bxl-linkedin-square",
      title: t('linkedin'),
      info: "Gregorius Joel",
      link: "https://www.linkedin.com/in/gregorius-joel/"
    },
    {
      icon: "bxl-github",
      title: t('github'),
      info: "@gregoriusjoel",
      link: "https://github.com/gregoriusjoel"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 text-gray-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700 mb-3 shadow-sm">
            <i className="bx bx-message-square-dots text-sm text-gray-900"></i>
            <span>{isEnglish ? "Get In Touch" : "Hubungi Saya"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3">
            {t('contactTitle')}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gray-900 mx-auto rounded-full mb-3"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto px-4 font-normal leading-relaxed">
            {t('contactDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Contact Channels & Status */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Availability Status Card */}
            <div className={`p-6 bg-white rounded-3xl border border-gray-200/90 shadow-sm transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {isEnglish ? "Available for Work" : "Tersedia untuk Project"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {isEnglish 
                  ? "Open for freelance opportunities, web development, and UI/UX design collaboration." 
                  : "Menerima kesempatan freelance, kolaborasi web development, serta desain UI/UX."}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <i className="bx bx-map text-sm text-gray-700"></i>
                  <span>Indonesia (UTC+7)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="bx bx-time text-sm text-gray-700"></i>
                  <span>&lt; 24h Response</span>
                </span>
              </div>
            </div>

            {/* Contact Channels */}
            {contactMethods.map((method, index) => (
              <ContactInfo
                key={index}
                icon={method.icon}
                title={method.title}
                info={method.info}
                link={method.link}
                delay={mounted ? index * 100 : 0}
              />
            ))}
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className={`lg:col-span-7 transition-all duration-700 delay-150 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 lg:p-10 shadow-xl shadow-gray-200/50">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-lg shadow-md flex-shrink-0">
                  <i className="bx bx-envelope"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{t('sendMessage')}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {isEnglish ? "Fill in the details and I'll get back to you shortly." : "Isi formulir berikut dan saya akan segera merespons."}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <FormField
                    label={t('fullName')}
                    name="name"
                    placeholder={t('fullNamePlaceholder')}
                    error={formErrors.name}
                    icon={<i className="bx bx-user text-base"></i>}
                  />
                  <FormField
                    label={t('email')}
                    type="email"
                    name="email"
                    placeholder={t('emailPlaceholder')}
                    error={formErrors.email}
                    icon={<i className="bx bx-envelope text-base"></i>}
                  />
                </div>

                <FormField
                  label={t('subject')}
                  name="subject"
                  placeholder={t('subjectPlaceholder')}
                  error={formErrors.subject}
                  icon={<i className="bx bx-bookmark text-base"></i>}
                />

                <FormField
                  label={t('message')}
                  name="message"
                  placeholder={t('messagePlaceholder')}
                  rows="4"
                  error={formErrors.message}
                  icon={<i className="bx bx-edit-alt text-base"></i>}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-[1.01] cursor-pointer text-xs sm:text-sm ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : submitStatus === 'success'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : submitStatus === 'error'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                      : 'bg-gray-900 text-white hover:bg-black shadow-xl shadow-gray-900/15'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="bx bx-loader-alt bx-spin text-lg"></i>
                      <span>{t('sending')}</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <i className="bx bx-check-circle text-lg"></i>
                      <span>{t('messageSent')}</span>
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <i className="bx bx-error-circle text-lg"></i>
                      <span>{t('sendFailed')}</span>
                    </>
                  ) : (
                    <>
                      <i className="bx bx-paper-plane text-lg"></i>
                      <span>{t('sendButton')}</span>
                    </>
                  )}
                </button>
              </form>

              {submitStatus === 'success' && (
                <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                  <i className="bx bx-check-circle text-xl text-emerald-600 mt-0.5 flex-shrink-0"></i>
                  <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                    {t('successMessage')}
                  </p>
                </div>
              )}
              
              {(submitStatus === 'error' || formErrors.general) && (
                <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                  <i className="bx bx-error-circle text-xl text-red-600 mt-0.5 flex-shrink-0"></i>
                  <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                    {formErrors.general || t('errorMessage')}
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