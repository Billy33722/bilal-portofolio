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
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = mainNav.getAttribute('aria-expanded') === 'true';
            mainNav.setAttribute('aria-expanded', !isExpanded);
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Close menu when clicking on a link
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
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
            'footer.timeOnSite': 'Min on site'
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

// Console welcome message
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #007bff; font-size: 16px; font-weight: bold;');
console.log('%cThis site is built with HTML, CSS and JavaScript.', 'color: #6c757d; font-size: 14px;');
