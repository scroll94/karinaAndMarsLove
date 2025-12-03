// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
    parallaxStrength: 0.3,
    animationThreshold: 0.8,
    scrollSpeed: 0.5,
    mouseFollowStrength: 0.05
};

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🌟 Сайт Карины Бахтигареевой загружен! 🌟', 
        'color: #ff6b8b; font-size: 18px; font-weight: bold;');
    console.log('%c"Будущее начинается сегодня!" - Карина', 
        'color: #00d4ff; font-style: italic;');
    
    // Инициализация всех модулей
    initNavigation();
    initScrollProgress();
    initAnimations();
    initParallax();
    initMouseFollow();
    init3DEffects();
    initGameCards();
    initFamilyMembers();
    
    // Запуск анимаций
    setTimeout(() => {
        checkAnimations();
    }, 500);
});

// ===== МОДУЛЬ НАВИГАЦИИ =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.section');
    
    // Мобильное меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
            this.innerHTML = navLinksContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Закрытие меню при клике на ссылку
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
                
                // Закрытие меню на мобильных
                if (window.innerWidth <= 992) {
                    navLinksContainer.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Обновление активной навигации при скролле
    function updateActiveNav() {
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Обновление активной ссылки
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Стиль навигации при скролле
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNav();
    });
    
    // Инициализация
    updateActiveNav();
}

// ===== ПРОГРЕСС-БАР =====
function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementHeight = element.clientHeight;
            const windowHeight = window.innerHeight;
            
            // Если элемент в поле зрения
            if (elementTop < windowHeight * CONFIG.animationThreshold) {
                const animationType = element.getAttribute('data-animation') || 'fadeInUp';
                const delay = element.getAttribute('data-delay') || 0;
                
                // Добавляем задержку
                setTimeout(() => {
                    element.classList.add('animated');
                    element.classList.add(animationType);
                    
                    // Дополнительные эффекты для разных типов анимаций
                    if (animationType === 'flipInX') {
                        element.style.transformStyle = 'preserve-3d';
                    }
                    
                    // Анимация для таймлайна
                    if (element.closest('.timeline-item')) {
                        const progressBar = element.querySelector('.progress');
                        if (progressBar) {
                            const width = progressBar.style.width;
                            progressBar.style.width = '0%';
                            setTimeout(() => {
                                progressBar.style.transition = 'width 1.5s ease';
                                progressBar.style.width = width;
                            }, 300);
                        }
                    }
                }, delay * 1000);
            }
        });
    }
    
    // Проверка при скролле и ресайзе
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('resize', checkAnimations);
    
    // Экспортируем функцию для ручного вызова
    window.checkAnimations = checkAnimations;
}

// ===== ПАРАЛЛАКС ЭФФЕКТЫ =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.bg-element, .image-frame, .game-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = CONFIG.parallaxStrength * (index % 3 + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== СЛЕДОВАНИЕ ЗА МЫШЬЮ =====
function initMouseFollow() {
    const interactiveElements = document.querySelectorAll('.about-card, .game-card, .family-member');
    let mouseX = 0;
    let mouseY = 0;
    
    // Отслеживание позиции мыши
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Анимация элементов
    function animateElements() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;
            
            const deltaX = mouseX - elementCenterX;
            const deltaY = mouseY - elementCenterY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 300;
            
            if (distance < maxDistance) {
                const strength = 1 - (distance / maxDistance);
                const rotateY = (deltaX / 50) * strength;
                const rotateX = -(deltaY / 50) * strength;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                element.style.transition = 'transform 0.3s ease';
            } else {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
        
        requestAnimationFrame(animateElements);
    }
    
    animateElements();
}

// ===== 3D ЭФФЕКТЫ =====
function init3DEffects() {
    // 3D эффект для навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) translateY(0)';
        });
    });
    
    // 3D эффект для карточек
    const cards = document.querySelectorAll('.about-card, .game-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(5deg) translateY(-20px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
        });
    });
    
    // Плавающие элементы
    const floatingElements = document.querySelectorAll('.member-icon, .card-icon, .game-card-icon');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// ===== ИНТЕРАКТИВНЫЕ КАРТОЧКИ ИГР =====
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    const mainGameCard = document.querySelector('.main-game-card');
    
    // Главная карточка игры
    if (mainGameCard) {
        mainGameCard.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.transform = 'scale(1.05)';
                this.style.zIndex = '100';
                
                // Анимация пульсации для кнопки
                const button = this.querySelector('.game-btn');
                if (button) {
                    button.style.animation = 'pulseOrange 1s infinite';
                    setTimeout(() => {
                        button.style.animation = '';
                    }, 3000);
                }
            }
        });
    }
    
    // Карточки других игр
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Эффект "переворота"
            this.style.transform = 'perspective(1000px) rotateY(180deg)';
            
            setTimeout(() => {
                this.style.transform = 'perspective(1000px) rotateY(0)';
            }, 600);
            
            // Информация о игре в консоли
            const gameName = this.querySelector('h4').textContent;
            console.log(`🎮 Выбрана игра: ${gameName}`);
        });
        
        // Эффект при наведении
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.game-card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(15deg)';
                icon.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.game-card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// ===== ИНТЕРАКТИВНЫЕ ЧЛЕНЫ СЕМЬИ =====
function initFamilyMembers() {
    const familyMembers = document.querySelectorAll('.family-member');
    
    familyMembers.forEach(member => {
        member.addEventListener('click', function() {
            // Эффект "пульсации"
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 40px rgba(255, 107, 139, 0.6)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(255, 107, 139, 0.2)';
            }, 150);
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
            
            // Информация в консоли
            const memberName = this.querySelector('h3').textContent;
            const memberType = this.querySelector('p').textContent;
            console.log(`👨‍👩‍👧‍👦 ${memberName} - ${memberType}`);
        });
        
        // Анимация иконки
        const icon = member.querySelector('.member-icon');
        if (icon) {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'rotateY(180deg) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'rotateY(0) scale(1)';
            });
        }
    });
}

// ===== ДОПОЛНИТЕЛЬНЫЕ АНИМАЦИИ =====
function initAdditionalAnimations() {
    // Анимация для бейджей
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.1}s`;
        badge.classList.add('pulse');
        
        badge.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Анимация для прогресс-баров
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease-in-out';
            bar.style.width = width;
        }, 1000);
    });
    
    // Эффект "волны" для секций
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.section-overlay');
            if (overlay) {
                overlay.style.background = `linear-gradient(135deg, 
                    rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1), 
                    rgba(26, 26, 46, 0.9))`;
            }
        });
    });
}

// ===== КОНТРОЛЬ СКОРОСТИ ПРОКРУТКИ =====
function initSmoothScroll() {
    let isScrolling = false;
    
    window.addEventListener('wheel', function(e) {
        if (!isScrolling) {
            isScrolling = true;
            
            const delta = e.deltaY * CONFIG.scrollSpeed;
            window.scrollBy({
                top: delta,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
        
        e.preventDefault();
    }, { passive: false });
}

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕХ МОДУЛЕЙ =====
function initializeAll() {
    initNavigation();
    initScrollProgress();
    initAnimations();
    initParallax();
    initMouseFollow();
    init3DEffects();
    initGameCards();
    initFamilyMembers();
    initAdditionalAnimations();
    initSmoothScroll();
    
    // Запускаем проверку анимаций
    setTimeout(checkAnimations, 1000);
    
    // Добавляем класс загрузки для плавного появления
    document.body.classList.add('loaded');
}

// ===== ЗАПУСК ВСЕГО ПРИ ЗАГРУЗКЕ =====
window.addEventListener('load', function() {
    // Инициализация
    initializeAll();
    
    // Эффект постепенного появления
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
    
    // Приветственное сообщение
    console.log('%c========================================', 'color: #6a11cb');
    console.log('%c🚀 Сайт полностью загружен и готов!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%c👩‍⚕️ Будущий врач Карина Бахтигареева', 'color: #ff6b8b');
    console.log('%c🎮 Геймер • 🍰 Любитель сладкого • 👨‍👩‍👧‍👦 Семьянин', 'color: #9d4edd');
    console.log('%c✨ Все анимации активированы!', 'color: #ffcc00');
    console.log('%c========================================', 'color: #6a11cb');
});

// ===== ФУНКЦИИ ДЛЯ ИНТЕРАКТИВНОСТИ =====

// Функция для "оживления" карточек
function animateCard(cardElement) {
    cardElement.classList.add('animated');
    
    if (cardElement.classList.contains('about-card')) {
        cardElement.style.transform = 'translateY(-20px) rotateX(5deg)';
        cardElement.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.4)';
        
        setTimeout(() => {
            cardElement.style.transform = '';
            cardElement.style.boxShadow = '';
        }, 1000);
    }
}

// Функция для показа статистики
function showStats() {
    const stats = document.querySelectorAll('.stat-number, .goal-number');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '');
        }, 30);
    });
}

// Функция для "волшебного" эффекта
function magicEffect() {
    const elements = document.querySelectorAll('.card-icon, .member-icon, .game-card-icon');
    
    elements.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.transform = 'scale(1.3) rotate(360deg)';
            icon.style.boxShadow = '0 0 40px currentColor';
            
            setTimeout(() => {
                icon.style.transform = '';
                icon.style.boxShadow = '';
            }, 600);
        }, index * 100);
    });
}

// Экспорт функций в глобальную область видимости
window.animateCard = animateCard;
window.showStats = showStats;
window.magicEffect = magicEffect;
window.checkAnimations = checkAnimations;

// Автоматический запуск статистики при скролле к соответствующей секции
window.addEventListener('scroll', function() {
    const studySection = document.getElementById('study');
    if (studySection) {
        const rect = studySection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
            showStats();
        }
    }
});

// ===== ФИНАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====
// Запускаем всё когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}
