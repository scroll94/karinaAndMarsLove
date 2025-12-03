// Основной скрипт - исправленная версия
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Карины Бахтигареевой загружен!');
    
    // Инициализация
    initNavigation();
    initScrollProgress();
    
    // Показываем меню при загрузке
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
    }
    
    // Запуск анимаций
    setTimeout(checkAnimations, 300);
});

// Навигация - исправленная версия
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const sections = document.querySelectorAll('.section');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Проверяем элементы
    if (!navbar || !navLinksContainer) {
        console.log('Навигация не найдена');
        return;
    }
    
    // Мобильное меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navLinksContainer.style.display === 'flex') {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = 'var(--dark)';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.gap = '15px';
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
                
                // Закрытие меню на мобильных
                if (window.innerWidth <= 992) {
                    navLinksContainer.style.display = 'none';
                }
            }
        });
    });
    
    // Активная ссылка при скролле
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
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
    }
    
    // Стиль навигации при скролле
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.padding = '1.5rem 5%';
        }
        
        updateActiveNav();
    });
    
    // Инициализация
    updateActiveNav();
}

// Прогресс-бар
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) {
        console.log('Прогресс-бар не найден');
        return;
    }
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (windowHeight > 0) {
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        }
    });
}

// Анимации при скролле - исправленная версия
function checkAnimations() {
    const elements = document.querySelectorAll('.about-card, .family-member, .subject-card, .game-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Изначально скрываем анимированные элементы
const animatedElements = document.querySelectorAll('.about-card, .family-member, .subject-card, .game-card, .timeline-item');
if (animatedElements.length > 0) {
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Проверка при скролле
    window.addEventListener('scroll', checkAnimations);
}

// Показываем меню при ресайзе
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
    } else {
        navLinks.style.display = 'none';
    }
    
    // Перезапускаем анимации
    checkAnimations();
});
