// Простой и надежный скрипт для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Карины Бахтигареевой загружен!');
    
    // Инициализация
    initNavigation();
    initAnimations();
    fixMobileMenu();
});

// Навигация
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Мобильное меню
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
    
    // Плавный скролл и активная ссылка
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Плавный скролл
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем активную ссылку
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Закрываем меню на мобильных
                if (window.innerWidth <= 992 && navLinksContainer) {
                    navLinksContainer.classList.remove('active');
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
    });
}

// Простые анимации
function initAnimations() {
    // Функция для анимации карточек
    function animateCards() {
        const cards = document.querySelectorAll('.about-card, .family-member, .subject-card, .wildrift-card, .timeline-item');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Изначально скрываем элементы для анимации
    const animatedElements = document.querySelectorAll('.about-card, .family-member, .subject-card, .wildrift-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Запускаем анимации
    setTimeout(animateCards, 300);
    window.addEventListener('scroll', animateCards);
}

// Фикс для мобильного меню
function fixMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // При ресайзе показываем/скрываем меню
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Изначально настраиваем меню
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
}

// Плавное появление страницы
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
