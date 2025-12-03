// Упрощенный и безопасный скрипт для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Сайт Карины Бахтигареевой загружен!');
    
    // Инициализация только безопасных функций
    initSafeNavigation();
    initSimpleProgress();
    initBasicAnimations();
});

// Безопасная навигация
function initSafeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navbar || !navLinks.length) return;
    
    // Мобильное меню - простой вариант
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navContainer = document.querySelector('.nav-links');
            if (navContainer) {
                const currentDisplay = window.getComputedStyle(navContainer).display;
                navContainer.style.display = currentDisplay === 'none' ? 'flex' : 'none';
            }
        });
    }
    
    // Плавный скролл
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем активную ссылку
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Закрываем меню на мобильных
                if (window.innerWidth <= 992) {
                    const navContainer = document.querySelector('.nav-links');
                    if (navContainer) navContainer.style.display = 'none';
                }
            }
        });
    });
    
    // Активная ссылка при скролле
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPos = window.scrollY + 100;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Фиксированная навигация
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.padding = '1.5rem 5%';
        }
    });
}

// Простой прогресс-бар
function initSimpleProgress() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Базовые анимации
function initBasicAnimations() {
    // Простая функция для анимации
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-card, .family-member, .subject-card, .game-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Изначально скрываем элементы
    const animatedElements = document.querySelectorAll('.about-card, .family-member, .subject-card, .game-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Запускаем сразу и при скролле
    setTimeout(animateOnScroll, 300);
    window.addEventListener('scroll', animateOnScroll);
}

// Автоматическое управление меню при ресайзе
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Простая проверка загрузки
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('✅ Все ресурсы загружены');
});
