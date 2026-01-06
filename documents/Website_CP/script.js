/**
 * Grand Hudson Website JavaScript
 * Handles interactivity: mobile menu, hero slider, smooth scroll, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Consent Modal
    // ========================================
    const consentModal = document.getElementById('consentModal');
    const consentAgreeBtn = document.getElementById('consentAgreeBtn');
    const consentRoleBtns = document.querySelectorAll('.consent-role-btn');

    // Check if user has already consented
    function checkConsent() {
        const hasConsented = localStorage.getItem('cpFinancialConsent');
        if (hasConsented) {
            if (consentModal) {
                consentModal.classList.add('hidden');
            }
        } else {
            if (consentModal) {
                consentModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }
    }

    // Handle consent agreement
    if (consentAgreeBtn) {
        consentAgreeBtn.addEventListener('click', function() {
            const location = document.getElementById('consentLocation')?.value || 'HK';
            const activeRole = document.querySelector('.consent-role-btn.active');
            const role = activeRole ? activeRole.dataset.role : 'individual';

            // Save consent with timestamp
            const consentData = {
                consented: true,
                location: location,
                role: role,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('cpFinancialConsent', JSON.stringify(consentData));

            // Hide modal
            consentModal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    // Handle role button toggle
    consentRoleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            consentRoleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Check consent on page load
    checkConsent();

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
        });
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Hero Slider
    // ========================================
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Auto-advance slides
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlider();
            goToSlide(index);
            startSlider();
        });
    });

    // Start slider if there are slides
    if (slides.length > 1) {
        startSlider();
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href.length <= 1) return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll(
        '.need-card, .product-card, .news-card, .badge, .credibility-list li'
    );

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealOnScroll.observe(el);
    });

    // ========================================
    // Language Toggle
    // ========================================
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // In a real implementation, this would trigger language change
            const lang = this.textContent === 'EN' ? 'en' : 'zh-hant';
            console.log(`Language switched to: ${lang}`);
        });
    });

    // ========================================
    // Form Validation (for future forms)
    // ========================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        return re.test(phone);
    }

    // Export validation functions for potential form usage
    window.CPFinancial = {
        validateEmail,
        validatePhone
    };

    // ========================================
    // Add CSS for reveal animations
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-links.mobile-open {
            display: flex !important;
            position: fixed;
            top: var(--header-height, 80px);
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            z-index: 999;
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .header.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // FAQ Accordion (Legacy)
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
            });

            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // ========================================
    // FAQ Accordion (Modern)
    // ========================================
    const faqItemsModern = document.querySelectorAll('.faq-item-modern');

    faqItemsModern.forEach(item => {
        const question = item.querySelector('.faq-question-modern');

        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all other items
                faqItemsModern.forEach(otherItem => {
                    otherItem.classList.remove('open');
                });

                // Toggle current item
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // ========================================
    // FAQ Category Tabs (Legacy)
    // ========================================
    const faqTabs = document.querySelectorAll('.faq-tab');

    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            faqTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // In a real implementation, this would filter FAQ items by category
            const category = tab.dataset.category;
            console.log(`FAQ category: ${category}`);
        });
    });

    // ========================================
    // FAQ Category Tabs (Modern)
    // ========================================
    const faqTabsModern = document.querySelectorAll('.faq-tab-modern');

    faqTabsModern.forEach(tab => {
        tab.addEventListener('click', () => {
            faqTabsModern.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // In a real implementation, this would filter FAQ items by category
            const category = tab.dataset.category;
            console.log(`FAQ category: ${category}`);
        });
    });

    // ========================================
    // Product Category Tabs
    // ========================================
    const categoryTabs = document.querySelectorAll('.tab-btn');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            // Scroll to the corresponding section
            if (category && category !== 'all') {
                const targetSection = document.getElementById(category);
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (category === 'all') {
                // Scroll to top of products section
                const firstSection = document.querySelector('.content-section:not(.page-hero)');
                if (firstSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = firstSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Blog Filter
    // ========================================
    const blogFilters = document.querySelectorAll('.filter-btn');

    blogFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            blogFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            // In a real implementation, this would filter blog posts
            const category = filter.dataset.category;
            console.log(`Blog filter: ${category}`);
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            // Validate email format
            if (data.email && !window.CPFinancial.validateEmail(data.email)) {
                document.getElementById('email').classList.add('error');
                isValid = false;
            }

            // Check privacy checkbox
            if (!data.privacy) {
                isValid = false;
                alert('Please agree to the Privacy Policy to continue.');
                return;
            }

            if (isValid) {
                // In a real implementation, this would submit to a server
                console.log('Form submitted:', data);
                alert('Thank you for your message! We will get back to you within 1 business day.');
                this.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (window.CPFinancial.validateEmail(email)) {
                console.log('Newsletter signup:', email);
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // ========================================
    // Pagination
    // ========================================
    const pageButtons = document.querySelectorAll('.page-btn:not(.next)');

    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // In a real implementation, this would load new content
            console.log('Page:', btn.textContent);
        });
    });

    // ========================================
    // Extended Scroll Reveal for New Pages
    // ========================================
    const additionalRevealElements = document.querySelectorAll(
        '.value-card, .team-card, .award-card, .support-card, .service-card, ' +
        '.product-detail-card, .branch-card, .blog-card, .form-download, .step, ' +
        '.support-card-modern, .service-card-modern, .faq-item-modern, .step-modern, ' +
        '.form-card-modern, .info-card-modern'
    );

    additionalRevealElements.forEach(el => {
        el.classList.add('reveal-element');
        revealOnScroll.observe(el);
    });

    // ========================================
    // Form Input Styling
    // ========================================
    const formInputStyle = document.createElement('style');
    formInputStyle.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c;
            background-color: #fdf2f2;
        }

        .form-group input:focus.error,
        .form-group select:focus.error,
        .form-group textarea:focus.error {
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
    `;
    document.head.appendChild(formInputStyle);

    // ========================================
    // Aspirations Tabs (Solutions Page)
    // ========================================
    const aspirationTabs = document.querySelectorAll('.aspiration-tab');
    const aspirationPanels = document.querySelectorAll('.aspiration-panel');

    aspirationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Update active tab
            aspirationTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            aspirationPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ========================================
    // Console welcome message
    // ========================================
    console.log('%cGrand Hudson', 'color: #D4A02E; font-size: 24px; font-weight: bold;');
    console.log('%cYour Trusted Partner for Wealth Management', 'color: #FF8C00; font-size: 14px;');
});
