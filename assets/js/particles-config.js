// Particles.js Configuration - tuned to avoid large white circles and keep subtle cyber dots
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: { enable: true, value_area: 900 }
            },
            color: { value: ["#00f5ff", "#8a2be2", "#0ea5e9"] },
            shape: {
                type: 'circle',
                stroke: { width: 0, color: '#000' }
            },
            opacity: {
                value: 0.45,
                random: true,
                anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 2.2,
                random: true,
                anim: { enable: true, speed: 1.5, size_min: 0.2, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 120,
                color: '#00f5ff',
                opacity: 0.12,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: ['grab'] },
                onclick: { enable: true, mode: ['push'] },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.25 } },
                bubble: { distance: 120, size: 10, duration: 0.6, opacity: 0.6, speed: 2 },
                repulse: { distance: 120, duration: 0.4 },
                push: { particles_nb: 2 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });

    // Make shooting stars very subtle and less frequent to avoid visible white blobs
    let starTimer = setInterval(createShootingStar, 6000);
    // Optionally clear interval when not needed
    // clearInterval(starTimer);
});

// Subtle Shooting Star Effect (smaller size, softer glow)
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.cssText = `position: fixed; width: 2px; height: 2px; background: linear-gradient(45deg, #00f5ff, rgba(255,255,255,0.2)); border-radius: 50%; z-index: 0; box-shadow: 0 0 6px rgba(0,245,255,0.4); pointer-events: none;`;

    const startX = Math.random() * window.innerWidth;
    const startY = -8;
    const endX = startX + 150 + Math.random() * 200;
    const endY = window.innerHeight + 8;

    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    document.body.appendChild(shootingStar);

    shootingStar.animate([
        { transform: `translate(0, 0) scale(0.4)`, opacity: 0 },
        { transform: `translate(0, 0) scale(1)`, opacity: 1, offset: 0.05 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`, opacity: 0 }
    ], { duration: 1200, easing: 'cubic-bezier(.25,.46,.45,.94)' }).onfinish = () => shootingStar.remove();

    // Short, thin trail
    const trail = document.createElement('div');
    trail.style.cssText = `position: fixed; width: 80px; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,245,255,0.45), transparent); z-index: 0; pointer-events: none; opacity: 0.5;`;
    trail.style.left = (startX - 40) + 'px';
    trail.style.top = startY + 'px';
    trail.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    document.body.appendChild(trail);

    trail.animate([
        { transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad) translate(0,0)`, opacity: 0.0 },
        { transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad) translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
    ], { duration: 1200, easing: 'linear' }).onfinish = () => trail.remove();
}

// Responsive particles count updater
function updateParticlesCount() {
    const width = window.innerWidth;
    let particleCount = 80;
    if (width < 768) particleCount = 40;
    else if (width < 1024) particleCount = 60;

    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.number.value = particleCount;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

window.addEventListener('resize', updateParticlesCount);