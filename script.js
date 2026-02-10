const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isClicking = false;

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (!href.startsWith('#')) {
            return; 
        }
        
        e.preventDefault();
        isClicking = true;
        setTimeout(() => (isClicking = false), 1000);

        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');

        updateActiveLink(link);

        const targetSection = document.querySelector(href);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

    const setActiveLink = () => {
        if (isClicking) return;

        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const updateActiveLink = (clickedLink) => {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});

if (!isMobile) {
    document.addEventListener('DOMContentLoaded', function() {
        const img = document.querySelector('.image-container img');
        
        if (!img) return;

        let lastScrollTop = 0;
        let ticking = false;
        const MIN_TRANSLATE = -99;
        const MAX_TRANSLATE = 99;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollDirection = scrolled > lastScrollTop ? 1 : -1;
                    const scrollDistance = Math.abs(scrolled - lastScrollTop);
                    let parallaxValue = scrolled * 0.1;

                    parallaxValue = Math.max(MIN_TRANSLATE, Math.min(MAX_TRANSLATE, parallaxValue));
                    const smoothValue = Math.min(scrollDistance * 0.1, 15) * scrollDirection;

                    img.style.transform = `translateY(${parallaxValue}px) scale(${1 + Math.abs(smoothValue) * 0.001})`;

                    lastScrollTop = scrolled;
                    ticking = false;
                });

                ticking = true;
            }
        });
    });
}
if (!isMobile) {
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.partner-logo-item');
        if (cards.length === 0) return;

        let mouseX = 0;
        let mouseY = 0;
        const positions = [];

        cards.forEach(() => positions.push({ x: 0, y: 0 }));

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const maxDistance = 400;
        const lerpFactor = 0.15;

        const update = () => {
            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const deltaX = mouseX - cardCenterX;
                const deltaY = mouseY - cardCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                let targetX = 0;
                let targetY = 0;

                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    targetX = (deltaX / distance) * strength * 15;
                    targetY = (deltaY / distance) * strength * 15;
                }

                positions[i].x += (targetX - positions[i].x) * lerpFactor;
                positions[i].y += (targetY - positions[i].y) * lerpFactor;

                card.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
            });

            requestAnimationFrame(update);
        };

        update();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = isMobile ? 1000 : 1500; 
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + (target > 10 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target > 10 ? '+' : '');
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: isMobile ? 0.3 : 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (counter.textContent === '0') {
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.trust-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

if (!isMobile) {
    document.addEventListener('DOMContentLoaded', function() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const moveX = (x - centerX) / centerX * 10;
                const moveY = (y - centerY) / centerY * 10;

                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = 'translate(0, 0)';
            });
        });
    });
}

function downloadCV() {
    const link = document.createElement('a');
    link.href = './Achille_Zouaoui_Product_Designer.pdf';
    link.download = 'Achille_Zouaoui_Product_Designer.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

if (isMobile) {
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: transparent;
            }
            .partner-logo-item,
            .project-card {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    });
    }


function downloadPortfolio() {
    const link = document.createElement('a');
    link.href = './Achille_Zouaoui_Portfolio.pdf';
    link.download = 'Achille_Zouaoui_Portfolio.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

if (isMobile) {
    document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-tap-highlight-color: transparent;
            }
            .partner-logo-item,
            .project-card {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    });

    
}

document.addEventListener("DOMContentLoaded", () => {
    const home = document.querySelector(".home");
    if (!home) return;

    const canvas = home.querySelector("canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let mouseMoved = false;

    const pointer = {
        x: home.clientWidth * 0.5,
        y: home.clientHeight * 0.5
    };

    const params = {
        pointsNumber: 40,
        widthFactor: 0.05,
        spring: 0.4,
        friction: 0.5
    };

    const trail = Array.from({ length: params.pointsNumber }, () => ({
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0
    }));

    function updateMousePosition(x, y) {
        const rect = home.getBoundingClientRect();
        pointer.x = x - rect.left;
        pointer.y = y - rect.top;
    }

    home.addEventListener("mousemove", e => {
        mouseMoved = true;
        updateMousePosition(e.clientX, e.clientY);
    });

    home.addEventListener("touchmove", e => {
        mouseMoved = true;
        const t = e.targetTouches[0];
        updateMousePosition(t.clientX, t.clientY);
    }, { passive: true });

    function setupCanvas() {
        canvas.width = home.clientWidth;
        canvas.height = home.clientHeight;
    }

    function update(t) {
        if (!mouseMoved) {
            pointer.x = (0.2 + 0.1 * Math.cos(0.002 * t)) * canvas.width;
            pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t)) * canvas.height;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        trail.forEach((p, i) => {
            const prev = i === 0 ? pointer : trail[i - 1];
            const spring = i === 0 ? params.spring * 0.4 : params.spring;

            p.dx += (prev.x - p.x) * spring;
            p.dy += (prev.y - p.y) * spring;
            p.dx *= params.friction;
            p.dy *= params.friction;
            p.x += p.dx;
            p.y += p.dy;
        });

        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);

        for (let i = 1; i < trail.length - 1; i++) {
            const xc = (trail[i].x + trail[i + 1].x) * 0.5;
            const yc = (trail[i].y + trail[i + 1].y) * 0.5;
            ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
            ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
            ctx.stroke();
            ctx.strokeStyle = "#03045E";
            

        }

        ctx.lineTo(trail.at(-1).x, trail.at(-1).y);
        ctx.stroke();

        requestAnimationFrame(update);
    }

    window.addEventListener("resize", setupCanvas);

    setupCanvas();
    requestAnimationFrame(update);
});

