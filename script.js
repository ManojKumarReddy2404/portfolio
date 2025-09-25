document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for name
    const typingText = document.getElementById('typing-text');
    const fullName = 'Manoj Kumar Reddy';
    let currentIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100; // milliseconds

    function typeWriter() {
        if (currentIndex < fullName.length && !isDeleting) {
            // Typing forward
            typingText.textContent = fullName.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeWriter, typeSpeed);
        } else if (currentIndex === fullName.length && !isDeleting) {
            // Pause at the end
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000); // Wait 2 seconds before starting to delete
        } else if (isDeleting && currentIndex > 0) {
            // Deleting backward
            typingText.textContent = fullName.substring(0, currentIndex - 1);
            currentIndex--;
            setTimeout(typeWriter, typeSpeed / 2); // Delete faster than typing
        } else if (isDeleting && currentIndex === 0) {
            // Finished deleting, start over
            isDeleting = false;
            setTimeout(typeWriter, 500); // Brief pause before starting again
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);

    // Personal overlay functionality
    const getToKnowMeBtn = document.getElementById('getToKnowMeBtn');
    const personalOverlay = document.getElementById('personalOverlay');
    const closeOverlayBtn = document.getElementById('closeOverlayBtn');

    if (getToKnowMeBtn && personalOverlay) {
        getToKnowMeBtn.addEventListener('click', () => {
            // Add overlay-open class to body for page slide effect
            document.body.classList.add('overlay-open');
            // Show overlay with slide animation
            personalOverlay.classList.add('active');
        });
    }

    if (closeOverlayBtn && personalOverlay) {
        closeOverlayBtn.addEventListener('click', () => {
            // Remove overlay-open class from body
            document.body.classList.remove('overlay-open');
            // Hide overlay with slide animation
            personalOverlay.classList.remove('active');
        });
    }

    // Close overlay when clicking outside the content area
    if (personalOverlay) {
        personalOverlay.addEventListener('click', (e) => {
            if (e.target === personalOverlay) {
                document.body.classList.remove('overlay-open');
                personalOverlay.classList.remove('active');
            }
        });
    }

    // Close overlay with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && personalOverlay.classList.contains('active')) {
            document.body.classList.remove('overlay-open');
            personalOverlay.classList.remove('active');
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = '#' + section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Run once on load

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .certification, .experience-item, .blog-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animations
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .certification, .experience-item, .blog-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Trigger initial animation check
        animateOnScroll();
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

});
