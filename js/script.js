
// sistema de partículas del fondo
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.3 + 0.1;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(114, 137, 218, ${opacity});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
        `;
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x, y,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            size
        });
    }

    animate() {
        const update = () => {
            this.particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if (particle.x > 100) particle.x = 0;
                if (particle.x < 0) particle.x = 100;
                if (particle.y > 100) particle.y = 0;
                if (particle.y < 0) particle.y = 100;
                
                particle.element.style.left = `${particle.x}%`;
                particle.element.style.top = `${particle.y}%`;
                
                // efecto de pulsación
                const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
                particle.element.style.transform = `scale(${scale})`;
            });
            
            requestAnimationFrame(update);
        };
        
        update();
    }
}

// efecto de luz en el cursor
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorGlow.style.opacity = '0.3';
    
    const hue = (mouseX / window.innerWidth) * 60 + 200;
    cursorGlow.style.background = `radial-gradient(circle, hsla(${hue}, 70%, 60%, 0.3) 0%, transparent 70%)`;
});

// movimiento suave
function updateCursorGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.left = `${glowX - 150}px`;
    cursorGlow.style.top = `${glowY - 150}px`;
    
    requestAnimationFrame(updateCursorGlow);
}

// efectos de pasar el cursor sobre un botón
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
    });
});

// inicializar todo cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    
    updateCursorGlow();
    
    document.querySelectorAll('.stat').forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            const icon = stat.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', () => {
            const icon = stat.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // efecto de escribir el título
    const title = document.querySelector('.title-text');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const grid = document.querySelector('.grid-overlay');
        grid.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
    });
});