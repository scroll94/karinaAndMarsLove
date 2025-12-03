// Сайт Карины Бахтигареевой - оптимизирован для GitHub Pages с фиксами стабильности
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Сайт Карины Бахтигареевой загружен!');
    
    // ФИКС: Запрещаем скролл до полной загрузки
    document.body.style.overflow = 'hidden';
    
    // Проверка загрузки CSS
    checkCSSLoaded();
    
    // Инициализация всех функций
    initNavigation();
    initMobileMenu();
    initAnimations();
    initProgressBars();
    initScrollEffects();
    initTextStability();
    
    // Консольное приветствие
    showConsoleWelcome();
    
    // ФИКС: Разрешаем скролл после загрузки
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        // Гарантируем, что страница в начале
        window.scrollTo(0, 0);
        
        // Фиксируем высоту секций для стабильности
        fixSectionHeights();
    }, 100);
});

// ФИКС: Стабилизация высоты секций
function fixSectionHeights() {
    const sections = document.querySelectorAll('.section');
    const viewportHeight = window.innerHeight;
    
    sections.forEach(section => {
        // Устанавливаем минимальную высоту = высоте окна
        section.style.minHeight = viewportHeight + 'px';
        
        // Фиксируем высоту текстовых блоков
        const textBlocks = section.querySelectorAll('.hero-description, .about-text');
        textBlocks.forEach(block => {
            const maxHeight = viewportHeight * 0.6; // 60% от высоты окна
            block.style.maxHeight = maxHeight + 'px';
            block.style.overflowY = 'auto';
        });
    });
}

// ФИКС: Стабилизация текста
function initTextStability() {
    // Отключаем анимации для текста на слабых устройствах
    const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                            (navigator.deviceMemory || 4) < 4;
    
    if (isLowPerformance || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('📱 Мобильное устройство или слабое железо - отключаем анимации текста');
        
        // Отключаем все анимации для текстовых элементов
        const textElements = document.querySelectorAll(
            '.hero-description, .about-text, .hobby-card, .family-member, .subject-card, .goal-card'
        );
        
        textElements.forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    
    // Фиксируем позицию скролла при ресайзе
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            fixSectionHeights();
            // Возвращаем наверх при ресайзе (опционально)
            if (window.scrollY < 100) {
                window.scrollTo(0, 0);
            }
        }, 250);
    });
    
    // Предотвращаем "дёргание" при скролле
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Мягкое ограничение скорости скролла
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            window.scrollTo({
                top: lastScrollTop + ((scrollTop - lastScrollTop) * 0.7),
                behavior: 'auto'
            });
        }
        
        lastScrollTop = scrollTop;
    }, { passive: false });
}

// Проверка загрузки CSS
function checkCSSLoaded() {
    setTimeout(() => {
        const bodyStyles = window.getComputedStyle(document.body);
        const bgColor = bodyStyles.backgroundColor;
        
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'rgb(255, 255, 255)') {
            console.warn('⚠️ CSS может быть не загружен. Активируем резервные стили.');
            // Добавляем резервные стили
            document.body.classList.add('css-failed');
            document.body.style.backgroundColor = '#0f172a';
            document.body.style.color = '#f8fafc';
            
            // Упрощаем интерфейс если CSS не загрузился
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.style.padding = '50px 20px';
                section.style.minHeight = 'auto';
            });
        }
    }, 500);
}

// Навигация с фиксами
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Мобильное меню
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
            this.innerHTML = navLinksContainer.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Плавный скролл с фиксами
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Закрываем меню на мобильных
                if (window.innerWidth <= 992 && navLinksContainer) {
                    navLinksContainer.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
                
                // ФИКС: Гарантируем плавный скролл без багов
                const targetPosition = targetSection.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const percent = Math.min(progress / duration, 1);
                    
                    // Easing функция для плавности
                    const easeInOutCubic = t => t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
                    
                    window.scrollTo(0, startPosition + distance * easeInOutCubic(percent));
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                
                window.requestAnimationFrame(step);
                
                // Обновляем активную ссылку
                updateActiveLink(targetId);
            }
        });
    });
    
    // Активная ссылка при скролле
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
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
        }, 50);
    }, { passive: true });
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

// Мобильное меню с фиксами
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
        
        // ФИКС: Пересчитываем высоты при ресайзе
        fixSectionHeights();
    });
}

// Анимации с оптимизацией
function initAnimations() {
    // Проверяем производительность
    const canAnimate = 'IntersectionObserver' in window && 
                      !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    if (!canAnimate) {
        console.log('📱 Отключаем сложные анимации для мобильных');
        return;
    }
    
    // Анимация появления элементов
    const animatedElements = document.querySelectorAll(
        '.hobby-card, .family-member, .subject-card, .wildrift-card, .timeline-item, .goal-card, .game-item, .fact'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ФИКС: Используем requestAnimationFrame для плавности
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                });
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(el => {
        // ФИКС: Пропускаем текстовые блоки
        if (!el.classList.contains('hero-description') && 
            !el.classList.contains('about-text') &&
            !el.closest('.hero-description') &&
            !el.closest('.about-text')) {
            observer.observe(el);
        }
    });
    
    // Анимация для прогресс-баров
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                requestAnimationFrame(() => {
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 300);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Эффекты скролла с оптимизацией
function initScrollEffects() {
    let ticking = false;
    
    // Анимация навигации при скролле
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
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
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
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
        'Любимое лакомство': 'Raffaello',
        'Версия сайта': '5.0 (стабильная)'
    });
}

// Плавная загрузка страницы с фиксами
window.addEventListener('load', function() {
    // Плавное появление
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.7s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        // Гарантируем, что страница стабильна
        window.scrollTo(0, 0);
        fixSectionHeights();
    }, 100);
    
    // Проверка поддержки IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        console.log('Браузер не поддерживает IntersectionObserver, используем fallback');
        // Простой fallback для старых браузеров
        const elements = document.querySelectorAll('.hobby-card, .family-member, .fact');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // ФИКС: Предотвращаем баги загрузки на GitHub Pages
    setTimeout(() => {
        // Проверяем, что все изображения/шрифты загружены
        const allAssets = document.querySelectorAll('img, link[rel="stylesheet"]');
        let loadedCount = 0;
        
        allAssets.forEach(asset => {
            if (asset.complete || asset.readyState === 'complete') {
                loadedCount++;
            }
        });
        
        if (loadedCount === allAssets.length) {
            console.log('✅ Все ресурсы загружены');
        } else {
            console.log(`⚠️ Загружено ${loadedCount}/${allAssets.length} ресурсов`);
        }
        
        // Финальная проверка стабильности
        fixSectionHeights();
    }, 2000);
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

// ФИКС: Предотвращаем zoom на мобильных
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);
