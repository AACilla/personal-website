import './style.css'
import project1Img from './images/projects/project1.webp'
import project2Img from './images/projects/project2.webp'

/**
 * Global Floating Toast Notification System
 * @param {string} title - Main toast heading
 * @param {string} message - Detailed notification body text
 * @param {'success'|'error'|'warning'|'info'} type - Visual theme & icon variant
 * @param {number} duration - Auto-dismiss timeout in milliseconds
 */
export function showToast(title, message, type = 'success', duration = 4500) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full px-4 pointer-events-none';
    toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const borderStyles = {
    success: 'border-emerald-500/40 bg-[#061e14]/90 shadow-emerald-500/10',
    error: 'border-rose-500/40 bg-[#21090d]/90 shadow-rose-500/10',
    warning: 'border-amber-500/40 bg-[#211608]/90 shadow-amber-500/10',
    info: 'border-blue-500/40 bg-[#09152a]/90 shadow-blue-500/10'
  };

  toast.className = `pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl text-white transform translate-y-6 opacity-0 transition-all duration-300 ease-out ${borderStyles[type] || borderStyles.info
    }`;

  const iconMarkup = {
    success: `<div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    </div>`,
    error: `<div class="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </div>`,
    warning: `<div class="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    </div>`,
    info: `<div class="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>`
  };

  toast.innerHTML = `
    ${iconMarkup[type] || iconMarkup.info}
    <div class="flex-grow pt-0.5">
      <h4 class="text-sm font-bold text-white mb-0.5">${title}</h4>
      <p class="text-xs text-slate-300 leading-relaxed">${message}</p>
    </div>
    <button type="button" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0" aria-label="Dismiss notification">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-6', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  const dismissBtn = toast.querySelector('button');
  const dismiss = () => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };

  dismissBtn.addEventListener('click', dismiss);
  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Mobile Menu Navigation Logic
  // -------------------------------------------------------------
  const mobileMenuBtn = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // -------------------------------------------------------------
  // 1b. Hero Interactive Mouse Parallax Effect for Animated Blobs
  // -------------------------------------------------------------
  const heroSection = document.getElementById('home');
  const blob1 = document.getElementById('hero-blob-1');
  const blob2 = document.getElementById('hero-blob-2');
  const blob3 = document.getElementById('hero-blob-3');

  if (heroSection && (blob1 || blob2 || blob3)) {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = null;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateParallax = () => {
      mouseX = lerp(mouseX, targetX, 0.05);
      mouseY = lerp(mouseY, targetY, 0.05);

      if (blob1) {
        blob1.style.transform = `translate3d(${mouseX * 35}px, ${mouseY * 35}px, 0)`;
      }
      if (blob2) {
        blob2.style.transform = `translate3d(${mouseX * -40}px, ${mouseY * -40}px, 0)`;
      }
      if (blob3) {
        blob3.style.transform = `translate3d(${mouseX * 25}px, ${mouseY * 25}px, 0)`;
      }

      if (Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001) {
        rafId = requestAnimationFrame(animateParallax);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = (e.clientX - centerX) / (rect.width / 2);
      targetY = (e.clientY - centerY) / (rect.height / 2);

      if (!rafId) {
        rafId = requestAnimationFrame(animateParallax);
      }
    };

    heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animateParallax);
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------
  // 1c. Dynamic Neon Accent Theme Switcher Logic & State Management
  // -------------------------------------------------------------
  const themeNames = {
    sapphire: 'Sapphire Blue',
    emerald: 'Emerald Green',
    violet: 'Violet Glow',
    rose: 'Rose Neon'
  };

  const themeDotColors = {
    sapphire: '#2563eb',
    emerald: '#10b981',
    violet: '#8b5cf6',
    rose: '#f43f5e'
  };

  const setAccentTheme = (theme, notify = true) => {
    if (!themeNames[theme]) theme = 'sapphire';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('personalweb_accent_theme', theme);

    // Update Desktop UI trigger dot & label
    const currentDot = document.getElementById('current-theme-dot');
    const currentName = document.getElementById('current-theme-name');
    if (currentDot) currentDot.style.backgroundColor = themeDotColors[theme];
    if (currentName) currentName.textContent = themeNames[theme].split(' ')[0];

    // Update active checkmarks in desktop dropdown menu
    document.querySelectorAll('#theme-menu .theme-option').forEach(btn => {
      const btnTheme = btn.getAttribute('data-accent');
      const check = btn.querySelector('.theme-check');
      if (btnTheme === theme) {
        btn.classList.add('bg-white/10', 'text-white');
        if (check) check.classList.remove('hidden');
      } else {
        btn.classList.remove('bg-white/10', 'text-white');
        if (check) check.classList.add('hidden');
      }
    });

    // Update active state in mobile theme options grid
    document.querySelectorAll('.theme-option-mobile').forEach(btn => {
      const btnTheme = btn.getAttribute('data-accent');
      if (btnTheme === theme) {
        btn.classList.add('border-white/40', 'bg-white/15', 'scale-105');
      } else {
        btn.classList.remove('border-white/40', 'bg-white/15', 'scale-105');
      }
    });

    if (notify) {
      showToast('Accent Theme Updated 🎨', `Switched to ${themeNames[theme]}`, 'info', 2500);
    }
  };

  // Initialize saved theme from localStorage or default to sapphire
  const savedTheme = localStorage.getItem('personalweb_accent_theme') || 'sapphire';
  setAccentTheme(savedTheme, false);

  // Desktop Theme Popover Toggle Handler
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeMenu = document.getElementById('theme-menu');

  if (themeToggleBtn && themeMenu) {
    const closeThemeMenu = () => {
      themeMenu.classList.remove('opacity-100', 'scale-100');
      themeMenu.classList.add('opacity-0', 'scale-95');
      themeToggleBtn.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        themeMenu.classList.add('hidden');
      }, 200);
    };

    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = themeMenu.classList.contains('hidden');
      if (isHidden) {
        themeMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
          themeMenu.classList.remove('opacity-0', 'scale-95');
          themeMenu.classList.add('opacity-100', 'scale-100');
        });
        themeToggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        closeThemeMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (!themeMenu.contains(e.target) && !themeToggleBtn.contains(e.target)) {
        closeThemeMenu();
      }
    });
  }

  // Event Delegation for Theme Selector Buttons (Desktop & Mobile)
  document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('[data-accent]');
    if (themeBtn) {
      const selectedTheme = themeBtn.getAttribute('data-accent');
      setAccentTheme(selectedTheme, true);
    }
  });

  // -------------------------------------------------------------
  // 2. Intersection Observer for Scroll Reveal Animations (with Reduced Motion Support)
  // -------------------------------------------------------------
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || isReducedMotion) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    if (isReducedMotion) {
      el.classList.remove('opacity-0', 'translate-y-10');
      el.classList.add('opacity-100', 'translate-y-0');
    } else {
      observer.observe(el);
    }
  });

  // -------------------------------------------------------------
  // 3. Dynamic Contact Form Validation & Async Submission
  // -------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const formFields = {
    userName: {
      input: document.getElementById('userName'),
      errorEl: document.getElementById('userNameError'),
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please enter your name (at least 2 characters).'
    },
    userEmail: {
      input: document.getElementById('userEmail'),
      errorEl: document.getElementById('userEmailError'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      errorMsg: 'Please enter a valid email address.'
    },
    userSubject: {
      input: document.getElementById('userSubject'),
      errorEl: document.getElementById('userSubjectError'),
      validate: (val) => val.trim().length >= 3,
      errorMsg: 'Please enter a subject line (at least 3 characters).'
    },
    userMessage: {
      input: document.getElementById('userMessage'),
      errorEl: document.getElementById('userMessageError'),
      validate: (val) => val.trim().length >= 10,
      errorMsg: 'Please enter your message (at least 10 characters).'
    }
  };

  /**
   * Validates a specific form field and updates UI accordingly
   * @param {Object} fieldConfig
   * @returns {boolean}
   */
  const validateField = (fieldConfig) => {
    const { input, errorEl, validate, errorMsg } = fieldConfig;
    if (!input) return true;

    const isValid = validate(input.value);
    const errorSpan = errorEl ? errorEl.querySelector('span') : null;

    if (!isValid) {
      input.classList.add('border-rose-500/80', 'focus-visible:ring-rose-500/40');
      input.classList.remove('border-white/10');
      if (errorEl && errorSpan) {
        errorSpan.textContent = errorMsg;
        errorEl.classList.remove('hidden');
      }
    } else {
      input.classList.remove('border-rose-500/80', 'focus-visible:ring-rose-500/40');
      input.classList.add('border-white/10');
      if (errorEl) {
        errorEl.classList.add('hidden');
      }
    }
    return isValid;
  };

  // Attach real-time validation listeners
  Object.values(formFields).forEach((fieldConfig) => {
    if (!fieldConfig.input) return;

    fieldConfig.input.addEventListener('input', () => {
      // Clear error as user types if it becomes valid
      if (fieldConfig.validate(fieldConfig.input.value)) {
        fieldConfig.input.classList.remove('border-rose-500/80', 'focus-visible:ring-rose-500/40');
        fieldConfig.input.classList.add('border-white/10');
        if (fieldConfig.errorEl) {
          fieldConfig.errorEl.classList.add('hidden');
        }
      }
    });

    fieldConfig.input.addEventListener('blur', () => {
      // Validate on focus loss if user interacted with the input
      if (fieldConfig.input.value.trim().length > 0) {
        validateField(fieldConfig);
      }
    });
  });

  // Handle Form Submission
  const submitBtn = document.getElementById('contactSubmitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtnIcon = document.getElementById('submitBtnIcon');
  const submitBtnSpinner = document.getElementById('submitBtnSpinner');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    let firstInvalidInput = null;

    // Validate all fields
    Object.values(formFields).forEach((fieldConfig) => {
      const isValid = validateField(fieldConfig);
      if (!isValid) {
        allValid = false;
        if (!firstInvalidInput && fieldConfig.input) {
          firstInvalidInput = fieldConfig.input;
        }
      }
    });

    if (!allValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      showToast(
        'Validation Error',
        'Please correct the highlighted fields before submitting.',
        'warning'
      );
      return;
    }

    // Set Loading UI State
    if (submitBtn) submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = 'Sending Message...';
    if (submitBtnIcon) submitBtnIcon.classList.add('hidden');
    if (submitBtnSpinner) submitBtnSpinner.classList.remove('hidden');

    try {
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      // Ensure standard email service field compatibility (Formspree / EmailJS / Resend)
      const formPayload = {
        name: payload.userName || payload.name || '',
        email: payload.userEmail || payload.email || '',
        subject: payload.userSubject || payload.subject || 'Portfolio Contact Form Submission',
        message: payload.userMessage || payload.message || '',
        ...payload
      };

      // Attempt endpoint submission if an integration key/action exists, else standard simulated fallback
      const endpoint = contactForm.getAttribute('action');

      if (endpoint && endpoint !== '#') {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formPayload)
        });

        if (!response.ok) {
          throw new Error('Failed to deliver message.');
        }
      } else {
        // Realistic simulated network request delay
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      // Success Feedback
      showToast(
        'Message Sent Successfully! 🎉',
        `Thank you ${payload.userName || 'there'}, Aaron has received your message and will reply within 24-48 hours.`,
        'success',
        6000
      );

      // Reset Form State
      contactForm.reset();
      Object.values(formFields).forEach((fieldConfig) => {
        if (fieldConfig.input) {
          fieldConfig.input.classList.remove('border-rose-500/80', 'focus-visible:ring-rose-500/40');
          fieldConfig.input.classList.add('border-white/10');
        }
        if (fieldConfig.errorEl) {
          fieldConfig.errorEl.classList.add('hidden');
        }
      });
    } catch (err) {
      showToast(
        'Submission Failed',
        err.message || 'An unexpected error occurred while sending. Please try again or email directly.',
        'error',
        5000
      );
    } finally {
      // Restore Button UI State
      if (submitBtn) submitBtn.disabled = false;
      if (submitBtnText) submitBtnText.textContent = 'Send Message';
      if (submitBtnIcon) submitBtnIcon.classList.remove('hidden');
    }
  });

  // -------------------------------------------------------------
  // 4. Dynamic Data Render Loops for Skills & Projects Cards
  // -------------------------------------------------------------
  const skillsCategories = [
    {
      title: 'Frontend Development',
      icon: `<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
      skills: [
        {
          name: 'HTML5',
          description: 'Semantic markup and accessible web structure.',
          proficiency: 90,
          colorBg: 'bg-orange-500/10 group-hover:bg-orange-500/20 text-orange-500',
          icon: `<svg class="w-8 h-8 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.325 3.406-2.91.8-2.928-.8-.196-2.2H6.226l.332 4.605 5.417 1.54 5.426-1.54.636-7.481H8.531z"/></svg>`
        },
        {
          name: 'CSS3',
          description: 'Advanced styling, animations, and responsive design.',
          proficiency: 85,
          colorBg: 'bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-500',
          icon: `<svg class="w-8 h-8 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.412l-13.178.001.232 2.625 10.058-.001-.231 2.722-10.063-.001.2 2.274h7.525l-.325 3.406-2.91.8-2.928-.8-.196-2.2H6.226l.332 4.605 5.417 1.54 5.426-1.54.636-7.481h-7.61l-.2-2.2h10.052l.41-4.75z"/></svg>`
        },
        {
          name: 'Tailwind CSS',
          description: 'Utility-first styling for rapid and modern UI building.',
          proficiency: 90,
          colorBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400',
          icon: `<svg class="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="currentColor"/></svg>`
        },
        {
          name: 'JavaScript',
          description: 'Dynamic DOM manipulation and interactive logic.',
          proficiency: 80,
          colorBg: 'bg-yellow-400/10 group-hover:bg-yellow-400/20 text-yellow-400',
          icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-1.736-.704-1.954-1.052-1.954-1.722 0-.646.527-1.123 1.458-1.123 1.164 0 1.637.581 1.83 1.396h2.29c-.217-1.761-1.488-3.04-3.95-3.04-2.583 0-3.882 1.424-3.882 3.238 0 1.706 1.056 2.502 3.197 3.325 1.574.606 1.83 1.063 1.83 1.832 0 .848-.737 1.282-1.635 1.282-1.22 0-1.901-.635-2.15-1.57l-2.288.358c.35 1.761 1.635 3.038 4.296 3.038 2.62 0 4.053-1.424 4.053-3.342 0-.306-.037-.626-.092-.959zM11.554 11.238v7.697c0 1.408-.578 2.57-2.617 2.57-1.766 0-2.482-.934-2.668-2.13l2.12-.416c.112.56.44 1.042 1.05 1.042.505 0 .895-.27.895-.91v-7.853h1.22z"/></svg>`
        }
      ]
    },
    {
      title: 'Development Tools',
      icon: `<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
      skills: [
        {
          name: 'Git',
          description: 'Version control for tracking code changes efficiently.',
          proficiency: 85,
          colorBg: 'bg-orange-600/10 group-hover:bg-orange-600/20 text-orange-500',
          icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.375-.07 1.889.441.516.515.658 1.258.438 1.9l2.759 2.759c.641-.22 1.386-.073 1.9.442.756.756.756 1.983 0 2.739-.756.756-1.984.756-2.739 0-.52-.52-.667-1.272-.442-1.916l-2.74-2.74v5.337c.231.226.381.536.381.884 0 .756-.613 1.369-1.369 1.369-.756 0-1.369-.613-1.369-1.369 0-.616.406-1.14 1.01-1.304v-5.341c-.604-.165-1.01-.69-1.01-1.306 0-.348.15-.658.38-.884l-2.684-2.684-6.42 6.42c-.603.604-.603 1.584 0 2.188L10.93 23.55c.604.603 1.584.603 2.188 0l10.428-10.43c.603-.604.603-1.584 0-2.188z"/></svg>`
        },
        {
          name: 'GitHub',
          description: 'Repository hosting, pull requests, and project collaboration.',
          proficiency: 85,
          colorBg: 'bg-slate-700/30 group-hover:bg-slate-700/50 text-white',
          icon: `<svg class="w-8 h-8 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>`
        },
        {
          name: 'VS Code',
          description: 'Integrated development environment for maximum workflow speed.',
          proficiency: 95,
          colorBg: 'bg-blue-600/10 group-hover:bg-blue-600/20 text-blue-500',
          icon: `<svg class="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L8.42 15.314l-8.093 6.574a.999.999 0 0 0-.001 1.479l1.322 1.202a1 1 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`
        },
        {
          name: 'Figma',
          description: 'UI/UX prototyping, wireframing, and visual layout planning.',
          proficiency: 75,
          colorBg: 'bg-pink-500/10 group-hover:bg-pink-500/20 text-pink-500',
          icon: `<svg class="w-8 h-8 sm:w-9 sm:h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M12 11.966a3.983 3.983 0 00-3.983-3.983H4.034a3.983 3.983 0 000 7.966h3.983A3.983 3.983 0 0012 11.966z"/><path d="M4.034 7.983h3.983A3.983 3.983 0 008.017 0H4.034a3.983 3.983 0 100 7.983z"/><path d="M12 3.983A3.983 3.983 0 0015.983 0h-3.983v7.983z"/><path d="M12 11.966v7.966a3.983 3.983 0 11-3.983-3.983h3.983z"/><path d="M15.983 15.95A3.983 3.983 0 1012 11.967v3.983h3.983z"/></svg>`
        }
      ]
    }
  ];

  function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    container.innerHTML = skillsCategories.map(cat => `
      <div>
        <h3 class="text-lg md:text-xl font-bold text-white mb-6 md:mb-8 flex items-center gap-3">
          ${cat.icon}
          ${cat.title}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          ${cat.skills.map(skill => `
            <div class="group bg-[#0a0f1c]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 relative flex flex-col h-full">
              <div class="absolute inset-0 bg-linear-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" aria-hidden="true"></div>
              <div class="flex items-center gap-4 mb-5">
                <div class="w-14 h-14 sm:w-16 sm:h-16 ${skill.colorBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shrink-0">
                  ${skill.icon}
                </div>
                <h4 class="text-base sm:text-lg font-bold text-white">${skill.name}</h4>
              </div>
              <p class="text-xs text-slate-400 mb-6 leading-relaxed flex-grow">${skill.description}</p>
              <div class="space-y-2 mt-auto">
                <div class="flex justify-between text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
                  <span>Proficiency</span><span>${skill.proficiency}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5">
                  <div class="bg-linear-to-r from-blue-600 to-blue-400 h-1.5 rounded-full transform origin-left transition-transform duration-1000 ease-out" style="width: ${skill.proficiency}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  const projectsList = [
    {
      id: 'pamana',
      category: 'web-development',
      title: 'Pamana Educational Website',
      subtitle: 'Philippine History & Interactive Educational Platform',
      year: '2025',
      role: 'Lead Dev',
      status: 'Completed',
      image: project2Img,
      description: 'An interactive educational platform designed to help users learn about Philippine History in an engaging, accessible, and modern way. Built to preserve and share cultural heritage through digital technology.',
      features: [
        'Interactive Historical Timelines',
        'Fully Responsive Mobile-First UI',
        'Optimized Media and Asset Delivery'
      ],
      tags: [
        { name: 'HTML5', style: 'text-orange-400 bg-orange-400/10 border border-orange-400/20' },
        { name: 'CSS3', style: 'text-blue-400 bg-blue-400/10 border border-blue-400/20' },
        { name: 'JavaScript', style: 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20' }
      ],
      githubUrl: 'https://github.com/ajarcilla',
      featured: true
    },
    {
      id: 'portfolio',
      category: 'web-development',
      title: 'Personal Portfolio Website',
      subtitle: 'Minimalist High-Performance Developer Portfolio',
      year: '2026',
      role: 'Creator & UI Designer',
      status: 'Active',
      image: project1Img,
      description: 'A responsive, minimalist personal portfolio built to showcase my web development skills, projects, and personal aesthetic using modern CSS utilities.',
      features: [
        'Responsive Dark-Mode Aesthetics',
        'Scroll Reveal Animations & Dynamic Toast System',
        'Interactive Neon Accent Theme Switcher'
      ],
      tags: [
        { name: 'HTML', style: 'text-blue-300 bg-blue-900/40' },
        { name: 'Tailwind', style: 'text-blue-300 bg-blue-900/40' },
        { name: 'JS', style: 'text-blue-300 bg-blue-900/40' }
      ],
      githubUrl: 'https://github.com/ajarcilla',
      featured: false
    },
    {
      id: 'greenhouse',
      category: 'iot-automation',
      title: 'SMART Mini Greenhouse',
      subtitle: 'IoT Hardware Automation & Environmental Monitoring',
      year: '2026',
      role: 'Hardware Developer',
      status: 'Completed',
      image: '',
      description: 'An integrated hardware and software automation system utilizing temperature, moisture, and light sensors powered by the Arduino ecosystem.',
      features: [
        'Automated Irrigation Control',
        'Real-Time Environmental Sensor Sampling',
        'Serial Telemetry & Relay Actuation'
      ],
      tags: [
        { name: 'Arduino', style: 'text-emerald-300 bg-emerald-900/40' },
        { name: 'Sensors', style: 'text-emerald-300 bg-emerald-900/40' },
        { name: 'IoT', style: 'text-emerald-300 bg-emerald-900/40' }
      ],
      githubUrl: 'https://github.com/ajarcilla',
      featured: false
    }
  ];

  function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const featured = projectsList.find(p => p.featured);
    const secondary = projectsList.filter(p => !p.featured);

    let html = '';

    if (featured) {
      html += `
        <article data-category="${featured.category}" data-project-id="${featured.id}"
          class="project-card group bg-[#0a0f1c]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 flex flex-col xl:flex-row">
          <div class="xl:w-7/12 relative aspect-video xl:aspect-video overflow-hidden bg-slate-900 border-b xl:border-b-0 xl:border-r border-white/10 cursor-pointer" data-open-modal="${featured.id}">
            <img src="${featured.image}" alt="${featured.title}" loading="lazy" decoding="async"
              class="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out opacity-80" />
            <div class="absolute inset-0 bg-linear-to-t xl:bg-linear-to-r from-[#0a0f1c]/90 via-[#0a0f1c]/40 to-transparent -z-10 pointer-events-none" aria-hidden="true"></div>
            <div class="absolute inset-0 border-t border-l border-white/5 transform rotate-[15deg] scale-150 z-20 pointer-events-none" aria-hidden="true"></div>
          </div>

          <div class="xl:w-5/12 p-6 md:p-8 lg:p-12 flex flex-col relative z-20">
            <div class="flex flex-wrap gap-4 mb-6 text-[11px] font-bold tracking-wider uppercase text-slate-400">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                ${featured.year}
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                ${featured.role}
              </span>
              <span class="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">${featured.status}</span>
            </div>

            <h3 class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 hover:text-blue-400 transition-colors cursor-pointer" data-open-modal="${featured.id}">
              ${featured.title}
            </h3>
            <p class="text-slate-400 mb-8 text-sm leading-relaxed flex-grow">${featured.description}</p>

            <ul class="space-y-3 mb-8">
              ${featured.features.map(f => `
                <li class="flex items-start gap-3 text-sm text-slate-300">
                  <svg class="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  ${f}
                </li>
              `).join('')}
            </ul>

            <div class="flex gap-2 mb-8 flex-wrap mt-auto">
              ${featured.tags.map(t => `<span class="text-[10px] uppercase tracking-wider font-bold ${t.style} px-3 py-1.5 rounded-full">${t.name}</span>`).join('')}
            </div>

            <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
              <button type="button" data-open-modal="${featured.id}"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                View Details
              </button>
              <a href="${featured.githubUrl}" target="_blank" rel="noopener noreferrer"
                class="px-6 py-3 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                Source Code
              </a>
            </div>
          </div>
        </article>
      `;
    }

    if (secondary.length > 0) {
      html += `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          ${secondary.map(p => `
            <article data-category="${p.category}" data-project-id="${p.id}"
              class="project-card group bg-[#0a0f1c]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-${p.category === 'iot-automation' ? 'emerald' : 'blue'}-500/30 hover:shadow-lg hover:shadow-${p.category === 'iot-automation' ? 'emerald' : 'blue'}-500/10 transition-all duration-500 flex flex-col relative h-full">
              <div class="absolute inset-0 bg-linear-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true"></div>

              <div class="aspect-video bg-slate-900 overflow-hidden relative border-b border-white/10 flex items-center justify-center shrink-0 cursor-pointer" data-open-modal="${p.id}">
                ${p.image ? `
                  <img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal" />
                ` : `
                  <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <svg class="w-24 h-24 text-emerald-500/50 absolute z-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                `}
              </div>

              <div class="p-6 md:p-8 flex flex-col flex-grow relative z-20">
                <div class="flex justify-between items-center mb-4 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  <span>${p.category === 'iot-automation' ? 'IoT & Hardware' : 'Web Design'}</span>
                  <span>${p.status}</span>
                </div>

                <h3 class="text-xl md:text-2xl font-bold text-white mb-3 hover:text-${p.category === 'iot-automation' ? 'emerald' : 'blue'}-400 transition-colors cursor-pointer" data-open-modal="${p.id}">
                  ${p.title}
                </h3>
                <p class="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">${p.description}</p>

                <div class="flex gap-2 mb-8 flex-wrap">
                  ${p.tags.map(t => `<span class="text-[9px] uppercase tracking-wider font-bold ${t.style} px-2 py-1 rounded">${t.name}</span>`).join('')}
                </div>

                <div class="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
                  <button type="button" data-open-modal="${p.id}"
                    class="text-sm font-semibold text-white group-hover:text-${p.category === 'iot-automation' ? 'emerald' : 'blue'}-400 transition-colors flex items-center gap-2">
                    View Details &rarr;
                  </button>
                  ${p.githubUrl ? `
                    <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer"
                      class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                    </a>
                  ` : ''}
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      `;
    }

    projectsGrid.innerHTML = html;
  }

  // Render components into DOM
  renderSkills();
  renderProjects();

  // -------------------------------------------------------------
  // 5. Interactive Project Category Filtering (Race-Condition Free)
  // -------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.getAttribute('data-filter');

        // Update active tab styles
        filterBtns.forEach((b) => {
          b.classList.remove('bg-blue-600', 'text-white', 'shadow-[0_0_15px_rgba(37,99,235,0.4)]');
          b.classList.add('bg-white/5', 'border', 'border-white/10', 'text-slate-400');
        });
        btn.classList.remove('bg-white/5', 'border', 'border-white/10', 'text-slate-400');
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-[0_0_15px_rgba(37,99,235,0.4)]');

        // Filter cards smoothly with timeout cancellation to prevent race conditions
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');

          if (card._hideTimeout) {
            clearTimeout(card._hideTimeout);
            card._hideTimeout = null;
          }

          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            // Force CSS repaint before transition
            void card.offsetWidth;
            card.classList.remove('opacity-0', 'scale-95');
            card.classList.add('opacity-100', 'scale-100');
          } else {
            card.classList.remove('opacity-100', 'scale-100');
            card.classList.add('opacity-0', 'scale-95');
            card._hideTimeout = setTimeout(() => {
              card.classList.add('hidden');
              card._hideTimeout = null;
            }, 300);
          }
        });
      });
    });
  }

  // -------------------------------------------------------------
  // 5. Interactive Project Detail Modals & Global Event Delegation
  // -------------------------------------------------------------
  const projectData = {
    pamana: {
      title: 'Pamana Educational Website',
      subtitle: 'Philippine History & Interactive Educational Platform',
      category: 'Web Development',
      year: '2025',
      role: 'Lead Developer',
      status: 'Completed',
      image: project2Img,
      description: 'Pamana is an interactive, mobile-first educational web platform crafted to preserve and celebrate Philippine History. Designed with intuitive navigation, engaging historical timelines, and optimized media delivery, it provides students and history enthusiasts with a dynamic learning experience.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Vite'],
      features: [
        'Interactive Historical Timelines with dynamic detail popups',
        'Fully responsive, mobile-first design optimized across screen sizes',
        'Fast media and asset delivery for high performance',
        'Clean semantic markup ensuring accessibility compliance (WCAG)'
      ],
      architecture: 'Modular ES6 client architecture using custom DOM event dispatchers and CSS utility-first layout rendering.',
      demoUrl: 'https://github.com/ajarcilla',
      githubUrl: 'https://github.com/ajarcilla'
    },
    portfolio: {
      title: 'Personal Portfolio Website',
      subtitle: 'Minimalist High-Performance Developer Portfolio',
      category: 'Web Development',
      year: '2026',
      role: 'Creator & UI Designer',
      status: 'Active',
      image: project1Img,
      description: 'A modern, state-of-the-art personal developer portfolio designed to showcase projects, technical skills, and academic achievements. Features modern glassmorphism aesthetics, scroll reveal animations, real-time contact validation, and interactive category filtering.',
      techStack: ['HTML5', 'Tailwind CSS v4', 'JavaScript (ES6+)', 'Vite'],
      features: [
        'Responsive dark-mode aesthetic with ambient glow effects',
        'Intersection Observer powered scroll reveal animations',
        'Real-time contact form validation & dynamic toast system',
        'Modular CSS components with smooth hover physics'
      ],
      architecture: 'Bundled with Vite and Tailwind v4, utilizing modular component layers and zero external runtime dependencies.',
      demoUrl: 'https://github.com/ajarcilla',
      githubUrl: 'https://github.com/ajarcilla'
    },
    greenhouse: {
      title: 'SMART Mini Greenhouse',
      subtitle: 'IoT Hardware Automation & Environmental Monitoring',
      category: 'IoT & Automation',
      year: '2026',
      role: 'Hardware & Systems Integration',
      status: 'Completed',
      image: '',
      description: 'An automated environmental control system integrating hardware sensors and microcontroller automation. Monitors soil moisture, ambient temperature, humidity, and sunlight intensity in real-time, automatically triggering irrigation pumps and ventilation fans to maintain optimal plant growth conditions.',
      techStack: ['Arduino Ecosystem', 'C/C++', 'Soil Moisture Sensors', 'DHT11 Sensor', 'Relay Modules', 'IoT Monitoring'],
      features: [
        'Automated soil moisture sensing & micro-drip irrigation control',
        'Real-time temperature and humidity monitoring via DHT11 sensors',
        'Automated ventilation and light intensity regulation',
        'Serial telemetry reporting and sensor calibration'
      ],
      architecture: 'Embedded micro-controller loop executing state machine routines for sensor sampling, hysteresis control, and relay actuation.',
      demoUrl: 'https://github.com/ajarcilla',
      githubUrl: 'https://github.com/ajarcilla'
    }
  };

  let modalOverlay = document.getElementById('projectModalOverlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'projectModalOverlay';
    modalOverlay.className = 'fixed inset-0 z-[10000] hidden bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto transition-opacity duration-300 opacity-0';
    document.body.appendChild(modalOverlay);
  }

  const closeModal = () => {
    modalOverlay.classList.remove('opacity-100');
    modalOverlay.classList.add('opacity-0');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalOverlay.classList.add('hidden');
    }, 300);
  };

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalOverlay.innerHTML = `
      <div class="relative bg-[#0a0f1c] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 text-slate-300 transform scale-95 transition-transform duration-300 my-auto">
        <button type="button" id="modalCloseBtn" aria-label="Close modal"
          class="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all z-30">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span class="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">${data.category}</span>
            <span class="text-slate-500">•</span>
            <span>${data.year}</span>
            <span class="text-slate-500">•</span>
            <span class="text-emerald-400">${data.status}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${data.title}</h2>
          <p class="text-sm font-medium text-blue-300">${data.subtitle}</p>
        </div>

        ${data.image ? `
          <div class="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10 relative">
            <img src="${data.image}" alt="${data.title}" loading="lazy" decoding="async" class="w-full h-full object-cover sm:object-contain" />
          </div>
        ` : `
          <div class="aspect-video bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center p-8 text-center bg-linear-to-br from-emerald-950/30 via-slate-900 to-blue-950/30">
            <div class="space-y-3">
              <svg class="w-16 h-16 text-emerald-400/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Hardware & IoT Circuitry System</p>
            </div>
          </div>
        `}

        <div class="space-y-4">
          <h3 class="text-base font-bold text-white uppercase tracking-wider">Overview</h3>
          <p class="text-sm text-slate-300 leading-relaxed">${data.description}</p>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-white uppercase tracking-wider">Key Features</h3>
          <ul class="space-y-2 text-sm text-slate-300">
            ${data.features.map(f => `
              <li class="flex items-start gap-2.5">
                <svg class="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-white uppercase tracking-wider">Architecture & Specs</h3>
          <p class="text-xs text-slate-400 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">${data.architecture}</p>
        </div>

        <div class="space-y-3">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Technologies Used</h3>
          <div class="flex flex-wrap gap-2">
            ${data.techStack.map(t => `
              <span class="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">${t}</span>
            `).join('')}
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
          <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
            View Repository
          </a>
          <button type="button" id="modalBottomCloseBtn"
            class="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-semibold rounded-xl transition-all">
            Close
          </button>
        </div>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      modalOverlay.classList.remove('opacity-0');
      modalOverlay.classList.add('opacity-100');
    });

    const closeBtn = modalOverlay.querySelector('#modalCloseBtn');
    const bottomCloseBtn = modalOverlay.querySelector('#modalBottomCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (bottomCloseBtn) bottomCloseBtn.addEventListener('click', closeModal);
  };

  /**
   * Fallback mechanism for copying text to clipboard when Clipboard API is unavailable
   * @param {string} text - String content to copy
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Failure callback
   */
  function fallbackCopyText(text, onSuccess, onError) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '-9999px';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        onSuccess();
      } else {
        onError(new Error('execCommand returned false'));
      }
    } catch (err) {
      onError(err);
    }
  }

document.addEventListener("click", (e) => {
    console.log("clicked", e.target);

    const copyBtn = e.target.closest("[data-copy-email]");
    if (copyBtn) {
        console.log("COPY BUTTON FOUND");
    }
});

  // Robust Global Event Delegation for Modal Triggers, Copy Buttons, and Links
  document.addEventListener('click', (e) => {
    // 1. Copy-to-Clipboard Event Delegation
    const copyBtn = e.target.closest('[data-copy-email]');
    if (copyBtn) {
      e.preventDefault();
      e.stopPropagation();

      const email = copyBtn.getAttribute('data-copy-email') || '';
      if (!email) return;

      const copyIcon = copyBtn.querySelector('.copy-icon');
      const checkIcon = copyBtn.querySelector('.check-icon');
      const copyBtnText = copyBtn.querySelector('.copy-btn-text');

      const handleSuccess = () => {
        // Toggle icon visual feedback smoothly
        if (copyIcon) copyIcon.classList.add('hidden');
        if (checkIcon) checkIcon.classList.remove('hidden');
        if (copyBtnText) copyBtnText.textContent = 'Copied!';

        // Trigger toast notification with safe fallback to prevent reference errors
        if (typeof showToast === 'function') {
          showToast('Copied to Clipboard! 📋', email, 'success', 3000);
        } else {
          console.log(`[Copy Component] Email copied: ${email}`);
        }

        // Reset icon & text state after delay (handles rapid consecutive clicks cleanly)
        if (copyBtn._resetTimeout) clearTimeout(copyBtn._resetTimeout);
        copyBtn._resetTimeout = setTimeout(() => {
          if (copyIcon) copyIcon.classList.remove('hidden');
          if (checkIcon) checkIcon.classList.add('hidden');
          if (copyBtnText) copyBtnText.textContent = 'Copy';
          copyBtn._resetTimeout = null;
        }, 2000);
      };

      const handleError = (err) => {
        console.error('Failed to copy email:', err);
        if (typeof showToast === 'function') {
          showToast('Copy Failed', 'Unable to copy email address automatically.', 'error', 3000);
        } else {
          console.error('[Copy Component] Copy failed:', err);
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
          .then(handleSuccess)
          .catch(() => fallbackCopyText(email, handleSuccess, handleError));
      } else {
        fallbackCopyText(email, handleSuccess, handleError);
      }
      return;
    }

    const modalTrigger = e.target.closest('[data-open-modal]');
    if (modalTrigger) {
      e.preventDefault();
      const projectId = modalTrigger.getAttribute('data-open-modal');
      openModal(projectId);
      return;
    }

    // Notify user when downloading resume PDF
    const downloadAnchor = e.target.closest('a[download]');
    if (downloadAnchor) {
      showToast('Downloading Resume 📄', 'Aaron_Arcilla_Resume.pdf is downloading...', 'success', 3500);
      return;
    }

    // Intercept generic "#" anchor links to prevent jumping to top
    const anchor = e.target.closest('a[href="#"]');
    if (anchor) {
      e.preventDefault();
      const label = anchor.textContent.trim() || anchor.getAttribute('aria-label') || 'Link';
      showToast('Info ℹ️', `${label} link clicked. Visit Aaron's GitHub or reach out via email!`, 'info', 3500);
    }
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
      closeModal();
    }
  });
});