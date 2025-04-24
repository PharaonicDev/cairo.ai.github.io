// Intersection Observer for scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Form handling with validation and animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Simple form validation
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Animate button during submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.style.opacity = '0.7';
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Success animation
        submitButton.style.backgroundColor = '#4CAF50';
        submitButton.textContent = 'Message Sent!';
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitButton.style.opacity = '1';
            submitButton.style.backgroundColor = '';
            submitButton.textContent = 'Send Message';
        }, 3000);
    });
}

// Parallax effect for background graphics
const parallaxBackground = (e) => {
    const background = document.querySelector('.background-graphics');
    if (background) {
        const speed = 0.05;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        background.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
};

document.addEventListener('mousemove', parallaxBackground);

// Add active class to current section in navigation
const updateActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scroll = window.scrollY;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
};

document.addEventListener('scroll', updateActiveSection);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    document.querySelectorAll('section').forEach(section => {
        animateOnScroll.observe(section);
    });

    // Dynamic background effect
    const backgroundGraphics = document.querySelector('.background-graphics');
    if (backgroundGraphics) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            backgroundGraphics.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Mobile menu functionality with improved accessibility and touch support
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    if (menuToggle && navMenu) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            menuToggle.setAttribute('aria-expanded', isMenuOpen);
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                isMenuOpen = false;
                menuToggle.setAttribute('aria-expanded', false);
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Handle touch events for better mobile experience
        document.addEventListener('touchstart', (e) => {
            if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                isMenuOpen = false;
                menuToggle.setAttribute('aria-expanded', false);
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }, { passive: true });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                menuToggle.setAttribute('aria-expanded', false);
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Add hover effect for vision section
    const visionImage = document.querySelector('.vision-image img');
    if (visionImage) {
        visionImage.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = visionImage.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            visionImage.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        });
        
        visionImage.addEventListener('mouseleave', () => {
            visionImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    }

    // Update footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Fix scroll offset for sticky header
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - headerHeight - 20, // Additional 20px padding
                    behavior: 'smooth'
                });

                // Update active state in navigation
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Add stagger effect to cards
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add observer for scroll animation
        animateOnScroll.observe(card);
        
        // Add hover effect
        card.addEventListener('mouseenter', (e) => {
            const { left, top } = card.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                rgba(255,255,255,0.1), 
                rgba(255,255,255,0.05) 40%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255,255,255,0.05)';
        });
    });

    // Fields section animations
    const fieldCards = document.querySelectorAll('.field-card');
    
    fieldCards.forEach((card, index) => {
        // Add stagger animation delay
        card.style.animationDelay = `${index * 0.15}s`;
        
        // Add intersection observer for scroll animations
        animateOnScroll.observe(card);
        
        // Add interactive hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Tilt effect
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            
            // Dynamic shadow
            card.style.boxShadow = `
                ${(x - 0.5) * 20}px 
                ${(y - 0.5) * 20}px 
                30px rgba(0,0,0,0.15)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Goals section animations
    const goalItems = document.querySelectorAll('.goal-item');
    
    goalItems.forEach((item, index) => {
        // Add stagger animation delay
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Add intersection observer for scroll animations
        animateOnScroll.observe(item);
        
        // Add hover interactions
        item.addEventListener('mouseenter', () => {
            const number = item.querySelector('.goal-number');
            const content = item.querySelector('.goal-content');
            
            number.style.opacity = '1';
            content.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            const number = item.querySelector('.goal-number');
            const content = item.querySelector('.goal-content');
            
            number.style.opacity = '0.5';
            content.style.transform = 'translateX(0)';
        });
    });

    // Animate goal numbers on scroll
    const animateNumbers = () => {
        goalItems.forEach(item => {
            const number = item.querySelector('.goal-number');
            if (item.getBoundingClientRect().top < window.innerHeight * 0.75) {
                number.style.transform = 'translateY(0)';
                number.style.opacity = '0.5';
            }
        });
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(animateNumbers);
    }, { passive: true });

    // Network lines parallax effect
    const networkLines = document.querySelector('.network-lines');
    if (networkLines) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.15;
            networkLines.style.transform = `translate3d(0, ${rate}px, 0)`;
        }, { passive: true });
    }

    // Looking ahead section animations
    const lookingAheadImage = document.querySelector('.looking-ahead-image');
    if (lookingAheadImage) {
        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.15;
            const yPos = -(scrolled * speed);
            lookingAheadImage.style.transform = `translateY(${yPos}px)`;
        }, { passive: true });

        // 3D hover effect
        lookingAheadImage.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = lookingAheadImage.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            lookingAheadImage.style.transform = 
                `perspective(1000px) 
                rotateY(${x * 10}deg) 
                rotateX(${-y * 10}deg)
                scale(1.05)`;
        });
        
        lookingAheadImage.addEventListener('mouseleave', () => {
            lookingAheadImage.style.transform = '';
        });
    }

    // Animate text on scroll
    const lookingAheadTexts = document.querySelectorAll('.looking-ahead-text');
    lookingAheadTexts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'all 0.8s';
        text.style.transitionDelay = `${index * 0.2}s`;
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(text);
    });
});

// Performance optimization for animations
window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            if (scrolled > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}, { passive: true });