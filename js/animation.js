/* Run on Loaded*/
const initAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    // GLOBAL REVEAL ANIMATION
    gsap.utils.toArray(".story-image, .story-text, .details-intro, .details-card, .map-toggle, .map-content, .timeline-item, .rsvp-note, .rsvp-box, .gift-image, .gift-text, .faq-card, .reminder-image, .reminder-content, .img-box, .gallery-social-image, .gallery-social-content, .spotify-intro, .spotify-card, .group-heading, .featured-card, .entourage-card, .sponsor-item, .party-column")
        .forEach((element) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.98
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.95,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

    // Staggered Section Titles
    gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title.children, {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });
    });

    // Hero Entrance Animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    })
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
        .from(".hero h2", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".hero h1", { opacity: 0, y: 40, duration: 1, ease: "power3.out" })
        .from(".hero-weds", { opacity: 0, y: 20, duration:  0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-date", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".countdown .time-box", {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.4")
        .from(".countdown-finished", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=1.2");


    // Footer Animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".footer-hero",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    })
    .from(".footer-signature", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".footer-names", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from(".footer-date", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");


    // Image Zoom-on-Scroll
    gsap.utils.toArray("img").forEach((img) => {
        gsap.fromTo(
            img,
            { scale: 1.1 },
            {
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    });


    // Floating Subtle Parallax (Hero)
    gsap.to(".hero-content", {
        y: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}