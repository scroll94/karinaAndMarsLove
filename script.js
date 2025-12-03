// Основной скрипт для сайта scroll94

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 scroll94 био-сайт загружен');

    // Плавная прокрутка
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Кнопка "Узнать больше"
    const ctaBtn = document.getElementById('cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            alert('📧 Свяжитесь со мной через Telegram: @scroll94');
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Интерактивность карточек проектов
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            this.style.background = '#222244';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
            console.log(`Выбран проект: ${title}`);
        });
    });

    // Форма отправки
    const sendBtn = document.getElementById('send-btn');
    const emailInput = document.getElementById('email-input');

    if (sendBtn && emailInput) {
        sendBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email === '') {
                alert('Введите email');
                return;
            }
            if (!validateEmail(email)) {
                alert('Введите корректный email');
                return;
            }
            alert(`Спасибо! Я свяжусь с вами на ${email}`);
            emailInput.value = '';
        });
    }

    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Динамический год в футере
    const yearElement = document.querySelector('footer p');
    if (yearElement && yearElement.textContent.includes('2025')) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', new Date().getFullYear());
    }

    // Эффект параллакс для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image img, .gallery-grid img');
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed * 0.05}px)`;
        });
    });

    // Случайный цвет для навыков
    document.querySelectorAll('.skills span').forEach(skill => {
        const hue = Math.floor(Math.random() * 360);
        skill.style.borderColor = `hsl(${hue}, 70%, 50%)`;
    });
});
