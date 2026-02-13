// para las capturas
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.screenshot-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            if (imgSrc && !imgSrc.includes('placeholder')) {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = imgSrc;
                modalImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 10px;
                    border: 2px solid rgba(255,255,255,0.2);
                `;
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                modal.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            }
        });
    });
    
    document.querySelectorAll('.mod-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 50);
    });
});