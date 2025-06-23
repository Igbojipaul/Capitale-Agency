document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // If mobile nav is open, close it
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- Portfolio Category Filtering ---
    const categoryButtons = document.querySelectorAll('.portfolio-categories .category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-grid .portfolio-item');

    if (categoryButtons.length > 0 && portfolioItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const selectedCategory = button.dataset.category;

                portfolioItems.forEach(item => {
                    const itemCategory = item.dataset.category;

                    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                        item.style.display = 'block'; // Or 'flex' if you're using flexbox for grid
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Trigger a click on the 'All' button on page load
        const allButton = document.querySelector('.category-btn[data-category="all"]');
        if (allButton) {
            allButton.click();
        }
    }


    // --- GSAP Animations ---
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance Animation
    gsap.from(".hero-section h1", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
    });
    gsap.from(".hero-section p", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.7
    });
    gsap.from(".hero-section .btn", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, // Animate buttons one after another
        delay: 0.9
    });

    // Optional: Subtle parallax/zoom for background video (if it were a CSS background-image)
    // For the video element, it's typically handled by object-fit: cover and browser behavior
    // If you wanted a subtle transform, you'd target the video element directly.
    // E.g., gsap.to(".video-background video", {
    //     scale: 1.05,
    //     scrollTrigger: {
    //         trigger: ".hero-section",
    //         start: "top top",
    //         end: "bottom top",
    //         scrub: true,
    //     }
    // });


    // Scroll-Triggered Section Reveals
    // General animation for all sections except hero (they start hidden)
    gsap.utils.toArray(".section-padding").forEach(section => {
        // Skip hero section if it's included in .section-padding
        if (section.id === "hero") return;

        // Animate elements within each section
        gsap.from(section.querySelectorAll("h2, p, .about-content, .services-grid, .portfolio-grid, .team-grid, .contact-content"), {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1, // Stagger animation for multiple elements within a section
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // When 80% of the section is in view
                end: "bottom top", // Until the section leaves the viewport
                toggleActions: "play none none reverse", // Play on enter, reverse on leave
                // markers: true, // Uncomment for debugging scroll triggers
            }
        });
    });

    // Specific animation for individual items within grids (e.g., service cards, portfolio items, team members)
    // This provides a nicer staggered effect than animating the whole grid at once.
    gsap.utils.toArray(".service-item, .portfolio-item, .team-member").forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%", // When 90% of the item is in view
                toggleActions: "play none none reverse",
                // markers: true,
            }
        });
    });


    // Optional: Header shrink/background change on scroll
    const header = document.getElementById('header');
    if (header) {
        gsap.to(header, {
            backgroundColor: "var(--color-dark)", // Change background to dark
            paddingTop: "10px",
            paddingBottom: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: "body",
                start: "top -100px", // When scrolled down 100px
                end: "top -150px",
                scrub: true, // Smoothly animate over scroll
                toggleActions: "play none none reverse",
            }
        });

        // Change logo color on header shrink
        gsap.to(".logo", {
            color: "var(--color-white)", // Change logo color to primary
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: "body",
                start: "top -100px",
                end: "top -150px",
                scrub: true,
                toggleActions: "play none none reverse",
            }
        });

        // Change logo color on header shrink

        gsap.to(".nav-toggle span", {
            backgroundColor: "var(--color-white)", // Change logo color to primary
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: "body",
                start: "top -80px",
                end: "top -150px",
                scrub: true,
                toggleActions: "play none none reverse",
            }
        });


        // Change nav link color on header shrink
        gsap.to(".nav-links a", {
            color: "var(--color-light)", // Change nav link color to light
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: "body",
                start: "top -100px",
                end: "top -150px",
                scrub: true,
                toggleActions: "play none none reverse",
            }
        });
    }
    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
        const tg = parseInt(counter.getAttribute("data-target"))
        const duration = 3
        gsap.fromTo(counter, { innerText: 0 }, { innerText: tg, duration: duration, ease: "power1.out", snap: { innerText: 1 }, scrollTrigger: { trigger: counter, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse", once: true, } })
    })

}); // End DOMContentLoaded