// Основной скрипт
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Карины Бахтигареевой загружен!');
    
    // Инициализация
    initNavigation();
    initScrollProgress();
    initAnimations();
    
    // Запуск анимаций
    setTimeout(checkAnimations, 500);
});

// Навигация
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const sections = document.querySelectorAll('.section');
    
    // Мобильное меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinksContainer = document.querySelector('.nav-links');
            navLinksContainer.style.display = 
                navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
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
                    document.querySelector('.nav-links').style.display = 'none';
                }
            }
        });
    });
    
    // Активная ссылка при скролле
    window.addEventListener('scroll', function() {
        // Стиль навигации
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.padding = '1.5rem 5%';
        }
        
        // Активная секция
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
    });
}

// Прогресс-бар
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Анимации при скролле
function initAnimations() {
    window.checkAnimations = function() {
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
    
    // Изначально скрываем элементы
    const animatedElements = document.querySelectorAll('.about-card, .family-member, .subject-card, .game-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Проверка при скролле и ресайзе
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('resize', checkAnimations);
}

// Показываем меню при ресайзе на десктопе
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});
