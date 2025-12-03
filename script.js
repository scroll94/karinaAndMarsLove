// Инициализация анимаций
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    delay: 100,
    easing: 'ease-in-out'
});

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Кнопка "Наверх"
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Эффект для навигации
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Создание плавающих элементов
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const elements = ['📚', '✏️', '🎯', '🌟', '💡', '🎨', '📖', '🖋️', '⭐', '✨'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 20 + 's';
        element.style.fontSize = (Math.random() * 20 + 15) + 'px';
        element.style.opacity = Math.random() * 0.15 + 0.05;
        container.appendChild(element);
    }
}

// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
    // Текущий год в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Создание плавающих элементов
    createFloatingElements();
    
    // Анимация при наведении на элементы
    document.querySelectorAll('.info-item, .contact-item, .hobby-card').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Анимация для статистики
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        let currentValue = 0;
        
        if (!isNaN(finalValue)) {
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    clearInterval(timer);
                    currentValue = finalValue;
                }
                stat.textContent = Math.floor(currentValue);
            }, 30);
        }
    });
});

// Параллакс эффект для фона
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelector('.floating-elements');
    
    if (floatingElements) {
        floatingElements.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});