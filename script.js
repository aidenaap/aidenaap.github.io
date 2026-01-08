// ===================================
// Portfolio Carousel with Auto-Rotate & Pause on Hover
// ===================================

class PortfolioCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.autoRotateInterval = null;
        this.autoRotateDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        // Set up click handlers for navigation dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause auto-rotate on hover
        if (this.carouselContainer) {
            this.carouselContainer.addEventListener('mouseenter', () => this.pauseAutoRotate());
            this.carouselContainer.addEventListener('mouseleave', () => this.startAutoRotate());
        }

        // Start auto-rotate
        this.startAutoRotate();
    }

    goToSlide(index) {
        if (index === this.currentSlide) return;

        const currentSlide = this.slides[this.currentSlide];
        const nextSlide = this.slides[index];
        const direction = index > this.currentSlide ? 1 : -1;

        // Remove active class from current dot
        this.dots[this.currentSlide].classList.remove('active');

        // Prepare next slide for entry
        nextSlide.style.display = 'block';
        nextSlide.style.transform = `translateX(${direction * 30}px)`;
        nextSlide.style.opacity = '0';

        // Force reflow for smooth transition
        nextSlide.offsetHeight;

        // Animate current slide out
        currentSlide.style.transform = `translateX(${-direction * 30}px)`;
        currentSlide.style.opacity = '0';

        // Animate next slide in
        nextSlide.style.transform = 'translateX(0)';
        nextSlide.style.opacity = '1';

        // Update classes after transition
        setTimeout(() => {
            currentSlide.classList.remove('active');
            currentSlide.style.display = 'none';
            currentSlide.style.transform = '';
            currentSlide.style.opacity = '';

            nextSlide.classList.add('active');
            nextSlide.style.transform = '';
            nextSlide.style.opacity = '';
        }, 600);

        // Update current slide index and dot
        this.currentSlide = index;
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startAutoRotate() {
        this.pauseAutoRotate(); // Clear any existing interval
        this.autoRotateInterval = setInterval(() => this.nextSlide(), this.autoRotateDelay);
    }

    pauseAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }
}

// ===================================
// Modal Functionality
// ===================================

class ModalManager {
    constructor() {
        this.modals = {
            services: document.getElementById('services-modal'),
            blog: document.getElementById('blog-modal')
        };
        this.triggers = document.querySelectorAll('.modal-trigger');
        this.closeButtons = document.querySelectorAll('.modal-close');

        this.init();
    }

    init() {
        // Set up triggers
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalName = trigger.getAttribute('data-modal');
                this.openModal(modalName);
            });
        });

        // Set up close buttons
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Close on background click
        Object.values(this.modals).forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeAllModals();
                    }
                });
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modalName) {
        const modal = this.modals[modalName];
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    closeAllModals() {
        Object.values(this.modals).forEach(modal => {
            if (modal) {
                modal.classList.remove('active');
            }
        });
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ===================================
// Scroll-In Animations (Intersection Observer)
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Unobserve after animation (one-time animation)
                    // observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all elements with animate-on-scroll class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just '#' or modal trigger
            if (href === '#' || this.classList.contains('modal-trigger')) {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScrollTop = scrollTop;
    });
}

// ===================================
// Logo Fallback (Show text if image fails)
// ===================================

function initLogoFallback() {
    const logoImage = document.querySelector('.logo-image');
    const logoText = document.querySelector('.logo-text');

    if (logoImage && logoText) {
        logoImage.addEventListener('error', () => {
            logoImage.style.display = 'none';
            logoText.style.display = 'block';
        });

        // Check if image is already loaded
        if (logoImage.complete && logoImage.naturalHeight === 0) {
            logoImage.style.display = 'none';
            logoText.style.display = 'block';
        }
    }
}

// ===================================
// Performance Optimization - Lazy Loading
// ===================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image is already loaded, just observe for animations
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Initialize All Features on DOM Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    const carousel = new PortfolioCarousel();

    // Initialize modals
    const modalManager = new ModalManager();

    // Initialize scroll animations
    const scrollAnimations = new ScrollAnimations();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize navbar effects
    initNavbarScrollEffect();

    // Initialize logo fallback
    initLogoFallback();

    // Initialize lazy loading
    initLazyLoading();

    // Log for debugging
    console.log('Portfolio site initialized successfully!');
});

// ===================================
// Handle Window Resize (Debounced)
// ===================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle any resize-specific logic here
        console.log('Window resized');
    }, 250);
});
