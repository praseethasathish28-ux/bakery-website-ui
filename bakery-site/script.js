// BAKE THEORY - PREMIUM ARTISAN INTERACTIVITY

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BOUTIQUE STUDIO MOBILE NAV
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. HEADER & HERO PARALLAX SCROLL EFFECT
    const header = document.getElementById('header');
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    const heroItem = document.querySelector('.hero-item');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Header Style
        if (scrolled > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Artisan Parallax
        if (scrolled < window.innerHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.6));
            }
            if (heroBg) {
                heroBg.style.transform = `scale(${1.1 + (scrolled * 0.0003)}) translateY(${scrolled * 0.1}px)`;
            }
            if (heroItem) {
                heroItem.style.transform = `translateY(${-scrolled * 0.2}px)`;
                heroItem.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        }
    });

    // 3. REVEAL ON SCROLL (WITH STAGGERED GRID SUPPORT)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Auto-stagger grid items for a premium entrance
    document.querySelectorAll('.grid-menu, .grid').forEach(grid => {
        const items = grid.querySelectorAll('[data-reveal]');
        items.forEach((item, index) => {
            if (!item.dataset.delay) {
                item.dataset.delay = index * 100; // 100ms stagger per item
            }
        });
    });

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. SMOOTH SCROLLING FOR INTERNAL LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 6. DYNAMIC HERO GALLERY ENGINE
    const heroImage = document.getElementById('heroImage');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    const dotsContainer = document.getElementById('galleryDots');

    const artisanCakes = [
        { src: 'images/artisan-slice-box.jpg', alt: 'Signature Artisan Slice Box' },
        { src: 'images/choco-truffle.jpg', alt: 'Rich Belgian Choco Truffle' },
        { src: 'images/black-forest.jpg', alt: 'Artisan Black Forest' },
        { src: 'images/rosemilk.jpg', alt: 'Rosemilk Pistachio Fusion' },
        { src: 'images/mango.jpg', alt: 'Tropical Mango Cream' }
    ];

    let currentIndex = 0;
    let autoTimer;

    const updateGallery = (index) => {
        if (!heroImage) return;
        
        // Phase 1: Fade out
        heroImage.classList.add('switching');
        
        setTimeout(() => {
            // Phase 2: Update content
            currentIndex = index;
            heroImage.src = artisanCakes[currentIndex].src;
            heroImage.alt = artisanCakes[currentIndex].alt;
            
            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            // Phase 3: Fade in
            heroImage.classList.remove('switching');
        }, 800); // Matches transition duration in CSS
    };

    const nextSlide = () => {
        let index = (currentIndex + 1) % artisanCakes.length;
        updateGallery(index);
        resetTimer();
    };

    const prevSlide = () => {
        let index = (currentIndex - 1 + artisanCakes.length) % artisanCakes.length;
        updateGallery(index);
        resetTimer();
    };

    const resetTimer = () => {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 7000);
    };

    if (heroImage && prevBtn && nextBtn) {
        // Create Dots
        artisanCakes.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => updateGallery(i));
            dotsContainer.appendChild(dot);
        });

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        resetTimer();
    }
});