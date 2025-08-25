// Particles.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 150,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#00f5ff", "#8a2be2", "#0ea5e9", "#6366f1"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.6,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f5ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Add shooting stars effect
    setInterval(createShootingStar, 3000);
});

// Shooting Star Effect
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #00f5ff, #ffffff);
        border-radius: 50%;
        z-index: 1;
        box-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff;
        pointer-events: none;
    `;
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = -10;
    const endX = startX + 200 + Math.random() * 300;
    const endY = window.innerHeight + 10;
    
    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    
    document.body.appendChild(shootingStar);
    
    // Animate the shooting star
    shootingStar.animate([
        { transform: `translate(0, 0) scale(0)`, opacity: 0 },
        { transform: `translate(0, 0) scale(1)`, opacity: 1, offset: 0.1 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        shootingStar.remove();
    };
    
    // Add trail effect
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 100px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #00f5ff, transparent);
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
        opacity: 0.7;
    `;
    
    trail.style.left = (startX - 50) + 'px';
    trail.style.top = startY + 'px';
    trail.style.transform = `rotate(${Math.atan2(endY - startY, endX - startX)}rad)`;
    
    document.body.appendChild(trail);
    
    trail.animate([
        { transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad) translate(0, 0)`, opacity: 0 },
        { transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad) translate(0, 0)`, opacity: 0.7, offset: 0.1 },
        { transform: `rotate(${Math.atan2(endY - startY, endX - startX)}rad) translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        trail.remove();
    };
}

// Responsive particles
function updateParticlesCount() {
    const width = window.innerWidth;
    let particleCount = 150;
    
    if (width < 768) {
        particleCount = 80;
    } else if (width < 1024) {
        particleCount = 120;
    }
    
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.number.value = particleCount;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

window.addEventListener('resize', updateParticlesCount);

// Cyber glitch effect for special occasions
function triggerCyberGlitch() {
    const glitchOverlay = document.createElement('div');
    glitchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 49%, #ff1493 50%, transparent 51%);
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        mix-blend-mode: multiply;
    `;
    
    document.body.appendChild(glitchOverlay);
    
    glitchOverlay.animate([
        { opacity: 0, transform: 'translateX(0)' },
        { opacity: 0.3, transform: 'translateX(2px)' },
        { opacity: 0, transform: 'translateX(-2px)' },
        { opacity: 0.2, transform: 'translateX(1px)' },
        { opacity: 0, transform: 'translateX(0)' }
    ], {
        duration: 200,
        iterations: 3
    }).onfinish = () => {
        glitchOverlay.remove();
    };
}

// Trigger glitch effect randomly
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 10 seconds
        triggerCyberGlitch();
    }
}, 10000);