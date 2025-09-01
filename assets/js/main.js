// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initMobileMenu();
    initScrollEffects();
    initInteractiveElements();
    initFormValidation();
    initLazyLoading();
    initAccessibility();
    initPerformanceOptimizations();
    
    // Console easter egg
    // Welcome banner removed for production
    // Mobile menu initialization
    if (typeof window !== 'undefined' && document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMobileMenu);
    } else {
        initializeMobileMenu();
    }
}

// Mobile menu functionality - BULLETPROOF VERSION
function initMobileMenu() {
    // Try multiple ways to find the mobile menu button
    let mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (!mobileMenuBtn) {
        // Fallback: try finding by class
        mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    }
    if (!mobileMenuBtn) {
        // Fallback: try finding any button with mobile menu text or icon
        mobileMenuBtn = document.querySelector('button[aria-controls="mobile-menu"]');
    }
    if (!mobileMenuBtn) {
        // Fallback: try data attributes
        mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
    }
    
    // Try multiple ways to find the mobile menu
    let mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) {
        // Fallback: try finding by class
        mobileMenu = document.querySelector('.mobile-menu');
    }
    if (!mobileMenu) {
        // Fallback: try data attributes
        mobileMenu = document.querySelector('[data-mobile-menu]');
    }
    
    // Check if elements exist
    if (!mobileMenuBtn) {
        // Mobile menu button not found on this page
        return;
    }
    
    if (!mobileMenu) {
        // Mobile menu not found on this page
        return;
    }

    // Remove any existing listeners to prevent duplicates
    const newBtn = mobileMenuBtn.cloneNode(true);
    mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
    mobileMenuBtn = newBtn;

        // Add the click listener
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle menu visibility
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('opacity-100', 'scale-100');
            mobileMenu.classList.remove('opacity-0', 'scale-95');
        } else {
            mobileMenu.classList.add('opacity-0', 'scale-95');
            mobileMenu.classList.remove('opacity-100', 'scale-100');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 150);
        }
        
        // Update icon
        updateMenuIcon(mobileMenuBtn, !isHidden);
    });

    // Close menu when clicking on navigation links
    const menuLinks = mobileMenu.querySelectorAll('a');
    
    menuLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.style.display = 'none';
            updateMenuIcon(mobileMenuBtn, false);
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Ensure menu starts hidden
    mobileMenu.classList.add('hidden');
    updateMenuIcon(mobileMenuBtn, false);
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

// Helper function to update menu icon
function updateMenuIcon(button, isOpen) {
    const hamburgerIcon = button.querySelector('.hamburger-icon');
    const closeIcon = button.querySelector('.close-icon');
    
    if (hamburgerIcon && closeIcon) {
        // Dual icon system
        if (isOpen) {
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    } else {
        // Single icon system - change SVG content
        const svg = button.querySelector('svg');
        if (svg) {
            if (isOpen) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }
    }
}

// Scroll effects
function initScrollEffects() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('nav');
    const scrollIndicator = createScrollIndicator();
    
    window.addEventListener('scroll', throttle(function() {
        const scrollY = window.scrollY;
        
        // Navbar hide/show on scroll
        if (scrollY > 100) {
            if (scrollY > lastScrollY) {
                // Scrolling down - hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up - show navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Update navbar background opacity
        const opacity = Math.min(scrollY / 100, 0.95);
        navbar.style.backgroundColor = `rgba(15, 23, 42, ${opacity})`;
        
        // Update scroll indicator
        updateScrollIndicator(scrollIndicator);
        
        // Parallax effect for hero section
        const hero = document.getElementById('hero');
        if (hero && scrollY < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        lastScrollY = scrollY;
    }, 16));
}

// Create scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00f5ff, #8a2be2);
        z-index: 9999;
        transition: width 0.3s ease;
        width: 0%;
    `;
    document.body.appendChild(indicator);
    return indicator;
}

// Update scroll indicator
function updateScrollIndicator(indicator) {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    indicator.style.width = `${scrollPercent}%`;
}

// Interactive elements
function initInteractiveElements() {
    // Add cyber glitch effect to titles
    document.querySelectorAll('h1, h2').forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.classList.add('cyber-text');
            setTimeout(() => {
                this.classList.remove('cyber-text');
            }, 500);
        });
    });
    
    // Add hover sound effect (optional)
    if (window.AudioContext || window.webkitAudioContext) {
        initHoverSounds();
    }
    
    // Copy email functionality
    initCopyEmail();
    
    // Social media hover effects
    initSocialEffects();
}

// Hover sound effects
function initHoverSounds() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playHoverSound(frequency = 800, duration = 100) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add sound to buttons (optional - can be disabled)
    document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
        button.addEventListener('mouseenter', () => {
            // playHoverSound(1000, 50);
        });
    });
}

// Copy email functionality
function initCopyEmail() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!', 'success');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email copied to clipboard!', 'success');
            }
        });
    });
}

// Social media effects
function initSocialEffects() {
    document.querySelectorAll('footer a[href*="facebook"], footer a[href*="twitter"], footer a[href*="linkedin"], footer a[href*="instagram"]').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.filter = 'drop-shadow(0 0 10px #00f5ff)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'none';
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Validate form
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';
    
    // Required field check
    if (field.required && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
        }
    }
    
    // Password validation
    else if (type === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            message = 'Password must be at least 8 characters long';
        }
    }
    
    showFieldValidation(field, isValid, message);
    return isValid;
}

// Show field validation
function showFieldValidation(field, isValid, message) {
    clearFieldError(field);
    
    if (!isValid) {
        field.classList.add('border-red-500');
        field.classList.remove('border-cyan-500');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-400 text-sm mt-1';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    } else {
        field.classList.add('border-cyan-500');
        field.classList.remove('border-red-500');
    }
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('border-red-500');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        imageObserver.observe(img);
    });
}

// Accessibility improvements
function initAccessibility() {
    // Focus management for mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        mobileMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Trap focus within mobile menu when open
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && !mobileMenu.classList.contains('hidden')) {
                trapFocus(e, focusableElements);
            }
        });
    }
    
    // Skip to content link
    addSkipToContentLink();
    
    // Announce page changes for screen readers
    announcePageChange();
}

// Trap focus within element
function trapFocus(e, focusableElements) {
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
}

// Add skip to content link
function addSkipToContentLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-neon-blue text-cyber-900 px-4 py-2 rounded z-50';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('#hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Announce page change
function announcePageChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.id = 'page-announcement';
    document.body.appendChild(announcement);
    
    // Announce when sections come into view
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('h1, h2, h3');
                if (sectionTitle) {
                    announcement.textContent = `Now viewing: ${sectionTitle.textContent}`;
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize images
    optimizeImages();
    
    // Service worker registration (if available)
    registerServiceWorker();
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        'assets/css/style.css',
        'assets/js/animations.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading attribute
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add proper alt attributes for accessibility
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', '');
        }
    });
}

// Register service worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    // ServiceWorker registration successful
                })
                .catch(function(err) {
                    // ServiceWorker registration failed
                });
        });
    }
}

// Utility functions
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Show notification
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-display font-medium transition-all duration-300 transform translate-x-full`;
    
    // Style based on type
    switch (type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-cyber-900';
            break;
        default:
            notification.className += ' bg-neon-blue text-cyber-900';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Export functions for use in other scripts
window.FalconsApp = {
    showNotification,
    validateForm,
    throttle,
    debounce
};