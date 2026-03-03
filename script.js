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
// Mobile Slide-Out Menu
// ===================================

class MobileMenu {
    constructor() {
        this.hamburgerBtn = document.querySelector('.hamburger-btn');
        this.menu = document.querySelector('.mobile-menu');
        this.overlay = document.querySelector('.mobile-menu-overlay');
        this.closeBtn = document.querySelector('.mobile-menu-close');
        this.navLinks = document.querySelectorAll('.mobile-nav-link');

        if (!this.hamburgerBtn || !this.menu) return;
        this.init();
    }

    init() {
        // Open menu
        this.hamburgerBtn.addEventListener('click', () => this.toggle());

        // Close via X button
        this.closeBtn.addEventListener('click', () => this.close());

        // Close via overlay tap
        this.overlay.addEventListener('click', () => this.close());

        // Close when a nav link is tapped (smooth scroll links)
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Small delay so the scroll target registers before the menu hides
                if (!link.classList.contains('modal-trigger')) {
                    setTimeout(() => this.close(), 150);
                } else {
                    this.close();
                }
            });
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) this.close();
        });
    }

    isOpen() {
        return this.menu.classList.contains('open');
    }

    toggle() {
        this.isOpen() ? this.close() : this.open();
    }

    open() {
        this.menu.classList.add('open');
        this.overlay.classList.add('visible');
        this.hamburgerBtn.classList.add('open');
        this.hamburgerBtn.setAttribute('aria-expanded', 'true');
        this.menu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.menu.classList.remove('open');
        this.overlay.classList.remove('visible');
        this.hamburgerBtn.classList.remove('open');
        this.hamburgerBtn.setAttribute('aria-expanded', 'false');
        this.menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ===================================
// Skill Accordion (collapsible on mobile)
// ===================================

class SkillAccordion {
    constructor() {
        this.toggles = document.querySelectorAll('.skill-accordion-toggle');
        this.mobileBreakpoint = 768;

        if (!this.toggles.length) return;
        this.init();
    }

    init() {
        this.toggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.handleToggle(toggle));
        });

        // Set initial state based on viewport
        this.setInitialState();

        // Re-evaluate when window is resized across the breakpoint
        window.addEventListener('resize', () => this.setInitialState());
    }

    /** On desktop (>768 px) all panels stay open; on mobile they start collapsed. */
    setInitialState() {
        const isMobile = window.innerWidth <= this.mobileBreakpoint;

        this.toggles.forEach(toggle => {
            const body = toggle.nextElementSibling;
            if (isMobile) {
                // Collapse all on first load at mobile size
                if (!this._initialised) {
                    body.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            } else {
                // Desktop — always expanded, accordion clicks are no-ops visually
                body.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        this._initialised = true;
    }

    handleToggle(toggle) {
        // Only allow toggling at mobile widths
        if (window.innerWidth > this.mobileBreakpoint) return;

        const body = toggle.nextElementSibling;
        const isOpen = body.classList.contains('open');

        if (isOpen) {
            body.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            body.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    }
}

// ===================================
// Experience Horizontal Carousel (mobile)
// ===================================

class ExperienceCarousel {
    constructor() {
        this.items = Array.from(document.querySelectorAll('.timeline-item'));
        this.dots  = Array.from(document.querySelectorAll('.htimeline-dot'));
        this.progress = document.querySelector('.htimeline-progress');
        this.timeline = document.querySelector('.timeline');
        this.breakpoint = 768;
        this.current = 0;
        this.isAnimating = false;

        // Touch tracking
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchDeltaX = 0;
        this.swipeThreshold = 50;

        if (!this.items.length || !this.timeline) return;
        this.init();
    }

    init() {
        // Dot click navigation
        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.goTo(i));
        });

        // Touch events on the timeline container
        this.timeline.addEventListener('touchstart',  (e) => this.onTouchStart(e), { passive: true });
        this.timeline.addEventListener('touchmove',   (e) => this.onTouchMove(e),  { passive: false });
        this.timeline.addEventListener('touchend',    (e) => this.onTouchEnd(e),    { passive: true });

        // Set initial state
        this.applyViewport();
        window.addEventListener('resize', () => this.applyViewport());
    }

    /** Activate / deactivate based on viewport width */
    applyViewport() {
        const isMobile = window.innerWidth <= this.breakpoint;

        if (isMobile) {
            this.items.forEach((item, i) => {
                item.classList.remove('animate-on-scroll', 'visible');
                item.classList.remove('exp-active', 'exp-exit-left');
                if (i === this.current) item.classList.add('exp-active');
            });
            this.updateDots();
            this.updateProgress();
        } else {
            this.items.forEach(item => {
                item.classList.remove('exp-active', 'exp-exit-left');
                item.classList.add('animate-on-scroll');
            });
            this.dots.forEach(d => d.classList.remove('active'));
        }
    }

    goTo(index) {
        if (index === this.current || this.isAnimating) return;
        if (index < 0 || index >= this.items.length) return;
        if (window.innerWidth > this.breakpoint) return;

        this.isAnimating = true;
        const direction = index > this.current ? 1 : -1;
        const outgoing  = this.items[this.current];
        const incoming  = this.items[index];

        // Position incoming off-screen on the correct side
        incoming.style.transition = 'none';
        incoming.style.transform  = `translateX(${direction * 80}px)`;
        incoming.style.opacity    = '0';
        incoming.classList.add('exp-active');

        // Force reflow
        incoming.offsetHeight;

        // Re-enable transitions
        incoming.style.transition = '';

        // Animate outgoing away
        outgoing.style.transform = `translateX(${-direction * 80}px)`;
        outgoing.style.opacity   = '0';

        // Animate incoming in
        incoming.style.transform = 'translateX(0)';
        incoming.style.opacity   = '1';

        setTimeout(() => {
            outgoing.classList.remove('exp-active', 'exp-exit-left');
            outgoing.style.transform = '';
            outgoing.style.opacity   = '';

            incoming.style.transform = '';
            incoming.style.opacity   = '';

            this.current = index;
            this.updateDots();
            this.updateProgress();
            this.isAnimating = false;
        }, 460);
    }

    updateDots() {
        this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
    }

    updateProgress() {
        if (!this.progress) return;
        const pct = this.items.length > 1
            ? (this.current / (this.items.length - 1)) * 80
            : 0;
        this.progress.style.width = `${pct}%`;
    }

    /* ---- Touch handlers ---- */

    onTouchStart(e) {
        if (window.innerWidth > this.breakpoint) return;
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.touchDeltaX = 0;
    }

    onTouchMove(e) {
        if (window.innerWidth > this.breakpoint) return;
        this.touchDeltaX = e.touches[0].clientX - this.touchStartX;
        const deltaY = Math.abs(e.touches[0].clientY - this.touchStartY);

        if (Math.abs(this.touchDeltaX) > deltaY && Math.abs(this.touchDeltaX) > 10) {
            e.preventDefault();
        }
    }

    onTouchEnd() {
        if (window.innerWidth > this.breakpoint) return;
        if (this.touchDeltaX > this.swipeThreshold) {
            this.goTo(this.current - 1);
        } else if (this.touchDeltaX < -this.swipeThreshold) {
            this.goTo(this.current + 1);
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
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalName = trigger.getAttribute('data-modal');
                this.openModal(modalName);
            });
        });

        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        Object.values(this.modals).forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeAllModals();
                    }
                });
            }
        });

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
            document.body.style.overflow = 'hidden';
        }
    }

    closeAllModals() {
        Object.values(this.modals).forEach(modal => {
            if (modal) {
                modal.classList.remove('active');
            }
        });
        document.body.style.overflow = '';
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

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
// Navbar Scroll Effect (shadow + color swap)
// ===================================

function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');
    let lastScrollTop = 0;

    if (!navbar || !heroSection) return;

    // Use IntersectionObserver to detect when the hero leaves the viewport.
    // When the hero's bottom edge crosses the top of the viewport the navbar
    // swaps to the cream "scrolled" palette.
    const heroObserver = new IntersectionObserver(
        ([entry]) => {
            // entry.isIntersecting is true while any part of the hero is visible
            if (entry.isIntersecting) {
                navbar.classList.remove('scrolled');
            } else {
                navbar.classList.add('scrolled');
            }
        },
        {
            // trigger as soon as even 1 px of the hero disappears / reappears
            threshold: 0,
            rootMargin: '0px 0px 0px 0px'
        }
    );

    heroObserver.observe(heroSection);

    // Keep the existing box-shadow intensity tweak on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar.classList.contains('scrolled')) {
            // Lighter shadow on cream background
            navbar.style.boxShadow = scrollTop > 50
                ? '0 2px 20px rgba(0, 0, 0, 0.12)'
                : '0 2px 10px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = scrollTop > 50
                ? '0 2px 20px rgba(0, 0, 0, 0.5)'
                : '0 2px 20px rgba(0, 0, 0, 0.3)';
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
    const carousel = new PortfolioCarousel();
    const mobileMenu = new MobileMenu();
    const skillAccordion = new SkillAccordion();
    const experienceCarousel = new ExperienceCarousel();
    const modalManager = new ModalManager();
    const scrollAnimations = new ScrollAnimations();

    initSmoothScrolling();
    initNavbarScrollEffect();
    initLogoFallback();
    initLazyLoading();

    console.log('Portfolio site initialized successfully!');
});

// ===================================
// Handle Window Resize (Debounced)
// ===================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized');
    }, 250);
});