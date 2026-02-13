// efecto de escribir en la terminal
const terminalOutput = document.querySelector('.terminal-output');
const phrases = [
    'meruzhan mi amo',
    'jakob jitler, inshtagram feishbuc twiter',
    'i use arch btw',
    'viva el porno gay',
    'mibombo'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
    if (isPaused) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (!isDeleting) {
        terminalOutput.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
            }, 2000);
        }
    } else {
        terminalOutput.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    const randomSpeed = typingSpeed + Math.random() * 50;
    setTimeout(typeEffect, randomSpeed);
}

// botón de copiar
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const command = e.currentTarget.parentElement.querySelector('code').textContent;
        navigator.clipboard.writeText(command).then(() => {
            const originalIcon = e.currentTarget.innerHTML;
            e.currentTarget.innerHTML = '<i class="fas fa-check"></i>';
            e.currentTarget.style.color = '#27ca3f';
            
            setTimeout(() => {
                e.currentTarget.innerHTML = originalIcon;
                e.currentTarget.style.color = '';
            }, 2000);
        });
    });
});

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// animación del coso de arch
const archBadge = document.querySelector('.arch-badge');
if (archBadge) {
    let rotation = 0;
    setInterval(() => {
        rotation = (rotation + 1) % 360;
        archBadge.style.transform = `rotate(${Math.sin(rotation * Math.PI / 180) * 2}deg)`;
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.tool-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.tool-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // efecto de arrastrar la terminal
    const terminalHeader = document.querySelector('.terminal-header');
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    terminalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const terminal = terminalHeader.parentElement;
        initialX = terminal.offsetLeft;
        initialY = terminal.offsetTop;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    });
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const terminal = terminalHeader.parentElement;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        terminal.style.position = 'relative';
        terminal.style.left = `${dx}px`;
        terminal.style.top = `${dy}px`;
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        
        // volver a la pos. inicial tras un rato
        setTimeout(() => {
            const terminal = terminalHeader.parentElement;
            terminal.style.transition = 'all 0.5s ease';
            terminal.style.left = '0';
            terminal.style.top = '0';
            
            setTimeout(() => {
                terminal.style.transition = '';
            }, 500);
        }, 1000);
    }
});