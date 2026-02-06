// ===== PERFORMANCE OPTIMIZATIONS =====
(function() {
    'use strict';
    
    // Request Animation Frame Polyfill
    const raf = window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame ||
                function(callback) { return setTimeout(callback, 1000/60); };
    
    // Cancel Animation Frame Polyfill
    const caf = window.cancelAnimationFrame || 
                window.webkitCancelAnimationFrame || 
                window.mozCancelAnimationFrame ||
                clearTimeout;

    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading process
    function simulateLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                clearInterval(interval);
                
                // Add final touch animation
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        initializeSite();
                    }, 500);
                }, 500);
            }
        }, 50);
    }
    
    // Start loading simulation after a brief delay
    setTimeout(simulateLoading, 1000);

    // ===== INITIALIZE SITE =====
    function initializeSite() {
        // Initialize all modules
        initParticles();
        initNavigation();
        initTypingEffect();
        initCustomCursor();
        initScrollAnimations();
        initProjectSlider();
        initTechAnimations();
        initFormHandler();
        initThemeToggle(); // CORRIGÉ : Appel de la fonction
        initPerformanceMonitor();
        initParallaxEffects();
        initGlitchEffects();
    }

    // ===== PARTICLES SYSTEM =====
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--accent-primary);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                filter: blur(${size / 2}px);
                animation: floatParticle ${duration}s linear ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
            particles.push(particle);
        }
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.1;
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                    opacity: 0.1;
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                    opacity: 0.3;
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: 0.1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== NAVIGATION =====
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuToggle');
        const navMain = document.querySelector('.nav-main');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
                if (currentScroll > lastScroll && currentScroll > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
        
        // CORRIGÉ : Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navMain.classList.toggle('active');
                menuToggle.classList.toggle('active');
                document.body.style.overflow = navMain.classList.contains('active') ? 'hidden' : 'auto';
            });
        }
        
        // Close menu when clicking on link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMain.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMain.contains(e.target) && !menuToggle.contains(e.target)) {
                navMain.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact buttons
        const contactBtn = document.getElementById('contactBtn');
        const mainCta = document.getElementById('mainCta');
        const exploreBtn = document.getElementById('exploreBtn');
        
        [contactBtn, mainCta, exploreBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    document.querySelector('.contact-section').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                });
            }
        });
    }

    // ===== TYPING EFFECT =====
    function initTypingEffect() {
        const typedText = document.getElementById('typedText');
        const cursor = document.querySelector('.cursor');
        
        if (!typedText) return;
        
        const texts = [
            "Fullstack Developer",
            "Security Specialist",
            "Cloud Architect",
            "Tech Innovator"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        function type() {
            if (isPaused) return;
            
            const currentText = texts[textIndex];
            
            if (!isDeleting && charIndex < currentText.length) {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 50 + Math.random() * 50);
            } else if (!isDeleting && charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    setTimeout(type, 1000);
                }, 2000);
            } else if (isDeleting && charIndex > 0) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 30 + Math.random() * 30);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
            
            // Cursor animation
            cursor.style.opacity = isPaused ? '0' : '1';
        }
        
        // Start typing after a delay
        setTimeout(type, 1000);
    }

    // ===== CUSTOM CURSOR =====
    function initCustomCursor() {
        const cursor = document.getElementById('cursor');
        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorRing = cursor.querySelector('.cursor-ring');
        
        if (!cursor || window.matchMedia('(pointer: coarse)').matches) {
            cursor.style.display = 'none';
            return;
        }
        
        let mouseX = 0;
    let mouseY = 0;
        let dotX = 0;
        let dotY = 0;
        let ringX = 0;
        let ringY = 0;
        let scale = 1;
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .slider-btn, .tech-item, .service-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                scale = 1.5;
                cursorRing.style.borderColor = 'var(--accent-secondary)';
                cursorRing.style.opacity = '0.8';
            });
          
            el.addEventListener('mouseleave', () => {
                scale = 1;
                cursorRing.style.borderColor = 'var(--accent-primary)';
                cursorRing.style.opacity = '0.5';
            });
        });
        
        // Click effect
        document.addEventListener('mousedown', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Animation loop
        function animateCursor() {
            // Smooth follow for dot
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
            
            // Smoother follow for ring with delay
            ringX += (mouseX - ringX) * 0.1;
            ringY += (mouseY - ringY) * 0.1;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;
            
            // Keep cursor visible
            cursor.style.display = 'block';
            
            raf(animateCursor);
        }
        
        animateCursor();
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for tech bars
                    if (entry.target.classList.contains('tech-item')) {
                        const progressBar = entry.target.querySelector('.tech-progress');
                        const skillLevel = entry.target.dataset.skill;
                        if (progressBar && skillLevel) {
                            setTimeout(() => {
                                progressBar.style.width = `${skillLevel}%`;
                            }, 300);
                        }
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll('.service-card, .tech-item, .info-card, .project-slide');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== PROJECT SLIDER =====
    function initProjectSlider() {
        const sliderTrack = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.project-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (!sliderTrack || slides.length === 0) return;
        
        let currentSlide = 0;
        let isAnimating = false;
        
        function updateSlider() {
            if (isAnimating) return;
            
            isAnimating = true;
            sliderTrack.scrollTo({
                left: currentSlide * sliderTrack.offsetWidth,
                behavior: 'smooth'
            });
            
            // Update active states
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Reset animation flag
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
        
        // Button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            });
        }
        
        // Dot events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Auto slide (optional)
        let autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
        
        // Pause auto-slide on hover
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        sliderTrack.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlider();
            }, 5000);
        });
        
        // Touch support for mobile
        let startX = 0;
        let isDragging = false;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoSlideInterval);
        });
        
        sliderTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        sliderTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentSlide = (currentSlide + 1) % slides.length;
                } else {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                }
                updateSlider();
            }
            
            isDragging = false;
        });
    }

    // ===== TECH ANIMATIONS =====
    function initTechAnimations() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            const skill = item.dataset.skill;
            if (skill) {
                const progress = item.querySelector('.tech-progress');
                if (progress) {
                    // Store original width for reset
                    progress.dataset.originalWidth = '0%';
                    
                    // Animate on scroll (handled by intersection observer)
                }
            }
        });
    }

    // ===== FORM HANDLER =====
    function initFormHandler() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            // Show loading state
            submitBtn.querySelector('.btn-text').textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate API call
            try {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Validate
                if (!data.name || !data.email || !data.message) {
                    throw new Error('Veuillez remplir tous les champs obligatoires');
                }
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                showMessage('✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                contactForm.reset();
                
                // Optional: Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } catch (error) {
                showMessage(`❌ ${error.message}`, 'error');
            } finally {
                // Reset button
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        function showMessage(text, type) {
            if (!formMessage) return;
            
            formMessage.textContent = text;
            formMessage.style.color = type === 'success' ? 'var(--accent-primary)' : '#ff4444';
            formMessage.style.opacity = '1';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 300);
            }, 5000);
        }
    }

    // ===== THEME TOGGLE - CORRIGÉ =====
    function initThemeToggle() {
        const themeSwitch = document.getElementById('themeSwitch');
        if (!themeSwitch) {
            console.log('Theme switch not found');
            return;
        }
        
        // Load saved theme
        const savedTheme = localStorage.getItem('hackange-theme');
        console.log('Saved theme:', savedTheme);
        
        if (savedTheme === 'light') {
            document.body.classList.add('light');
            themeSwitch.checked = true;
            console.log('Light theme loaded');
        } else {
            document.body.classList.remove('light');
            themeSwitch.checked = false;
            console.log('Dark theme loaded');
        }
        
        // Theme switch handler
        themeSwitch.addEventListener('change', (e) => {
            console.log('Theme switch changed:', e.target.checked);
            
            if (themeSwitch.checked) {
                document.body.classList.add('light');
                localStorage.setItem('hackange-theme', 'light');
                console.log('Switched to light theme');
            } else {
                document.body.classList.remove('light');
                localStorage.setItem('hackange-theme', 'dark');
                console.log('Switched to dark theme');
            }
        });
        
        // Test du bouton
        console.log('Theme toggle initialized');
    }

    // ===== PARALLAX EFFECTS =====
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.floating-cube, .orbital-ring, .hero-visual');
        
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(el => {
                const speed = el.classList.contains('floating-cube') ? 0.02 : 
                              el.classList.contains('orbital-ring') ? 0.01 : 0.005;
                
                const x = (mouseX - 0.5) * speed * 100;
                const y = (mouseY - 0.5) * speed * 100;
                
                el.style.transform = `translate(${x}px, ${y}px) ${el.style.transform || ''}`;
            });
        });
    }

    // ===== GLITCH EFFECTS =====
    function initGlitchEffects() {
        const glitchElements = document.querySelectorAll('.title-glitch');
        
        glitchElements.forEach(glitch => {
            setInterval(() => {
                if (Math.random() > 0.9) {
                    glitch.style.opacity = '1';
                    setTimeout(() => {
                        glitch.style.opacity = '0';
                    }, 100);
                }
            }, 1000);
        });
    }

    // ===== PERFORMANCE MONITOR =====
    function initPerformanceMonitor() {
        // Log performance metrics
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            console.log(`HACKANGE - Page loaded in ${loadTime}ms`);
            
            // Optimize animations for low-power devices
            if (loadTime > 3000) {
                document.body.classList.add('performance-mode');
            }
        });
        
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    // Handle scroll-based animations here
                }, 100);
            }
        });
    }

    // ===== ERROR HANDLING =====
    window.addEventListener('error', (e) => {
        console.error('HACKANGE Error:', e.error);
        // You could send this to an error tracking service
    });

    // ===== SERVICE WORKER REGISTRATION =====
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
        });
    }

    // ===== EXPORT FOR DEBUGGING =====
    window.HACKANGE = {
        version: '2.0.0',
        debug: false,
        toggleDebug: function() {
            this.debug = !this.debug;
            console.log(`Debug mode: ${this.debug ? 'ON' : 'OFF'}`);
        },
        testThemeToggle: function() {
            const themeSwitch = document.getElementById('themeSwitch');
            if (themeSwitch) {
                themeSwitch.checked = !themeSwitch.checked;
                themeSwitch.dispatchEvent(new Event('change'));
                console.log('Theme toggled manually');
            }
        }
    };

})();

// ===== POLYFILLS =====
// Intersection Observer Polyfill
if (!('IntersectionObserver' in window)) {
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}

// Smooth Scroll Polyfill
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}