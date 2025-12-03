// Сайт Карины Бахтигареевой - оптимизирован для GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Сайт Карины Бахтигареевой загружен!');
    
    // Проверка загрузки CSS
    checkCSSLoaded();
    
    // Инициализация всех функций
    initNavigation();
    initMobileMenu();
    initAnimations();
    initProgressBars();
    initScrollEffects();
    
    // Консольное приветствие
    showConsoleWelcome();
});

// Проверка загрузки CSS
function checkCSSLoaded() {
    setTimeout(() => {
        const bodyStyles = window.getComputedStyle(document.body);
        const bgColor = bodyStyles.backgroundColor;
        
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'rgb(255, 255, 255)') {
            console.warn('⚠️ CSS может быть не загружен. Проверьте подключение в GitHub Pages.');
            // Добавляем резервные стили
            document.body.style.backgroundColor = '#0f172a';
            document.body.style.color = '#f8fafc';
        }
    }, 100);
}

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
                
                // Плавный скролл
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем активную ссылку
                updateActiveLink(targetId);
            }
        });
    });
    
    // Активная ссылка при скролле
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveLink('#' + currentSection);
        }
    });
}

// Обновление активной ссылки
function updateActiveLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Мобильное меню
function initMobileMenu() {
    const navLinksContainer = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Закрытие меню при клике на ссылку
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
    
    // Адаптация при ресайзе
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navLinksContainer) {
            navLinksContainer.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}

// Анимации
function initAnimations() {
    // Анимация появления элементов
    const animatedElements = document.querySelectorAll(
        '.hobby-card, .family-member, .subject-card, .wildrift-card, .timeline-item, .goal-card, .game-item, .fact'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Анимация для прогресс-баров
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Эффекты скролла
function initScrollEffects() {
    // Анимация навигации при скролле
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }
        }
    });
}

// Прогресс-бары
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = width;
        }, 500);
    });
}

// Консольное приветствие
function showConsoleWelcome() {
    const styles = [
        'color: #8b5cf6',
        'font-size: 16px',
        'font-weight: bold',
        'text-shadow: 0 0 5px rgba(139, 92, 246, 0.5)',
        'padding: 10px 0'
    ].join(';');
    
    const subStyles = [
        'color: #00d4ff',
        'font-size: 14px',
        'font-weight: normal'
    ].join(';');
    
    console.log('%c✨ Сайт Карины Бахтигареевой ✨', styles);
    console.log('%cБудущий врач • Мейнер Нами • Победитель турниров', subStyles);
    
    console.table({
        'Статус': 'Ученица 11 класса',
        'Цель': 'Медицинский университет',
        'Игра': 'Wild Rift (Нами)',
        'Достижение': '1 место в турнире',
        'Любимое лакомство': 'Raffaello'
    });
}

// Плавная загрузка страницы
window.addEventListener('load', function() {
    // Плавное появление
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.7s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Проверка поддержки IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        console.log('Браузер не поддерживает IntersectionObserver, используем fallback');
        // Простой fallback для старых браузеров
        window.addEventListener('scroll', function() {
            const elements = document.querySelectorAll('.hobby-card, .family-member, .fact');
            const windowHeight = window.innerHeight;
            
            elements.forEach(el => {
                const position = el.getBoundingClientRect().top;
                
                if (position < windowHeight - 50) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Запускаем сразу для видимых элементов
        setTimeout(() => {
            const elements = document.querySelectorAll('.hobby-card, .family-member, .fact');
            const windowHeight = window.innerHeight;
            
            elements.forEach(el => {
                const position = el.getBoundingClientRect().top;
                
                if (position < windowHeight) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }, 500);
    }
});

// Обработка ошибок загрузки ресурсов
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
        console.error('❌ Ошибка загрузки CSS:', e.target.href);
        // Активируем резервные стили
        document.body.classList.add('css-failed');
    }
    
    if (e.target.tagName === 'SCRIPT') {
        console.error('❌ Ошибка загрузки JS:', e.target.src);
    }
}, true);
