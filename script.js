// Сайт Карины Бахтигареевой - оптимизирован для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Сайт Карины Бахтигареевой загружен!');
    
    // Проверка загрузки CSS
    if (!document.styleSheets[0].cssRules) {
        console.warn('⚠️ CSS может быть не загружен. Проверьте подключение.');
        document.body.classList.add('no-css');
    }
    
    // Инициализация
    initNavigation();
    initAnimations();
    initMobileMenu();
    initProgressBars();
    initScrollAnimations();
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
            this.innerHTML = navLinksContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Плавный скролл
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Закрываем меню на мобильных
                if (window.innerWidth <= 992 && navLinksContainer) {
                    navLinksContainer.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Плавный скролл с offset для фиксированной навигации
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Активная ссылка при скролле
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
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

// Анимации
function initAnimations() {
    // Ждем загрузки страницы для анимаций
    setTimeout(() => {
        const cards = document.querySelectorAll('.about-card, .family-member, .subject-card, .wildrift-card, .timeline-item, .goal-card, .other-games');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    }, 500);
}

// Мобильное меню
function initMobileMenu() {
    const navLinksContainer = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Автоматическое закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992 && navLinksContainer) {
                navLinksContainer.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && navLinksContainer && menuToggle) {
            if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Адаптация меню при ресайзе
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navLinksContainer) {
            navLinksContainer.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}

// Прогресс-бары
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Анимации при скролле
function initScrollAnimations() {
    // Параллакс эффект для hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section, .image-frame');
        
        parallaxElements.forEach((el, index) => {
            const speed = index === 0 ? 0.5 : 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Появление элементов при скролле
    const scrollElements = document.querySelectorAll('.about-card, .family-member, .subject-card, .game-item');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Инициализация при загрузке
    handleScrollAnimation();
}

// Плавная загрузка страницы
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.7s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Показать консольное сообщение
        console.log('%c✨ Сайт полностью загружен! ✨', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
        console.log('%cКарина Бахтигареева • Будущий врач • Мейнер Нами', 'color: #00d4ff; font-size: 14px;');
    }, 100);
    
    // Статистика в консоли
    console.table({
        'Игр в Wild Rift': '2222+',
        'Часов в играх': '2000+',
        'Место в турнире': '1-е',
        'Мечта': 'Стать врачом'
    });
});

// Фикс для старых браузеров
if (!window.IntersectionObserver) {
    console.log('IntersectionObserver не поддерживается, используем fallback');
    
    // Простой fallback для анимаций
    window.addEventListener('scroll', function() {
        const elements = document.querySelectorAll('.about-card, .family-member, .subject-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            
            if (position < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });
}
