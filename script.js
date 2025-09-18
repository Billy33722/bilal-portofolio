// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

// Config: set your Formspree endpoint here (replace YOUR_FORM_ID)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgvljnzv';

function initializeApp() {
    // Set up event listeners
    setupMobileMenu();
    setupI18n();
    setupThemeToggle();
    setupSmoothScrolling();
    setupProjectImageLinks();
    setupScrollSpy();
    setupCarousel();
    setupFormHandling();
    setupScrollToTop();
    setupProgressBar();
    setupTypingAnimation();
    setupParticles();
    setupPWA();
    setupParallax();
    setupKeyboardNavigation();
    setupSwipeGestures();
    setupPerformanceMonitoring();
    setupAnalytics();
    setupLazyLoading();
    preloadCriticalResources();
    setupYearDisplay();
    setupScrollAnimations();
    setupAboutCounters();
    setupProjectFilters();
    setupModalWindows();
    setupFAQSection();
    setupGradientBackgrounds();
    setupEnhancedCards();
    setupParallaxEffects();
    setupAnimatedIcons();
    setupVisitorCounter();
    setupSocialSharing();
    setupReadingProgress();
    setupCustomCursors();
    setupSwipeGestures();
    setupPWAOffline();
    setupInteractiveDemo();
    setupLivePreview();
    setupSkillAnimations();
    setupCodeShowcase();
    setup3DElements();
    setupPerformanceDemo();
    setupInteractiveTimeline();
    setupTechStackVisual();
    setupFloatingParticles();
    setupAdvancedAnimations();
    setupInteractiveSkillsMap();
    setupSmartFunctions();
    setupAnalyticsMetrics();
    setupIntegrations();
    setupPersonalization();
    setupSocialFunctions();
    setupPerformanceOptimization();
    setupAccessibility();
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        let touchStartY = 0;
        let touchEndY = 0;
        
        // Prevent menu from opening on scroll
        menuToggle.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });
        
        menuToggle.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].clientY;
            const touchDiff = Math.abs(touchStartY - touchEndY);
            
            // Only open menu if it's a tap (not a swipe)
            if (touchDiff < 10) {
                const isExpanded = mainNav.getAttribute('aria-expanded') === 'true';
                mainNav.setAttribute('aria-expanded', !isExpanded);
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle body class to prevent scroll
                if (!isExpanded) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            }
        });
        
        // Click handler for non-touch devices
        menuToggle.addEventListener('click', function(e) {
            // Only handle click if it's not a touch device
            if (!('ontouchstart' in window)) {
                const isExpanded = mainNav.getAttribute('aria-expanded') === 'true';
                mainNav.setAttribute('aria-expanded', !isExpanded);
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                
                // Toggle body class to prevent scroll
                if (!isExpanded) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Make project images clickable using the same destination as the card link
function setupProjectImageLinks() {
    const wrappers = document.querySelectorAll('.projects .card .image-wrapper');
    wrappers.forEach(wrapper => {
        const card = wrapper.closest('.card');
        const link = card ? card.querySelector('.link') : null;
        if (!link) return;

        wrapper.addEventListener('click', () => {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            if (!href || href === '#') return;
            if (target === '_blank') {
                window.open(href, '_blank', 'noopener');
            } else {
                window.location.href = href;
            }
        });

        // Accessibility: focusable and keyboard-activatable
        wrapper.setAttribute('tabindex', '0');
        wrapper.setAttribute('role', 'link');
        wrapper.setAttribute('aria-label', link.textContent || 'Open project');
        wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                wrapper.click();
            }
        });
    });
}

// Highlight active nav link based on scroll position
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;

    if (!sections.length || !navLinks.length) return;

    // Helper to clear and set active link
    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${id}`;
            link.classList.toggle('active', isActive);
        });
    };

    // Observe sections as they enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, {
        root: null,
        threshold: 0.6,
        rootMargin: `-${Math.max(headerHeight - 10, 0)}px 0px 0px 0px`
    });

    sections.forEach(section => observer.observe(section));

    // Ensure active link updates on scroll end (fallback)
    window.addEventListener('scroll', debounce(() => {
        let currentId = sections[0].id;
        const scrollPos = window.scrollY + headerHeight + 20;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) {
                currentId = section.id;
            }
        });
        setActiveLink(currentId);
    }, 100));

    // Also update when clicking nav links (instant feedback)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            setActiveLink(targetId);
        });
    });
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) {
        return;
    }
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add a subtle animation effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function setupFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const projectType = formData.get('project_type');
            const budget = formData.get('budget');
            const company = formData.get('company');
            const phone = formData.get('phone');
            const newsletter = formData.get('newsletter') === 'on';
            
            // Get current language
            const currentLang = document.getElementById('langToggle')?.dataset.lang || 'en';
            const translations = {
                en: {
                    'notification.success': 'Thank you for your message! I will get back to you soon.',
                    'notification.error.fields': 'Please fill in all fields',
                    'notification.error.email': 'Please enter a valid email address',
                    'notification.error.network': 'Network error. Please check your connection and try again.',
                    'notification.error.form': 'Form endpoint not configured. Please provide your Formspree ID.',
                    'notification.error.submit': 'Submission failed. Please try again later.'
                },
                nl: {
                    'notification.success': 'Bedankt voor je bericht! Ik neem binnenkort contact met je op.',
                    'notification.error.fields': 'Vul alle velden in',
                    'notification.error.email': 'Voer een geldig e-mailadres in',
                    'notification.error.network': 'Netwerkfout. Controleer je verbinding en probeer opnieuw.',
                    'notification.error.form': 'Formulier endpoint niet geconfigureerd. Geef je Formspree ID op.',
                    'notification.error.submit': 'Verzending mislukt. Probeer later opnieuw.'
                }
            };
            const dict = translations[currentLang] || translations.en;

            // Basic validation
            if (!name || !email || !message || !projectType || !budget) {
                showNotification(dict['notification.error.fields'], 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification(dict['notification.error.email'], 'error');
                return;
            }
            
            // Submit via Formspree
            if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
                showNotification(dict['notification.error.form'], 'error');
                return;
            }

            // Add loading state to button
            const submitButton = contactForm.querySelector('.button.primary');
            const originalText = submitButton.textContent;
            submitButton.classList.add('loading');
            submitButton.textContent = '';

            fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            })
            .then(async (response) => {
                if (response.ok) {
                    showNotification(dict['notification.success'], 'success');
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => ({}));
                    const errorMsg = (data && data.errors && data.errors[0] && data.errors[0].message) || dict['notification.error.submit'];
                    showNotification(errorMsg, 'error');
                }
            })
            .catch(() => {
                showNotification(dict['notification.error.network'], 'error');
            })
            .finally(() => {
                // Remove loading state
                submitButton.classList.remove('loading');
                submitButton.textContent = originalText;
            });
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Set current year in footer
// Scroll to top functionality
function setupScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Progress bar functionality
function setupProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Typing animation functionality
function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    
    if (!heroTitle) return;
    
    // Add typing animation class after a short delay
    setTimeout(() => {
        heroTitle.classList.add('typing-animation');
    }, 1000);
    
    // Remove animation after it completes
    setTimeout(() => {
        heroTitle.classList.remove('typing-animation');
    }, 4000);
}

// Particle effects functionality
function setupParticles() {
    const canvas = document.getElementById('particles');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// PWA functionality
function setupPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Install prompt
    let deferredPrompt;
    const installButton = document.createElement('button');
    installButton.textContent = 'Install App';
    installButton.className = 'button primary install-app-btn';
    installButton.style.display = 'none';
    installButton.style.position = 'fixed';
    installButton.style.bottom = '6rem';
    installButton.style.right = '2rem';
    installButton.style.zIndex = '1001';
    
    document.body.appendChild(installButton);
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'block';
    });
    
    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
                installButton.style.display = 'none';
            });
        }
    });
}

// Parallax functionality
function setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isInView) {
                const speed = element.classList.contains('parallax-slow') ? 0.3 : 
                            element.classList.contains('parallax-fast') ? 0.2 : 
                            element.classList.contains('parallax-reverse') ? -0.1 : 0.1;
                
                const yPos = -(scrolled * speed);
                element.style.setProperty('--parallax-offset', `${yPos}px`);
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        requestTick();
        ticking = false;
    }
    
    window.addEventListener('scroll', handleScroll);
    updateParallax(); // Initial call
}

// Keyboard navigation functionality
function setupKeyboardNavigation() {
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main id to main element
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + H = Home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + P = Projects
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + A = About
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Alt + C = Contact
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Escape = Close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mainNav');
            const menuToggle = document.getElementById('menuToggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Focus management for mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mainNav');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                // Focus first nav link when opening
                const firstNavLink = mobileMenu.querySelector('a');
                if (firstNavLink) {
                    setTimeout(() => firstNavLink.focus(), 100);
                }
            }
        });
    }
}

// Swipe gestures functionality
function setupSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    const sections = ['#home', '#services', '#process', '#projects', '#about', '#pricing', '#contact'];
    let currentSectionIndex = 0;
    
    function getCurrentSection() {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        let closestSection = 0;
        let minDistance = Infinity;
        
        sections.forEach((section, index) => {
            const element = document.querySelector(section);
            if (element) {
                const distance = Math.abs(element.offsetTop - scrollPosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = index;
                }
            }
        });
        
        return closestSection;
    }
    
    function navigateToSection(index) {
        if (index >= 0 && index < sections.length) {
            const section = document.querySelector(sections[index]);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                currentSectionIndex = index;
            }
        }
    }
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            currentSectionIndex = getCurrentSection();
            
            if (deltaX > 0) {
                // Swipe right - go to previous section
                navigateToSection(currentSectionIndex - 1);
            } else {
                // Swipe left - go to next section
                navigateToSection(currentSectionIndex + 1);
            }
        }
    });
}

// Performance monitoring functionality
function setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime + 'ms');
        
        // Monitor resource loading
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter(resource => resource.duration > 1000);
        if (slowResources.length > 0) {
            console.warn('Slow resources detected:', slowResources);
        }
    });
    
    // Monitor memory usage
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
                console.warn('High memory usage detected');
            }
        }, 30000);
    }
}

function setupYearDisplay() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .section h2, .hero h1, .hero p, .about-photo, .about .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Carousel functionality
function setupCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.card');
    const totalCards = cards.length;
    const cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    let currentIndex = 0;
    let isViewAll = false;

    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalCards / cardsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update carousel position
    function updateCarousel() {
        if (isViewAll) {
            track.style.transform = 'translateX(0)';
            track.style.flexWrap = 'wrap';
            track.style.justifyContent = 'center';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dotsContainer.style.display = 'none';
        } else {
            const cardWidth = cards[0].offsetWidth + 32; // 32px gap
            const translateX = -currentIndex * cardWidth * cardsPerView;
            track.style.transform = `translateX(${translateX}px)`;
            track.style.flexWrap = 'nowrap';
            track.style.justifyContent = 'flex-start';
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            dotsContainer.style.display = 'flex';
        }
    }

    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
        updateDots();
    }

    // Update dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Next slide
    function nextSlide() {
        const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
        updateDots();
    }

    // Previous slide
    function prevSlide() {
        const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        updateCarousel();
        updateDots();
    }

    // Toggle view all
    function toggleViewAll() {
        isViewAll = !isViewAll;
        viewAllBtn.textContent = isViewAll ? 'Show Less' : 'View All';
        updateCarousel();
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    viewAllBtn.addEventListener('click', toggleViewAll);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // Initialize
    createDots();
    updateCarousel();

    // Handle resize
    window.addEventListener('resize', () => {
        createDots();
        updateCarousel();
    });
}

// Animated counters in About section
function setupAboutCounters() {
    const counters = document.querySelectorAll('#about .num');
    if (!counters.length) return;

    const durationMs = 1200;

    const startCounting = (entry) => {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / durationMs, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => observer.observe(c));
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll effect to header
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(var(--bg-primary-rgb), 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '';
        header.style.backdropFilter = '';
    }
}, 10));

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Simple i18n (EN/NL)
function setupI18n() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) {
        return;
    }

    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.projects': 'Projects',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.contact': 'Contact',
            'nav.faq': 'FAQ',
            'hero.title': "Hello! I'm <span class=\"highlight-name\">Bilal Khasakhanov</span>",
            'hero.subtitle': 'Frontend / Backend / FullStack developer. Creating fast and user-friendly web applications.',
            'hero.ctaPrimary': 'My Projects',
            'hero.ctaSecondary': 'Get In Touch',
            'projects.title': 'Projects',
            'projects.viewAll': 'View All',
            'projects.teplotec.title': 'Teplotec',
            'projects.teplotec.desc': 'A modern services website for handyman and technical solutions in Belgium. Focus on clear service structure, quick booking, and trust-building UI.',
            'projects.saas.desc': 'Interactive analytics dashboard with authentication, charts, and API integrations. Optimized for performance and accessibility.',
            'projects.content.desc': 'Blazing-fast content site built with Astro and external APIs. Delivers excellent Lighthouse scores and SEO-friendly markup.',
            'projects.ecom.desc': 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built for scalability and user experience.',
            'projects.task.desc': 'Cross-platform mobile app for task management with real-time sync, team collaboration features, and intuitive design patterns.',
            'projects.portfolio.desc': 'Minimalist portfolio website showcasing creative work with smooth animations, dark mode, and optimized performance across devices.',
            'projects.viewSite': 'View site',
            'services.title': 'Services',
            'services.subtitle': 'Choose the perfect package for your project',
            'services.landing.title': 'Landing Page',
            'services.landing.desc': 'Single page website with contact form, mobile responsive design.',
            'services.landing.feature1': 'Mobile responsive',
            'services.landing.feature2': 'Contact form',
            'services.landing.feature3': 'SEO optimized',
            'services.landing.price': '€599',
            'services.business.title': 'Business Website',
            'services.business.desc': 'Multi-page website with CMS, blog, and admin panel.',
            'services.business.feature1': 'Up to 10 pages',
            'services.business.feature2': 'WordPress CMS',
            'services.business.feature3': 'Blog system',
            'services.business.feature4': 'Admin panel',
            'services.business.price': '€1299',
            'services.ecommerce.title': 'E-commerce Store',
            'services.ecommerce.desc': 'Full online store with payment integration and inventory management.',
            'services.ecommerce.feature1': 'Payment integration',
            'services.ecommerce.feature2': 'Inventory management',
            'services.ecommerce.feature3': 'Order tracking',
            'services.ecommerce.feature4': 'Admin dashboard',
            'services.ecommerce.price': '€2499',
            'services.popular': 'Most Popular',
            'process.title': 'How I Work',
            'process.subtitle': 'Simple 4-step process from idea to launch',
            'process.step1.title': 'Discovery',
            'process.step1.desc': 'We discuss your goals, target audience, and requirements to create the perfect solution.',
            'process.step2.title': 'Design',
            'process.step2.desc': 'I create wireframes and mockups to visualize your project before development starts.',
            'process.step3.title': 'Development',
            'process.step3.desc': 'Clean, efficient code development with regular updates and feedback sessions.',
            'process.step4.title': 'Launch',
            'process.step4.desc': 'Deployment, testing, and handover with documentation and ongoing support.',
            'pricing.title': 'Pricing',
            'pricing.subtitle': 'Transparent pricing with no hidden fees',
            'pricing.hourly.title': 'Hourly Rate',
            'pricing.hourly.price': '€65<span>/hour</span>',
            'pricing.hourly.feature1': 'Perfect for small tasks',
            'pricing.hourly.feature2': 'Bug fixes & updates',
            'pricing.hourly.feature3': 'Consultations',
            'pricing.hourly.feature4': 'Minimum 2 hours',
            'pricing.project.title': 'Project Based',
            'pricing.project.price': '€599<span>-€2499</span>',
            'pricing.project.feature1': 'Fixed price packages',
            'pricing.project.feature2': 'No surprise costs',
            'pricing.project.feature3': '3 months support',
            'pricing.project.feature4': 'Source code included',
            'pricing.maintenance.title': 'Maintenance',
            'pricing.maintenance.price': '€199<span>/month</span>',
            'pricing.maintenance.feature1': 'Regular updates',
            'pricing.maintenance.feature2': 'Security monitoring',
            'pricing.maintenance.feature3': 'Backup & restore',
            'pricing.maintenance.feature4': 'Priority support',
            'pricing.contact': 'Get Quote',
            'pricing.recommended': 'Recommended',
            'nav.process': 'Process',
            'nav.pricing': 'Pricing',
            'contact.title': 'Contact',
            'contact.email': '✉️ bilal.khasakhanov@gmail.com',
            'contact.phone': '📞 +32 490 43 72 44',
            'contact.location': '📍 Oudenaarde, Belgium',
            'contact.form.name': 'Your Name',
            'contact.form.email': 'Email',
            'contact.form.message': 'Tell me about your project...',
            'contact.form.send': 'Send Message',
            'contact.form.projectType': 'Project Type',
            'contact.form.selectProject': 'Select Project Type',
            'contact.form.landing': 'Landing Page (€599)',
            'contact.form.business': 'Business Website (€1299)',
            'contact.form.ecommerce': 'E-commerce Store (€2499)',
            'contact.form.custom': 'Custom Project',
            'contact.form.maintenance': 'Maintenance (€199/month)',
            'contact.form.consultation': 'Consultation (€65/hour)',
            'contact.form.budget': 'Budget Range',
            'contact.form.selectBudget': 'Select Budget Range',
            'contact.form.budget1': '€500 - €1000',
            'contact.form.budget2': '€1000 - €2000',
            'contact.form.budget3': '€2000 - €3000',
            'contact.form.budget4': '€3000+',
            'contact.form.budget5': 'Let\'s discuss',
            'contact.form.company': 'Company (Optional)',
            'contact.form.phone': 'Phone (Optional)',
            'contact.form.newsletter': 'Subscribe to my newsletter for web development tips',
            'about.title': 'About Me',
            'about.lead': 'I\'m Bilal Khasakhanov, a 23‑year‑old Full‑Stack web developer crafting end‑to‑end digital products — from design to deployment.',
            'about.desc': 'I design clean, user‑friendly interfaces and build reliable back‑end services with production‑ready hosting and infrastructure. My focus is performance, accessibility, and maintainable code that scales. I enjoy turning ideas into polished, real‑world solutions.',
            'about.badge': 'Available for work',
            'about.stats1': 'Years experience',
            'about.stats2': 'Projects',
            'about.stats3': 'Happy clients',
            'about.cta1': 'See my work',
            'about.cta2': 'Hire me',
            'footer.copyright': 'All rights reserved.',
            'testimonials.title': 'What Clients Say',
            'testimonials.subtitle': "Don't just take my word for it - hear from satisfied clients",
            'testimonials.testimonial1.text': '"Bilal delivered an exceptional website that exceeded our expectations. The design is modern, responsive, and perfectly captures our brand identity."',
            'testimonials.testimonial1.name': 'John Smith',
            'testimonials.testimonial1.role': 'CEO, TechStart',
            'testimonials.testimonial2.text': '"Professional, reliable, and incredibly talented. Bilal transformed our online presence and helped us increase our conversion rate by 40%."',
            'testimonials.testimonial2.name': 'Sarah Johnson',
            'testimonials.testimonial2.role': 'Marketing Director, RetailCo',
            'testimonials.testimonial3.text': '"Outstanding work! Bilal\'s attention to detail and technical expertise made our e-commerce platform a huge success. Highly recommended!"',
            'testimonials.testimonial3.name': 'Mike Chen',
            'testimonials.testimonial3.role': 'Founder, E-Shop Pro',
            'footer.visits': 'Visits',
            'footer.timeOnSite': 'Min on site',
            'faq.title': 'Frequently Asked Questions',
            'faq.subtitle': 'Common questions about my services',
            'faq.category.general': 'General',
            'faq.category.technical': 'Technical',
            'faq.category.pricing': 'Pricing',
            'faq.category.support': 'Support',
            'faq.q1.question': 'How long does a typical project take?',
            'faq.q1.answer': 'Project timelines vary depending on complexity. A landing page typically takes 1-2 weeks, while a full e-commerce site can take 4-8 weeks. I provide detailed timelines during our initial consultation.',
            'faq.q2.question': 'What\'s included in your services?',
            'faq.q2.answer': 'My services include design, development, testing, deployment, and 3 months of free support. I also provide source code, documentation, and training for content management.',
            'faq.q3.question': 'What technologies do you work with?',
            'faq.q3.answer': 'I work with modern web technologies including React, Node.js, WordPress, Next.js, TypeScript, and various databases. I stay updated with the latest trends and best practices.',
            'faq.q4.question': 'Do you work with existing websites?',
            'faq.q4.answer': 'Yes! I can help with website redesigns, feature additions, performance optimization, and maintenance for existing websites built with various technologies.',
            'faq.q5.question': 'What are your payment terms?',
            'faq.q5.answer': 'I typically require 50% upfront for new projects and 50% upon completion. For larger projects, we can arrange milestone-based payments. All payments are processed securely.',
            'faq.q6.question': 'Do you provide ongoing support?',
            'faq.q6.answer': 'Yes! All projects include 3 months of free support. After that, I offer maintenance packages starting from €199/month for updates, security monitoring, and technical support.',
            'faq.q7.question': 'Can you help with SEO?',
            'faq.q7.answer': 'Absolutely! I implement SEO best practices including meta tags, structured data, performance optimization, and mobile-first design. I can also help with Google Analytics setup and search console optimization.',
            'faq.q8.question': 'What if I need changes after launch?',
            'faq.q8.answer': 'Minor changes and bug fixes are included in the 3-month support period. For major feature additions or redesigns, we can discuss additional pricing based on the scope of work.'
        },
        nl: {
            'nav.home': 'Home',
            'nav.projects': 'Projecten',
            'nav.about': 'Over',
            'nav.services': 'Services',
            'nav.contact': 'Contact',
            'hero.title': "Hallo! Ik ben <span class=\"highlight-name\">Bilal Khasakhanov</span>",
            'hero.subtitle': 'Full‑Stack ontwikkelaar: front‑end, back‑end en hosting. Snelle en gebruiksvriendelijke webapps.',
            'hero.ctaPrimary': 'Mijn Projecten',
            'hero.ctaSecondary': 'Contact opnemen',
            'projects.title': 'Projecten',
            'projects.viewAll': 'Alles bekijken',
            'projects.teplotec.title': 'Teplotec',
            'projects.teplotec.desc': 'Een moderne dienstensite voor handyman en technische oplossingen in België. Focus op duidelijke dienstenstructuur, snelle boeking en vertrouwenwekkende UI.',
            'projects.saas.desc': 'Interactief analytics-dashboard met login, grafieken en API-integraties. Geoptimaliseerd voor prestaties en toegankelijkheid.',
            'projects.content.desc': 'Razendsnelle content-site met Astro en externe API\'s. Uitstekende Lighthouse-scores en SEO-vriendelijke markup.',
            'projects.ecom.desc': 'Full-stack e-commerce oplossing met betalingsintegratie, voorraadbeheer en admin-dashboard. Gebouwd voor schaalbaarheid en gebruikservaring.',
            'projects.task.desc': 'Cross-platform takenapp voor taakbeheer met realtime synchronisatie, team samenwerking en intuïtief ontwerp.',
            'projects.portfolio.desc': 'Minimalistische portfolio website met vloeiende animaties, dark mode en optimale prestaties op alle apparaten.',
            'projects.viewSite': 'Bekijk site',
            'services.title': 'Diensten',
            'services.subtitle': 'Kies het perfecte pakket voor jouw project',
            'services.landing.title': 'Landingspagina',
            'services.landing.desc': 'Eénpagina website met contactformulier en mobiele responsive design.',
            'services.landing.feature1': 'Mobiel responsive',
            'services.landing.feature2': 'Contactformulier',
            'services.landing.feature3': 'SEO geoptimaliseerd',
            'services.landing.price': '€599',
            'services.business.title': 'Bedrijfswebsite',
            'services.business.desc': 'Meerpagina website met CMS, blog en admin panel.',
            'services.business.feature1': 'Tot 10 pagina\'s',
            'services.business.feature2': 'WordPress CMS',
            'services.business.feature3': 'Blog systeem',
            'services.business.feature4': 'Admin panel',
            'services.business.price': '€1299',
            'services.ecommerce.title': 'E-commerce Winkel',
            'services.ecommerce.desc': 'Volledige online winkel met betalingsintegratie en voorraadbeheer.',
            'services.ecommerce.feature1': 'Betalingsintegratie',
            'services.ecommerce.feature2': 'Voorraadbeheer',
            'services.ecommerce.feature3': 'Order tracking',
            'services.ecommerce.feature4': 'Admin dashboard',
            'services.ecommerce.price': '€2499',
            'services.popular': 'Meest Populair',
            'process.title': 'Hoe Ik Werk',
            'process.subtitle': 'Eenvoudig 4-stappen proces van idee tot lancering',
            'process.step1.title': 'Ontdekking',
            'process.step1.desc': 'We bespreken jouw doelen, doelgroep en vereisten om de perfecte oplossing te creëren.',
            'process.step2.title': 'Ontwerp',
            'process.step2.desc': 'Ik maak wireframes en mockups om jouw project te visualiseren voordat de ontwikkeling begint.',
            'process.step3.title': 'Ontwikkeling',
            'process.step3.desc': 'Schone, efficiënte code ontwikkeling met regelmatige updates en feedback sessies.',
            'process.step4.title': 'Lancering',
            'process.step4.desc': 'Deployment, testing en overdracht met documentatie en doorlopende ondersteuning.',
            'pricing.title': 'Prijzen',
            'pricing.subtitle': 'Transparante prijzen zonder verborgen kosten',
            'pricing.hourly.title': 'Uurtarief',
            'pricing.hourly.price': '€35<span>/uur</span>',
            'pricing.hourly.feature1': 'Perfect voor kleine taken',
            'pricing.hourly.feature2': 'Bug fixes & updates',
            'pricing.hourly.feature3': 'Consultaties',
            'pricing.hourly.feature4': 'Minimum 2 uur',
            'pricing.project.title': 'Project Gebaseerd',
            'pricing.project.price': '€599<span>-€2499</span>',
            'pricing.project.feature1': 'Vaste prijs pakketten',
            'pricing.project.feature2': 'Geen verrassingskosten',
            'pricing.project.feature3': '3 maanden ondersteuning',
            'pricing.project.feature4': 'Broncode inbegrepen',
            'pricing.maintenance.title': 'Onderhoud',
            'pricing.maintenance.price': '€99<span>/maand</span>',
            'pricing.maintenance.feature1': 'Regelmatige updates',
            'pricing.maintenance.feature2': 'Beveiligingsmonitoring',
            'pricing.maintenance.feature3': 'Backup & herstel',
            'pricing.maintenance.feature4': 'Prioriteitsondersteuning',
            'pricing.contact': 'Offerte Aanvragen',
            'pricing.recommended': 'Aanbevolen',
            'nav.process': 'Proces',
            'nav.pricing': 'Prijzen',
            'contact.title': 'Contact',
            'contact.email': '✉️ bilal.khasakhanov@gmail.com',
            'contact.phone': '📞 +32 490 43 72 44',
            'contact.location': '📍 Oudenaarde, België',
            'contact.form.name': 'Uw naam',
            'contact.form.email': 'E‑mail',
            'contact.form.message': 'Vertel me over uw project...',
            'contact.form.send': 'Bericht Versturen',
            'contact.form.projectType': 'Project Type',
            'contact.form.selectProject': 'Selecteer Project Type',
            'contact.form.landing': 'Landingspagina (€599)',
            'contact.form.business': 'Bedrijfswebsite (€1299)',
            'contact.form.ecommerce': 'E-commerce Winkel (€2499)',
            'contact.form.custom': 'Aangepast Project',
            'contact.form.maintenance': 'Onderhoud (€199/maand)',
            'contact.form.consultation': 'Consultatie (€65/uur)',
            'contact.form.budget': 'Budget Range',
            'contact.form.selectBudget': 'Selecteer Budget Range',
            'contact.form.budget1': '€500 - €1000',
            'contact.form.budget2': '€1000 - €2000',
            'contact.form.budget3': '€2000 - €3000',
            'contact.form.budget4': '€3000+',
            'contact.form.budget5': 'Laten we bespreken',
            'contact.form.company': 'Bedrijf (Optioneel)',
            'contact.form.phone': 'Telefoon (Optioneel)',
            'contact.form.newsletter': 'Abonneer op mijn nieuwsbrief voor web development tips',
            'about.title': 'Over Mij',
            'about.lead': 'Ik ben Bilal Khasakhanov, een 23‑jarige Full‑Stack webontwikkelaar die end‑to‑end digitale producten creëert — van ontwerp tot implementatie.',
            'about.desc': 'Ik ontwerp schone, gebruiksvriendelijke interfaces en bouw betrouwbare back‑end services met productie‑klaar hosting en infrastructuur. Mijn focus ligt op prestaties, toegankelijkheid en onderhoudbare code die schaalt. Ik geniet ervan ideeën om te zetten in verfijnde, real‑world oplossingen.',
            'about.cta1': 'Bekijk mijn werk',
            'about.cta2': 'Huur me in',
            'about.stats1': 'Jaar ervaring',
            'about.stats2': 'Projecten',
            'about.stats3': 'Tevreden klanten',
            'about.badge': 'Beschikbaar voor werk',
            'footer.copyright': 'Alle rechten voorbehouden.',
            'testimonials.title': 'Wat Klanten Zeggen',
            'testimonials.subtitle': 'Neem niet alleen mijn woord voor het - hoor van tevreden klanten',
            'testimonials.testimonial1.text': '"Bilal leverde een uitzonderlijke website die onze verwachtingen overtrof. Het ontwerp is modern, responsief en vangt perfect onze merkidentiteit."',
            'testimonials.testimonial1.name': 'John Smith',
            'testimonials.testimonial1.role': 'CEO, TechStart',
            'testimonials.testimonial2.text': '"Professioneel, betrouwbaar en ongelooflijk getalenteerd. Bilal transformeerde onze online aanwezigheid en hielp ons onze conversieratio met 40% te verhogen."',
            'testimonials.testimonial2.name': 'Sarah Johnson',
            'testimonials.testimonial2.role': 'Marketing Directeur, RetailCo',
            'testimonials.testimonial3.text': '"Uitstekend werk! Bilal\'s aandacht voor detail en technische expertise maakte ons e-commerce platform een groot succes. Zeer aanbevolen!"',
            'testimonials.testimonial3.name': 'Mike Chen',
            'testimonials.testimonial3.role': 'Oprichter, E-Shop Pro',
            'footer.visits': 'Bezoeken',
            'footer.timeOnSite': 'Min op site',
            'nav.faq': 'FAQ',
            'faq.title': 'Veelgestelde Vragen',
            'faq.subtitle': 'Veelgestelde vragen over mijn diensten',
            'faq.category.general': 'Algemeen',
            'faq.category.technical': 'Technisch',
            'faq.category.pricing': 'Prijzen',
            'faq.category.support': 'Ondersteuning',
            'faq.q1.question': 'Hoe lang duurt een typisch project?',
            'faq.q1.answer': 'Projecttijdlijnen variëren afhankelijk van complexiteit. Een landingspagina duurt meestal 1-2 weken, terwijl een volledige e-commerce site 4-8 weken kan duren. Ik geef gedetailleerde tijdlijnen tijdens ons eerste overleg.',
            'faq.q2.question': 'Wat is inbegrepen in uw diensten?',
            'faq.q2.answer': 'Mijn diensten omvatten ontwerp, ontwikkeling, testing, implementatie en 3 maanden gratis ondersteuning. Ik lever ook broncode, documentatie en training voor contentbeheer.',
            'faq.q3.question': 'Met welke technologieën werkt u?',
            'faq.q3.answer': 'Ik werk met moderne webtechnologieën zoals React, Node.js, WordPress, Next.js, TypeScript en verschillende databases. Ik blijf op de hoogte van de nieuwste trends en best practices.',
            'faq.q4.question': 'Werkt u met bestaande websites?',
            'faq.q4.answer': 'Ja! Ik kan helpen met website-redesigns, functietoevoegingen, prestatie-optimalisatie en onderhoud voor bestaande websites gebouwd met verschillende technologieën.',
            'faq.q5.question': 'Wat zijn uw betalingsvoorwaarden?',
            'faq.q5.answer': 'Ik vereis meestal 50% vooraf voor nieuwe projecten en 50% bij voltooiing. Voor grotere projecten kunnen we milestone-gebaseerde betalingen regelen. Alle betalingen worden veilig verwerkt.',
            'faq.q6.question': 'Biedt u doorlopende ondersteuning?',
            'faq.q6.answer': 'Ja! Alle projecten omvatten 3 maanden gratis ondersteuning. Daarna bied ik onderhoudspakketten aan vanaf €199/maand voor updates, beveiligingsmonitoring en technische ondersteuning.',
            'faq.q7.question': 'Kunt u helpen met SEO?',
            'faq.q7.answer': 'Absoluut! Ik implementeer SEO best practices inclusief meta tags, gestructureerde data, prestatie-optimalisatie en mobile-first design. Ik kan ook helpen met Google Analytics setup en search console optimalisatie.',
            'faq.q8.question': 'Wat als ik wijzigingen nodig heb na lancering?',
            'faq.q8.answer': 'Kleine wijzigingen en bugfixes zijn inbegrepen in de 3-maanden ondersteuningsperiode. Voor grote functietoevoegingen of redesigns kunnen we aanvullende prijzen bespreken op basis van de omvang van het werk.',
            'notification.success': 'Bedankt voor je bericht! Ik neem binnenkort contact met je op.',
            'notification.error.fields': 'Vul alle velden in',
            'notification.error.email': 'Voer een geldig e-mailadres in',
            'notification.error.network': 'Netwerkfout. Controleer je verbinding en probeer opnieuw.',
            'notification.error.form': 'Formulier endpoint niet geconfigureerd. Geef je Formspree ID op.',
            'notification.error.submit': 'Verzending mislukt. Probeer later opnieuw.'
        }
    };

    function applyTranslations(lang) {
        const dict = translations[lang] || translations.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });
    }

    // Init
    const saved = localStorage.getItem('lang') || 'en';
    applyTranslations(saved);
    langToggle.textContent = saved.toUpperCase();
    langToggle.dataset.lang = saved;

    // Toggle
    langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const current = langToggle.dataset.lang || 'en';
        const next = current === 'en' ? 'nl' : 'en';
        langToggle.dataset.lang = next;
        langToggle.textContent = next.toUpperCase();
        localStorage.setItem('lang', next);
        applyTranslations(next);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mainNav = document.getElementById('mainNav');
        const menuToggle = document.getElementById('menuToggle');
        
        if (mainNav && mainNav.getAttribute('aria-expanded') === 'true') {
            mainNav.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    }
});

// Add click outside to close mobile menu
document.addEventListener('click', (e) => {
    const mainNav = document.getElementById('mainNav');
    const menuToggle = document.getElementById('menuToggle');
    
    if (mainNav && mainNav.getAttribute('aria-expanded') === 'true') {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            mainNav.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    }
});

// Analytics and metrics
function setupAnalytics() {
  // Visit counter
  let visitCount = localStorage.getItem('visitCount') || 0;
  visitCount = parseInt(visitCount) + 1;
  localStorage.setItem('visitCount', visitCount);
  
  // Update visit count display
  const visitCountElement = document.getElementById('visitCount');
  if (visitCountElement) {
    animateCounter(visitCountElement, 0, visitCount, 1000);
  }
  
  // Time on site tracking
  const startTime = Date.now();
  let timeOnSite = 0;
  
  // Update time every minute
  const timeInterval = setInterval(() => {
    timeOnSite = Math.floor((Date.now() - startTime) / 60000); // minutes
    const timeElement = document.getElementById('timeOnSite');
    if (timeElement) {
      timeElement.textContent = timeOnSite;
    }
  }, 60000);
  
  // Save time on site when leaving
  window.addEventListener('beforeunload', () => {
    clearInterval(timeInterval);
    const totalTime = Math.floor((Date.now() - startTime) / 60000);
    const savedTime = localStorage.getItem('totalTimeOnSite') || 0;
    localStorage.setItem('totalTimeOnSite', parseInt(savedTime) + totalTime);
  });
  
  // Section tracking
  const sections = ['home', 'services', 'process', 'projects', 'about', 'pricing', 'testimonials', 'contact'];
  const sectionViews = {};
  
  sections.forEach(section => {
    sectionViews[section] = 0;
  });
  
  // Track section views
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionViews[sectionId] !== undefined) {
          sectionViews[sectionId]++;
          console.log(`Section ${sectionId} viewed ${sectionViews[sectionId]} times`);
        }
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      sectionObserver.observe(element);
    }
  });
}

// Counter animation
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (end - start) * progress);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Lazy loading for images
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  images.forEach(img => {
    img.classList.add('lazy');
    imageObserver.observe(img);
  });
}

// Preload critical resources
function preloadCriticalResources() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Project filters functionality
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const technologies = card.dataset.technologies?.split(',') || [];
                const shouldShow = filter === 'all' || technologies.includes(filter);
                
                card.style.display = shouldShow ? 'block' : 'none';
                card.style.opacity = shouldShow ? '1' : '0';
                card.style.transform = shouldShow ? 'translateY(0)' : 'translateY(20px)';
            });
        });
    });
}

// Modal windows for project details
function setupModalWindows() {
    const projectCards = document.querySelectorAll('.card');
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <div class="modal-image"></div>
                <div class="modal-info">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                    <div class="modal-technologies"></div>
                    <div class="modal-links"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const image = card.querySelector('img').src;
            const technologies = card.querySelectorAll('.badge');
            const links = card.querySelectorAll('.link');
            
            // Populate modal
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-description').textContent = description;
            modal.querySelector('.modal-image').innerHTML = `<img src="${image}" alt="${title}">`;
            
            // Add technologies
            const techContainer = modal.querySelector('.modal-technologies');
            techContainer.innerHTML = '';
            technologies.forEach(badge => {
                const tech = document.createElement('span');
                tech.className = 'modal-tech';
                tech.textContent = badge.textContent;
                techContainer.appendChild(tech);
            });
            
            // Add links
            const linksContainer = modal.querySelector('.modal-links');
            linksContainer.innerHTML = '';
            links.forEach(link => {
                const modalLink = document.createElement('a');
                modalLink.href = link.href;
                modalLink.textContent = link.textContent;
                modalLink.className = 'modal-link button primary';
                modalLink.target = link.target;
                linksContainer.appendChild(modalLink);
            });
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


// FAQ section functionality
function setupFAQSection() {
    const faqSection = document.createElement('section');
    faqSection.id = 'faq';
    faqSection.className = 'section';
    faqSection.innerHTML = `
        <div class="container">
            <h2 data-i18n="faq.title">Frequently Asked Questions</h2>
            <p class="faq-subtitle" data-i18n="faq.subtitle">Common questions about my services</p>
            <div class="faq-categories">
                <button class="faq-category active" data-category="general" data-i18n="faq.category.general">General</button>
                <button class="faq-category" data-category="technical" data-i18n="faq.category.technical">Technical</button>
                <button class="faq-category" data-category="pricing" data-i18n="faq.category.pricing">Pricing</button>
                <button class="faq-category" data-category="support" data-i18n="faq.category.support">Support</button>
            </div>
            <div class="faq-list">
                <div class="faq-item" data-category="general">
                    <button class="faq-question">
                        <span data-i18n="faq.q1.question">How long does a typical project take?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q1.answer">Project timelines vary depending on complexity. A landing page typically takes 1-2 weeks, while a full e-commerce site can take 4-8 weeks. I provide detailed timelines during our initial consultation.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="general">
                    <button class="faq-question">
                        <span data-i18n="faq.q2.question">What's included in your services?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q2.answer">My services include design, development, testing, deployment, and 3 months of free support. I also provide source code, documentation, and training for content management.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="technical">
                    <button class="faq-question">
                        <span data-i18n="faq.q3.question">What technologies do you work with?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q3.answer">I work with modern web technologies including React, Node.js, WordPress, Next.js, TypeScript, and various databases. I stay updated with the latest trends and best practices.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="technical">
                    <button class="faq-question">
                        <span data-i18n="faq.q4.question">Do you work with existing websites?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q4.answer">Yes! I can help with website redesigns, feature additions, performance optimization, and maintenance for existing websites built with various technologies.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="technical">
                    <button class="faq-question">
                        <span data-i18n="faq.q7.question">Can you help with SEO?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q7.answer">Absolutely! I implement SEO best practices including meta tags, structured data, performance optimization, and mobile-first design. I can also help with Google Analytics setup and search console optimization.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="pricing">
                    <button class="faq-question">
                        <span data-i18n="faq.q5.question">What are your payment terms?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q5.answer">I typically require 50% upfront for new projects and 50% upon completion. For larger projects, we can arrange milestone-based payments. All payments are processed securely.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="support">
                    <button class="faq-question">
                        <span data-i18n="faq.q6.question">Do you provide ongoing support?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q6.answer">Yes! All projects include 3 months of free support. After that, I offer maintenance packages starting from €199/month for updates, security monitoring, and technical support.</p>
                    </div>
                </div>
                <div class="faq-item" data-category="support">
                    <button class="faq-question">
                        <span data-i18n="faq.q8.question">What if I need changes after launch?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-answer">
                        <p data-i18n="faq.q8.answer">Minor changes and bug fixes are included in the 3-month support period. For major feature additions or redesigns, we can discuss additional pricing based on the scope of work.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert before contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.parentNode.insertBefore(faqSection, contactSection);
    }
    
    
    // FAQ functionality
    const faqItems = faqSection.querySelectorAll('.faq-item');
    const faqCategories = faqSection.querySelectorAll('.faq-category');
    
    // Category filtering
    faqCategories.forEach(category => {
        category.addEventListener('click', () => {
            const selectedCategory = category.dataset.category;
            
            // Update active category
            faqCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }
            });
        });
    });
    
    // Individual FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other items in the same category
            const itemCategory = item.dataset.category;
            faqItems.forEach(otherItem => {
                if (otherItem.dataset.category === itemCategory) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('active');
                icon.textContent = '−';
            }
        });
    });
}

// Gradient backgrounds for sections
function setupGradientBackgrounds() {
    const sections = document.querySelectorAll('.section:not(.hero)');
    
    sections.forEach((section, index) => {
        if (section.id === 'about' || section.id === 'projects' || section.id === 'contact') return;
        
        const gradients = [
            'linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.05))',
            'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.05))',
            'linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(25, 135, 84, 0.05))',
            'linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(200, 35, 51, 0.05))',
            'linear-gradient(135deg, rgba(111, 66, 193, 0.1), rgba(102, 16, 242, 0.05))'
        ];
        
        section.style.background = gradients[index % gradients.length];
    });
}

// Enhanced 3D card effects
function setupEnhancedCards() {
    const cards = document.querySelectorAll('.card, .service-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Subtle scroll animations instead of parallax
function setupParallaxEffects() {
    const animatedElements = document.querySelectorAll('.hero, .section');
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Animated icons in services section
function setupAnimatedIcons() {
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Real-time visitor counter
function setupVisitorCounter() {
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    const counterElement = document.getElementById('visitorCount');
    if (counterElement) {
        animateCounter(counterElement, 0, visitorCount, 2000);
    }
}

// Social sharing functionality
function setupSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            if (button.dataset.platform === 'twitter') {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
            } else if (button.dataset.platform === 'linkedin') {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
            } else if (button.dataset.platform === 'facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
            }
        });
    });
}


// Reading progress bar
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = scrolled + '%';
    });
}

// Custom cursors for interactive elements
function setupCustomCursors() {
    const interactiveElements = document.querySelectorAll('a, button, .card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
}

// Enhanced swipe gestures for mobile
function setupSwipeGestures() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next section
                navigateToNextSection();
            } else {
                // Swipe right - previous section
                navigateToPreviousSection();
            }
        }
    });
}

function navigateToNextSection() {
    const sections = ['home', 'services', 'process', 'projects', 'about', 'pricing', 'faq', 'contact'];
    const currentSection = getCurrentSection().toLowerCase();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        document.getElementById(sections[currentIndex + 1]).scrollIntoView({ behavior: 'smooth' });
    }
}

function navigateToPreviousSection() {
    const sections = ['home', 'services', 'process', 'projects', 'about', 'pricing', 'faq', 'contact'];
    const currentSection = getCurrentSection().toLowerCase();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        document.getElementById(sections[currentIndex - 1]).scrollIntoView({ behavior: 'smooth' });
    }
}

// PWA offline functionality
function setupPWAOffline() {
    // Cache critical resources
    const criticalResources = [
        '/',
        '/styles.css',
        '/script.js',
        '/manifest.json'
    ];
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
    
    // Offline detection
    window.addEventListener('online', () => {
        showNotification('You are back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('You are offline. Some features may not work.', 'info');
    });
}

// Interactive Technology Demo
function setupInteractiveDemo() {
    const techDemo = document.createElement('section');
    techDemo.id = 'tech-demo';
    techDemo.className = 'section alt';
    techDemo.innerHTML = `
        <div class="container">
            <h2>Interactive Technology Showcase</h2>
            <p class="section-subtitle">Hover over technologies to see live examples</p>
            <div class="tech-grid">
                <div class="tech-card" data-tech="react">
                    <div class="tech-icon">⚛️</div>
                    <h3>React</h3>
                    <div class="tech-demo">
                        <div class="demo-component">
                            <div class="counter-demo">
                                <span class="counter-number">0</span>
                                <button class="demo-btn">Click me!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tech-card" data-tech="css">
                    <div class="tech-icon">🎨</div>
                    <h3>CSS3</h3>
                    <div class="tech-demo">
                        <div class="css-demo">
                            <div class="animated-shape"></div>
                        </div>
                    </div>
                </div>
                <div class="tech-card" data-tech="js">
                    <div class="tech-icon">⚡</div>
                    <h3>JavaScript</h3>
                    <div class="tech-demo">
                        <div class="js-demo">
                            <canvas id="particle-canvas" width="200" height="100"></canvas>
                        </div>
                    </div>
                </div>
                <div class="tech-card" data-tech="node">
                    <div class="tech-icon">🟢</div>
                    <h3>Node.js</h3>
                    <div class="tech-demo">
                        <div class="node-demo">
                            <div class="server-indicator">
                                <div class="server-dot"></div>
                                <span>Server Running</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#contact').insertAdjacentElement('beforebegin', techDemo);
    
    // Interactive counter demo
    const counterBtn = techDemo.querySelector('.demo-btn');
    const counterNumber = techDemo.querySelector('.counter-number');
    let count = 0;
    
    counterBtn.addEventListener('click', () => {
        count++;
        counterNumber.textContent = count;
        counterNumber.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterNumber.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Particle animation for JS demo
    const canvas = techDemo.querySelector('#particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1
            });
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = '#007bff';
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }
}

// Live Website Preview
function setupLivePreview() {
    const previewSection = document.createElement('section');
    previewSection.id = 'live-preview';
    previewSection.className = 'section';
    previewSection.innerHTML = `
        <div class="container">
            <h2>Live Website Preview</h2>
            <p class="section-subtitle">See how your website could look</p>
            <div class="preview-container">
                <div class="preview-device">
                    <div class="device-frame">
                        <div class="device-screen">
                            <div class="preview-content">
                                <div class="preview-header">
                                    <div class="preview-nav">
                                        <div class="nav-logo">Your Brand</div>
                                        <div class="nav-menu">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="preview-hero">
                                    <h3>Welcome to Your New Website</h3>
                                    <p>Modern, responsive, and fast</p>
                                    <button class="preview-btn">Get Started</button>
                                </div>
                                <div class="preview-features">
                                    <div class="feature-item">📱 Mobile First</div>
                                    <div class="feature-item">⚡ Fast Loading</div>
                                    <div class="feature-item">🔍 SEO Optimized</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="preview-controls">
                    <button class="control-btn active" data-device="desktop">Desktop</button>
                    <button class="control-btn" data-device="tablet">Tablet</button>
                    <button class="control-btn" data-device="mobile">Mobile</button>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#tech-demo').insertAdjacentElement('afterend', previewSection);
    
    // Device switching
    const controlBtns = previewSection.querySelectorAll('.control-btn');
    const deviceFrame = previewSection.querySelector('.device-frame');
    
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            controlBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const device = btn.dataset.device;
            deviceFrame.className = `device-frame ${device}`;
        });
    });
}

// Animated Skill Bars
function setupSkillAnimations() {
    const skillsSection = document.createElement('section');
    skillsSection.id = 'skills';
    skillsSection.className = 'section alt';
    skillsSection.innerHTML = `
        <div class="container">
            <h2>Technical Skills</h2>
            <p class="section-subtitle">My expertise in numbers</p>
            <div class="skills-grid">
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Frontend Development</span>
                        <span class="skill-percentage">95%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="95"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Backend Development</span>
                        <span class="skill-percentage">90%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="90"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Database Design</span>
                        <span class="skill-percentage">85%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="85"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">UI/UX Design</span>
                        <span class="skill-percentage">88%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="88"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">SEO Optimization</span>
                        <span class="skill-percentage">92%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="92"></div>
                    </div>
                </div>
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">Performance Optimization</span>
                        <span class="skill-percentage">94%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="94"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#live-preview').insertAdjacentElement('afterend', skillsSection);
    
    // Animate skill bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}

// Live Code Examples
function setupCodeShowcase() {
    const codeSection = document.createElement('section');
    codeSection.id = 'code-showcase';
    codeSection.className = 'section';
    codeSection.innerHTML = `
        <div class="container">
            <h2>Live Code Examples</h2>
            <p class="section-subtitle">See my code in action</p>
            <div class="code-tabs">
                <button class="code-tab active" data-tab="react">React Component</button>
                <button class="code-tab" data-tab="css">CSS Animation</button>
                <button class="code-tab" data-tab="js">JavaScript</button>
            </div>
            <div class="code-content">
                <div class="code-panel active" data-panel="react">
                    <div class="code-editor">
                        <div class="editor-header">
                            <div class="editor-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span class="editor-title">Component.jsx</span>
                        </div>
                        <div class="editor-body">
                            <pre><code>import React, { useState } from 'react';

const InteractiveButton = () => {
  const [count, setCount] = useState(0);
  
  return (
    &lt;button 
      onClick={() => setCount(count + 1)}
      className="animated-btn"
    &gt;
      Clicked {count} times
    &lt;/button&gt;
  );
};

export default InteractiveButton;</code></pre>
                        </div>
                    </div>
                    <div class="code-preview">
                        <div class="preview-frame">
                            <div id="react-demo"></div>
                        </div>
                    </div>
                </div>
                <div class="code-panel" data-panel="css">
                    <div class="code-editor">
                        <div class="editor-header">
                            <div class="editor-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span class="editor-title">styles.css</span>
                        </div>
                        <div class="editor-body">
                            <pre><code>.animated-card {
  transition: all 0.3s ease;
  transform: perspective(1000px);
}

.animated-card:hover {
  transform: rotateY(10deg) scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}</code></pre>
                        </div>
                    </div>
                    <div class="code-preview">
                        <div class="preview-frame">
                            <div class="css-demo-card">Hover me!</div>
                        </div>
                    </div>
                </div>
                <div class="code-panel" data-panel="js">
                    <div class="code-editor">
                        <div class="editor-header">
                            <div class="editor-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span class="editor-title">script.js</span>
                        </div>
                        <div class="editor-body">
                            <pre><code>// Smooth scroll with easing
function smoothScrollTo(target) {
  const start = window.pageYOffset;
  const distance = target.offsetTop - start;
  const duration = 1000;
  
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 
           (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, start + distance * ease);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  
  requestAnimationFrame(animateScroll);
}</code></pre>
                        </div>
                    </div>
                    <div class="code-preview">
                        <div class="preview-frame">
                            <button class="js-demo-btn">Try Smooth Scroll</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#skills').insertAdjacentElement('afterend', codeSection);
    
    // Tab switching
    const tabs = codeSection.querySelectorAll('.code-tab');
    const panels = codeSection.querySelectorAll('.code-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            const panel = codeSection.querySelector(`[data-panel="${tab.dataset.tab}"]`);
            panel.classList.add('active');
        });
    });
    
    // Live React Demo
    const reactDemo = codeSection.querySelector('#react-demo');
    if (reactDemo) {
        let reactCount = 0;
        reactDemo.innerHTML = `
            <button class="live-react-btn" onclick="this.nextElementSibling.textContent = ++this.dataset.count">
                Clicked 0 times
            </button>
        `;
        
        const reactBtn = reactDemo.querySelector('.live-react-btn');
        reactBtn.dataset.count = 0;
        
        reactBtn.addEventListener('click', () => {
            reactCount++;
            reactBtn.textContent = `Clicked ${reactCount} times`;
            reactBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                reactBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Live CSS Demo
    const cssDemoCard = codeSection.querySelector('.css-demo-card');
    if (cssDemoCard) {
        cssDemoCard.addEventListener('mouseenter', () => {
            cssDemoCard.style.animation = 'none';
            cssDemoCard.offsetHeight; // Trigger reflow
            cssDemoCard.style.animation = 'float 1s ease-in-out infinite';
        });
        
        cssDemoCard.addEventListener('mouseleave', () => {
            cssDemoCard.style.animation = 'none';
        });
    }
    
    // Live JavaScript Demo
    const jsDemoBtn = codeSection.querySelector('.js-demo-btn');
    if (jsDemoBtn) {
        jsDemoBtn.addEventListener('click', () => {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Button animation
            jsDemoBtn.style.transform = 'scale(0.95)';
            jsDemoBtn.textContent = 'Scrolling...';
            
            setTimeout(() => {
                jsDemoBtn.style.transform = 'scale(1)';
                jsDemoBtn.textContent = 'Try Smooth Scroll';
            }, 1000);
        });
    }
    
    // Add typing animation to code
    const codeBlocks = codeSection.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const originalText = block.textContent;
        block.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                block.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        };
        
        // Start typing animation when panel becomes active
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(block);
    });
    
    // Add cursor blinking effect
    const addCursorEffect = () => {
        const codeBlocks = codeSection.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            cursor.style.color = '#61dafb';
            cursor.style.animation = 'blink 1s infinite';
            block.appendChild(cursor);
        });
    };
    
    setTimeout(addCursorEffect, 2000);
}

// 3D Interactive Elements
function setup3DElements() {
    const threeDSection = document.createElement('section');
    threeDSection.id = '3d-showcase';
    threeDSection.className = 'section alt';
    threeDSection.innerHTML = `
        <div class="container">
            <h2>3D Interactive Elements</h2>
            <p class="section-subtitle">Modern web experiences with 3D effects</p>
            <div class="three-d-container">
                <div class="cube-container">
                    <div class="cube">
                        <div class="face front">React</div>
                        <div class="face back">Node.js</div>
                        <div class="face right">CSS3</div>
                        <div class="face left">JavaScript</div>
                        <div class="face top">HTML5</div>
                        <div class="face bottom">MongoDB</div>
                    </div>
                </div>
                <div class="floating-cards">
                    <div class="floating-card" data-tilt>
                        <div class="card-content">
                            <h4>Responsive Design</h4>
                            <p>Perfect on all devices</p>
                        </div>
                    </div>
                    <div class="floating-card" data-tilt>
                        <div class="card-content">
                            <h4>Fast Performance</h4>
                            <p>Optimized for speed</p>
                        </div>
                    </div>
                    <div class="floating-card" data-tilt>
                        <div class="card-content">
                            <h4>Modern UI</h4>
                            <p>Beautiful interfaces</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#code-showcase').insertAdjacentElement('afterend', threeDSection);
    
    // 3D cube rotation
    const cube = threeDSection.querySelector('.cube');
    let rotationX = 0;
    let rotationY = 0;
    
    threeDSection.addEventListener('mousemove', (e) => {
        const rect = threeDSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        rotationY = (x / rect.width - 0.5) * 30;
        rotationX = (y / rect.height - 0.5) * -30;
        
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });
    
    // Tilt effect for floating cards
    const floatingCards = threeDSection.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Add transition section after 3D Interactive Elements
    const transitionSection = document.createElement('section');
    transitionSection.className = 'section transition-section';
    transitionSection.innerHTML = `
        <div class="container">
            <div class="transition-content">
                <h3>Ready to Start Your Project?</h3>
                <p>Let's discuss your ideas and bring them to life with modern web technologies.</p>
                <div class="transition-stats">
                    <div class="transition-stat">
                        <span class="stat-number">24h</span>
                        <span class="stat-label">Response Time</span>
                    </div>
                    <div class="transition-stat">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Client Satisfaction</span>
                    </div>
                    <div class="transition-stat">
                        <span class="stat-number">3 Months</span>
                        <span class="stat-label">Free Support</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert transition section after 3D section
    threeDSection.parentNode.insertBefore(transitionSection, threeDSection.nextSibling);
}

// Performance Metrics Display
function setupPerformanceDemo() {
    const perfSection = document.createElement('section');
    perfSection.id = 'performance';
    perfSection.className = 'section';
    perfSection.innerHTML = `
        <div class="container">
            <h2>Performance Metrics</h2>
            <p class="section-subtitle">Real-time performance data</p>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">⚡</div>
                    <div class="metric-value" id="load-time">0.8s</div>
                    <div class="metric-label">Load Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">📱</div>
                    <div class="metric-value" id="mobile-score">98</div>
                    <div class="metric-label">Mobile Score</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">🚀</div>
                    <div class="metric-value" id="lighthouse">95</div>
                    <div class="metric-label">Lighthouse</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">💾</div>
                    <div class="metric-value" id="bundle-size">2.1MB</div>
                    <div class="metric-label">Bundle Size</div>
                </div>
            </div>
            <div class="performance-chart">
                <canvas id="performance-chart" width="400" height="200"></canvas>
            </div>
        </div>
    `;
    
    document.querySelector('#3d-showcase').insertAdjacentElement('afterend', perfSection);
    
    // Animate metrics
    const metrics = perfSection.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const finalValue = metric.textContent;
        let currentValue = 0;
        const increment = parseFloat(finalValue) / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= parseFloat(finalValue)) {
                metric.textContent = finalValue;
                clearInterval(timer);
            } else {
                metric.textContent = currentValue.toFixed(1);
            }
        }, 30);
    });
}

// Interactive Project Timeline
function setupInteractiveTimeline() {
    const timelineSection = document.createElement('section');
    timelineSection.id = 'timeline';
    timelineSection.className = 'section alt';
    timelineSection.innerHTML = `
        <div class="container">
            <h2>Project Development Timeline</h2>
            <p class="section-subtitle">How I build your website</p>
            <div class="timeline">
                <div class="timeline-item" data-step="1">
                    <div class="timeline-marker">1</div>
                    <div class="timeline-content">
                        <h4>Discovery & Planning</h4>
                        <p>Understanding your needs, target audience, and goals</p>
                        <div class="timeline-duration">1-2 days</div>
                    </div>
                </div>
                <div class="timeline-item" data-step="2">
                    <div class="timeline-marker">2</div>
                    <div class="timeline-content">
                        <h4>Design & Wireframing</h4>
                        <p>Creating visual mockups and user experience flow</p>
                        <div class="timeline-duration">3-5 days</div>
                    </div>
                </div>
                <div class="timeline-item" data-step="3">
                    <div class="timeline-marker">3</div>
                    <div class="timeline-content">
                        <h4>Development</h4>
                        <p>Building the website with clean, efficient code</p>
                        <div class="timeline-duration">1-3 weeks</div>
                    </div>
                </div>
                <div class="timeline-item" data-step="4">
                    <div class="timeline-marker">4</div>
                    <div class="timeline-content">
                        <h4>Testing & Optimization</h4>
                        <p>Ensuring everything works perfectly across all devices</p>
                        <div class="timeline-duration">2-3 days</div>
                    </div>
                </div>
                <div class="timeline-item" data-step="5">
                    <div class="timeline-marker">5</div>
                    <div class="timeline-content">
                        <h4>Launch & Support</h4>
                        <p>Going live and providing ongoing maintenance</p>
                        <div class="timeline-duration">Ongoing</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#performance').insertAdjacentElement('afterend', timelineSection);
    
    // Timeline animation
    const timelineItems = timelineSection.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Visual Technology Stack
function setupTechStackVisual() {
    const techStackSection = document.createElement('section');
    techStackSection.id = 'tech-stack';
    techStackSection.className = 'section';
    techStackSection.innerHTML = `
        <div class="container">
            <h2>Technology Stack</h2>
            <p class="section-subtitle">Modern tools for modern websites</p>
            <div class="tech-stack-grid">
                <div class="tech-category">
                    <h3>Frontend</h3>
                    <div class="tech-items">
                        <div class="tech-item" data-tech="react">
                            <div class="tech-logo">⚛️</div>
                            <span>React</span>
                        </div>
                        <div class="tech-item" data-tech="vue">
                            <div class="tech-logo">💚</div>
                            <span>Vue.js</span>
                        </div>
                        <div class="tech-item" data-tech="angular">
                            <div class="tech-logo">🅰️</div>
                            <span>Angular</span>
                        </div>
                        <div class="tech-item" data-tech="next">
                            <div class="tech-logo">▲</div>
                            <span>Next.js</span>
                        </div>
                    </div>
                </div>
                <div class="tech-category">
                    <h3>Backend</h3>
                    <div class="tech-items">
                        <div class="tech-item" data-tech="node">
                            <div class="tech-logo">🟢</div>
                            <span>Node.js</span>
                        </div>
                        <div class="tech-item" data-tech="express">
                            <div class="tech-logo">🚀</div>
                            <span>Express</span>
                        </div>
                        <div class="tech-item" data-tech="python">
                            <div class="tech-logo">🐍</div>
                            <span>Python</span>
                        </div>
                        <div class="tech-item" data-tech="php">
                            <div class="tech-logo">🐘</div>
                            <span>PHP</span>
                        </div>
                    </div>
                </div>
                <div class="tech-category">
                    <h3>Database</h3>
                    <div class="tech-items">
                        <div class="tech-item" data-tech="mongodb">
                            <div class="tech-logo">🍃</div>
                            <span>MongoDB</span>
                        </div>
                        <div class="tech-item" data-tech="mysql">
                            <div class="tech-logo">🐬</div>
                            <span>MySQL</span>
                        </div>
                        <div class="tech-item" data-tech="postgres">
                            <div class="tech-logo">🐘</div>
                            <span>PostgreSQL</span>
                        </div>
                        <div class="tech-item" data-tech="redis">
                            <div class="tech-logo">🔴</div>
                            <span>Redis</span>
                        </div>
                    </div>
                </div>
                <div class="tech-category">
                    <h3>Cloud & DevOps</h3>
                    <div class="tech-items">
                        <div class="tech-item" data-tech="aws">
                            <div class="tech-logo">☁️</div>
                            <span>AWS</span>
                        </div>
                        <div class="tech-item" data-tech="docker">
                            <div class="tech-logo">🐳</div>
                            <span>Docker</span>
                        </div>
                        <div class="tech-item" data-tech="kubernetes">
                            <div class="tech-logo">⚙️</div>
                            <span>Kubernetes</span>
                        </div>
                        <div class="tech-item" data-tech="git">
                            <div class="tech-logo">📚</div>
                            <span>Git</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#timeline').insertAdjacentElement('afterend', techStackSection);
    
    // Tech item hover effects
    const techItems = techStackSection.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) translateY(-5px)';
            item.style.boxShadow = '0 10px 25px rgba(0, 123, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) translateY(0)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ==================== NEW ADVANCED FEATURES ====================

// 1. Floating Particles Background
function setupFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.innerHTML = '<canvas id="particles-canvas"></canvas>';
    document.body.appendChild(particleContainer);
    
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 123, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// 2. Advanced Animations
function setupAdvancedAnimations() {
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Staggered animations for cards
    const cardElements = document.querySelectorAll('.project-card, .service-card, .testimonial-card');
    cardElements.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Morphing shapes animation
    const morphingShapes = document.createElement('div');
    morphingShapes.className = 'morphing-shapes';
    morphingShapes.innerHTML = `
        <div class="morph-shape shape-1"></div>
        <div class="morph-shape shape-2"></div>
        <div class="morph-shape shape-3"></div>
    `;
    document.body.appendChild(morphingShapes);
}

// 3. Interactive Skills Map
function setupInteractiveSkillsMap() {
    const skillsSection = document.createElement('section');
    skillsSection.id = 'interactive-skills';
    skillsSection.className = 'section alt';
    skillsSection.innerHTML = `
        <div class="container">
            <h2>Interactive Skills Map</h2>
            <p class="section-subtitle">Hover over skills to see details</p>
            <div class="skills-map">
                <div class="skill-node" data-skill="frontend" style="top: 20%; left: 30%;">
                    <div class="skill-icon">🎨</div>
                    <span class="skill-name">Frontend</span>
                    <div class="skill-details">
                        <h4>Frontend Development</h4>
                        <p>React, Vue.js, HTML5, CSS3, JavaScript ES6+</p>
                        <div class="skill-level">Expert</div>
                    </div>
                </div>
                <div class="skill-node" data-skill="backend" style="top: 40%; left: 60%;">
                    <div class="skill-icon">⚙️</div>
                    <span class="skill-name">Backend</span>
                    <div class="skill-details">
                        <h4>Backend Development</h4>
                        <p>Node.js, Python, PHP, Databases, APIs</p>
                        <div class="skill-level">Advanced</div>
                    </div>
                </div>
                <div class="skill-node" data-skill="design" style="top: 60%; left: 20%;">
                    <div class="skill-icon">🎯</div>
                    <span class="skill-name">Design</span>
                    <div class="skill-details">
                        <h4>UI/UX Design</h4>
                        <p>Figma, Adobe XD, User Research, Prototyping</p>
                        <div class="skill-level">Expert</div>
                    </div>
                </div>
                <div class="skill-node" data-skill="mobile" style="top: 30%; left: 80%;">
                    <div class="skill-icon">📱</div>
                    <span class="skill-name">Mobile</span>
                    <div class="skill-details">
                        <h4>Mobile Development</h4>
                        <p>React Native, Flutter, iOS, Android</p>
                        <div class="skill-level">Intermediate</div>
                    </div>
                </div>
                <div class="skill-node" data-skill="devops" style="top: 70%; left: 70%;">
                    <div class="skill-icon">🚀</div>
                    <span class="skill-name">DevOps</span>
                    <div class="skill-details">
                        <h4>DevOps & Deployment</h4>
                        <p>AWS, Docker, CI/CD, Linux, Monitoring</p>
                        <div class="skill-level">Intermediate</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#interactive-skills').insertAdjacentElement('afterend', skillsSection);
    
    // Interactive functionality
    const skillNodes = skillsSection.querySelectorAll('.skill-node');
    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.classList.add('active');
            const details = node.querySelector('.skill-details');
            details.style.display = 'block';
        });
        
        node.addEventListener('mouseleave', () => {
            node.classList.remove('active');
            const details = node.querySelector('.skill-details');
            details.style.display = 'none';
        });
    });
}

// 4. Smart Functions
function setupSmartFunctions() {
    // Auto theme detection
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches && !localStorage.getItem('theme')) {
        document.body.classList.add('dark-theme');
    }
    
    // Search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="search-input" placeholder="Search projects, skills, content...">
            <button id="search-btn">🔍</button>
            <div class="search-results" id="search-results"></div>
        </div>
    `;
    document.querySelector('.hero').appendChild(searchContainer);
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = searchContent(query);
        displaySearchResults(results);
    });
    
    // Smart notifications
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Show notification for new projects
    setTimeout(() => {
        if (Notification.permission === 'granted') {
            new Notification('New Project Available!', {
                body: 'Check out my latest React application',
                icon: '/favicon.ico'
            });
        }
    }, 5000);
}

// 5. Analytics and Metrics
function setupAnalyticsMetrics() {
    // Time on site tracking
    const startTime = Date.now();
    let timeOnSite = 0;
    
    setInterval(() => {
        timeOnSite = Math.floor((Date.now() - startTime) / 1000);
        updateTimeDisplay(timeOnSite);
    }, 1000);
    
    // Click heatmap
    document.addEventListener('click', (e) => {
        const heatmapData = JSON.parse(localStorage.getItem('heatmap') || '[]');
        heatmapData.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now(),
            element: e.target.tagName
        });
        localStorage.setItem('heatmap', JSON.stringify(heatmapData.slice(-1000))); // Keep last 1000 clicks
    });
    
    // Scroll depth tracking
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        updateScrollDepth(maxScrollDepth);
    });
}

// 6. Integrations
function setupIntegrations() {
    // Calendar integration
    const calendarSection = document.createElement('section');
    calendarSection.id = 'calendar-booking';
    calendarSection.className = 'section';
    calendarSection.innerHTML = `
        <div class="container">
            <h2>Book a Consultation</h2>
            <p class="section-subtitle">Schedule a free 30-minute consultation</p>
            <div class="calendar-widget">
                <div class="calendar-header">
                    <button id="prev-month">‹</button>
                    <h3 id="current-month">December 2024</h3>
                    <button id="next-month">›</button>
                </div>
                <div class="calendar-grid" id="calendar-grid"></div>
                <div class="time-slots">
                    <h4>Available Times</h4>
                    <div class="time-slot" data-time="09:00">9:00 AM</div>
                    <div class="time-slot" data-time="10:00">10:00 AM</div>
                    <div class="time-slot" data-time="11:00">11:00 AM</div>
                    <div class="time-slot" data-time="14:00">2:00 PM</div>
                    <div class="time-slot" data-time="15:00">3:00 PM</div>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#calendar-booking').insertAdjacentElement('afterend', calendarSection);
    
    // GitHub integration removed per user request
}

// 7. Personalization
function setupPersonalization() {
    // Time-based greetings
    const hour = new Date().getHours();
    let greeting = 'Hello';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.textContent = `${greeting}! I'm a Web Developer`;
    }
    
    // Weather-based content
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // You would typically use a weather API here
            const weatherWidget = document.createElement('div');
            weatherWidget.className = 'weather-widget';
            weatherWidget.innerHTML = `
                <div class="weather-info">
                    <span class="weather-icon">☀️</span>
                    <span class="weather-temp">22°C</span>
                    <span class="weather-location">Amsterdam</span>
                </div>
            `;
            document.querySelector('.hero').appendChild(weatherWidget);
        });
    }
    
    // Personalized recommendations
    const recommendations = document.createElement('section');
    recommendations.id = 'recommendations';
    recommendations.className = 'section';
    recommendations.innerHTML = `
        <div class="container">
            <h2>Recommended for You</h2>
            <p class="section-subtitle">Based on your interests</p>
            <div class="recommendations-grid">
                <div class="recommendation-card">
                    <h4>React Best Practices</h4>
                    <p>Learn advanced React patterns and optimization techniques</p>
                    <a href="#" class="recommendation-link">Read More</a>
                </div>
                <div class="recommendation-card">
                    <h4>CSS Grid Mastery</h4>
                    <p>Master modern CSS layout techniques</p>
                    <a href="#" class="recommendation-link">Read More</a>
                </div>
                <div class="recommendation-card">
                    <h4>JavaScript ES2024</h4>
                    <p>Explore the latest JavaScript features</p>
                    <a href="#" class="recommendation-link">Read More</a>
                </div>
            </div>
        </div>
    `;
    
    document.querySelector('#recommendations').insertAdjacentElement('afterend', recommendations);
}

// 8. Social Functions
function setupSocialFunctions() {
    // Client testimonials with photos
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
        const testimonials = testimonialsSection.querySelectorAll('.testimonial');
        testimonials.forEach((testimonial, index) => {
            const photo = document.createElement('div');
            photo.className = 'testimonial-photo';
            photo.innerHTML = `<img src="https://i.pravatar.cc/100?img=${index + 1}" alt="Client photo">`;
            testimonial.insertBefore(photo, testimonial.firstChild);
        });
    }
    
    // Social proof counter
    const socialProof = document.createElement('div');
    socialProof.className = 'social-proof';
    socialProof.innerHTML = `
        <div class="social-proof-item">
            <span class="proof-number">500+</span>
            <span class="proof-label">Happy Clients</span>
        </div>
        <div class="social-proof-item">
            <span class="proof-number">1000+</span>
            <span class="proof-label">Projects Completed</span>
        </div>
        <div class="social-proof-item">
            <span class="proof-number">5★</span>
            <span class="proof-label">Average Rating</span>
        </div>
    `;
    document.querySelector('.hero').appendChild(socialProof);
    
    // LinkedIn integration
    const linkedinWidget = document.createElement('div');
    linkedinWidget.className = 'linkedin-widget';
    linkedinWidget.innerHTML = `
        <div class="linkedin-content">
            <h4>Connect with me on LinkedIn</h4>
            <p>Follow for web development tips and industry insights</p>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" class="linkedin-btn">
                <span>Connect on LinkedIn</span>
            </a>
        </div>
    `;
    document.querySelector('#contact').appendChild(linkedinWidget);
}

// 9. Performance Optimization
function setupPerformanceOptimization() {
    // Lazy loading for all images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        'script.js',
        'IMG/home_background.jpg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : resource.endsWith('.js') ? 'script' : 'image';
        document.head.appendChild(link);
    });
    
    // Service Worker for caching
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    }
}

// 10. Accessibility
function setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // High contrast mode toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.className = 'contrast-toggle';
    contrastToggle.innerHTML = '🔍';
    contrastToggle.title = 'Toggle high contrast';
    contrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
    document.querySelector('.hero').appendChild(contrastToggle);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Screen reader announcements
    const announcer = document.createElement('div');
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
    
    // Announce page changes
    const originalTitle = document.title;
    let titleChangeCount = 0;
    
    const titleObserver = new MutationObserver(() => {
        if (document.title !== originalTitle) {
            titleChangeCount++;
            announcer.textContent = `Page title changed to: ${document.title}`;
        }
    });
    
    titleObserver.observe(document.querySelector('title'), { childList: true });
}

// GitHub integration removed per user request

// Helper functions
function searchContent(query) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, .project-card, .service-card');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query)) {
            results.push({
                element: element,
                text: element.textContent.substring(0, 100) + '...',
                type: element.tagName
            });
        }
    });
    
    return results;
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item">
            <h4>${result.type}</h4>
            <p>${result.text}</p>
        </div>
    `).join('');
}

function updateTimeDisplay(seconds) {
    const timeDisplay = document.querySelector('.time-display');
    if (timeDisplay) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `Time on site: ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

function updateScrollDepth(depth) {
    const scrollDisplay = document.querySelector('.scroll-depth');
    if (scrollDisplay) {
        scrollDisplay.textContent = `Scroll depth: ${depth}%`;
    }
}


// Console welcome message
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #007bff; font-size: 16px; font-weight: bold;');
console.log('%cThis site is built with HTML, CSS and JavaScript.', 'color: #6c757d; font-size: 14px;');

