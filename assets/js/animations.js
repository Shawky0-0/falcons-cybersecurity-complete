// Animation System with Anime.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations
    initHeroAnimations();
    initScrollAnimations();
    initHoverEffects();
    initNavigationAnimations();
    
    // Animate page entrance
    animatePageEntrance();
});

// Hero Section Animations
function initHeroAnimations() {
    // Hero content entrance animation
    anime({
        targets: '.hero-content',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: 300,
        easing: 'easeOutExpo'
    });

    // Logo pulse animation
    anime({
        targets: 'nav img',
        scale: [1, 1.1, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
    });

    // Title character animation
    anime({
        targets: '.hero-content h1 span',
        opacity: [0, 1],
        translateY: [100, 0],
        rotateZ: [10, 0],
        duration: 800,
        delay: anime.stagger(100, {start: 500}),
        easing: 'easeOutExpo'
    });

    // Subtitle animation
    anime({
        targets: '.hero-content p:first-of-type',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: 1000,
        easing: 'easeOutQuad'
    });

    // Description animation
    anime({
        targets: '.hero-content p:nth-of-type(2)',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: 1200,
        easing: 'easeOutQuad'
    });

    // CTA buttons animation
    anime({
        targets: '.hero-content .cta-primary, .hero-content .cta-secondary',
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        duration: 600,
        delay: anime.stagger(200, {start: 1400}),
        easing: 'easeOutBack'
    });

    // Scroll indicator animation
    anime({
        targets: '.hero-content + div svg',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 1800,
        easing: 'easeOutQuad'
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSection(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Feature cards animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFeatureCards(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        cardObserver.observe(card);
    });
}

// Animate sections on scroll
function animateSection(section) {
    const sectionId = section.id;
    
    switch(sectionId) {
        case 'about':
            animateAboutSection(section);
            break;
        case 'cta':
            animateCTASection(section);
            break;
        default:
            // Default section animation
            anime({
                targets: section.querySelectorAll('h2, p, .feature-card'),
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                delay: anime.stagger(100),
                easing: 'easeOutQuad'
            });
    }
}

// About section specific animation
function animateAboutSection(section) {
    // Title animation
    anime({
        targets: section.querySelector('h2'),
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Subtitle animation
    anime({
        targets: section.querySelector('p'),
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: 200,
        easing: 'easeOutQuad'
    });
}

// Feature cards animation
function animateFeatureCards(card) {
    anime({
        targets: card,
        opacity: [0, 1],
        translateY: [50, 0],
        rotateY: [15, 0],
        scale: [0.8, 1],
        duration: 800,
        easing: 'easeOutBack'
    });

    // Animate card icon
    anime({
        targets: card.querySelector('.w-16'),
        scale: [0, 1],
        rotate: [180, 0],
        duration: 600,
        delay: 200,
        easing: 'easeOutBack'
    });

    // Animate card content
    anime({
        targets: card.querySelectorAll('h3, p'),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        delay: anime.stagger(100, {start: 300}),
        easing: 'easeOutQuad'
    });
}

// CTA section animation
function animateCTASection(section) {
    anime({
        targets: section.querySelector('.bg-cyber-800\\/30'),
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 800,
        easing: 'easeOutBack'
    });

    anime({
        targets: section.querySelectorAll('h2, p, a'),
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime.stagger(150, {start: 200}),
        easing: 'easeOutQuad'
    });
}

// Hover effects
function initHoverEffects() {
    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.w-16'),
                scale: [1, 1.2],
                rotate: [0, 10],
                duration: 300,
                easing: 'easeOutQuad'
            });

            anime({
                targets: card.querySelector('h3'),
                scale: [1, 1.05],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card.querySelector('.w-16'),
                scale: [1.2, 1],
                rotate: [10, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });

            anime({
                targets: card.querySelector('h3'),
                scale: [1.05, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Button hover effects
    document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: [1, 1.05],
                duration: 200,
                easing: 'easeOutQuad'
            });

            // Ripple effect
            createRippleEffect(button);
        });

        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: [1.05, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });

    // Navigation link hover effects
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                scale: [1, 1.05],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });

        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                scale: [1.05, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
}

// Navigation animations
function initNavigationAnimations() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                anime({
                    targets: mobileMenu,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 300,
                    easing: 'easeOutQuad'
                });

                anime({
                    targets: mobileMenu.querySelectorAll('a'),
                    opacity: [0, 1],
                    translateX: [-20, 0],
                    duration: 200,
                    delay: anime.stagger(50, {start: 100}),
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: mobileMenu,
                    opacity: [1, 0],
                    translateY: [0, -20],
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => {
                        mobileMenu.classList.add('hidden');
                    }
                });
            }
        });
    }

    // Navbar scroll effect
    let lastScrollY = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > lastScrollY && scrollY > 100) {
            // Scrolling down
            anime({
                targets: navbar,
                translateY: [-100, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else if (scrollY < lastScrollY) {
            // Scrolling up
            anime({
                targets: navbar,
                translateY: [0, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        lastScrollY = scrollY;
    });
}

// Page entrance animation
function animatePageEntrance() {
    // Animate navigation
    anime({
        targets: 'nav',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 600,
        easing: 'easeOutQuad'
    });

    // Animate nav items
    anime({
        targets: 'nav .nav-link, nav .bg-gradient-to-r',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 400,
        delay: anime.stagger(100, {start: 200}),
        easing: 'easeOutQuad'
    });
}

// Utility function: Create ripple effect
function createRippleEffect(element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        top: 50%;
        left: 50%;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    anime({
        targets: ripple,
        scale: [0, 4],
        opacity: [0.3, 0],
        duration: 600,
        easing: 'easeOutQuad',
        complete: () => {
            ripple.remove();
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            anime({
                targets: 'html, body',
                scrollTop: target.offsetTop - 80,
                duration: 800,
                easing: 'easeInOutQuad'
            });
        }
    });
});

// Typing animation for text elements
function createTypingAnimation(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Matrix digital rain effect (optional enhancement)
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);

    const chars = '01';
    const columns = Math.floor(window.innerWidth / 20);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        matrixContainer.innerHTML = '';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const drop = document.createElement('div');
            drop.textContent = text;
            drop.style.cssText = `
                position: absolute;
                left: ${i * 20}px;
                top: ${drops[i] * 20}px;
                color: #00f5ff;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                opacity: ${Math.random()};
            `;
            
            matrixContainer.appendChild(drop);
            
            if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Uncomment to enable matrix rain effect
    // setInterval(drawMatrix, 100);
}

// Performance optimization: Reduce animations on low-end devices
function optimizeForPerformance() {
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                           navigator.deviceMemory < 4 ||
                           /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice) {
        // Disable complex animations
        anime.defaults.duration = 200;
        anime.defaults.easing = 'linear';
        
        // Remove particle effects on mobile
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer && window.innerWidth < 768) {
            particlesContainer.style.display = 'none';
        }
    }
}

// Initialize performance optimizations
optimizeForPerformance();