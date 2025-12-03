// effects.js - Продвинутые 3D эффекты
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.createElement('div');
        this.container.className = 'particles-container';
        document.body.appendChild(this.container);
        
        this.init();
    }
    
    init() {
        // Создаем частицы
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        
        // Анимация
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные свойства
        const size = Math.random() * 20 + 5;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        this.container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            size: size
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Обновляем позицию
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Отскок от границ
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.speedY *= -1;
            }
            
            // Применяем трансформацию
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            
            // Пульсация
            const scale = 1 + Math.sin(Date.now() / 1000 + particle.x) * 0.2;
            particle.element.style.transform += ` scale(${scale})`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Включаем по желанию
    // new ParticleSystem();
});