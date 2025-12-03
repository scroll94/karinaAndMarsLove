// Переключение страниц
function switchPage(pageNumber) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показать выбранную страницу
    document.getElementById(`page${pageNumber}`).classList.add('active');
    
    // Обновить активную кнопку навигации
    document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === pageNumber);
    });
}

// Показать/скрыть панель информации
function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    const arrow = panel.previousElementSibling.querySelector('.fa-chevron-down');
    
    panel.classList.toggle('active');
    arrow.style.transform = panel.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    
    // Анимация для иконки
    arrow.style.transition = 'transform 0.3s ease';
}

// Показать детали увлечения
const hobbyDetails = [
    "Я обожаю читать! Любимый жанр - фэнтези и психология. Чтение помогает мне расслабиться и узнать что-то новое.",
    "Музыка - моя страсть! Слушаю все: от классики до современной поп-музыки. Особенно люблю [любимые исполнители].",
    "Люблю фотографировать природу и городские пейзажи. Фотография - это способ замечать красоту в простых вещах.",
    "Обожаю готовить, особенно выпечку. Люблю экспериментировать с рецептами и радовать близких вкусняшками!"
];

function showHobbyDetail(index) {
    const detailElement = document.getElementById('hobbyDetail');
    
    // Убрать активный класс у всех хобби
    document.querySelectorAll('.hobby').forEach(hobby => {
        hobby.classList.remove('active');
    });
    
    // Добавить активный класс выбранному хобби
    document.querySelectorAll('.hobby')[index].classList.add('active');
    
    // Показать детали с анимацией
    detailElement.style.opacity = '0';
    detailElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        detailElement.textContent = hobbyDetails[index];
        detailElement.style.opacity = '1';
        detailElement.style.transform = 'translateY(0)';
        detailElement.style.transition = 'all 0.3s ease';
        
        // Добавить котика в конец текста
        detailElement.innerHTML += ' <span style="font-size: 1.2em;">🐱</span>';
    }, 200);
}

// Показать секрет
function showSecret() {
    const popup = document.getElementById('secretPopup');
    const cat = document.querySelector('.cat-body');
    
    // Анимация котика
    cat.style.transform = 'scale(1.5) rotate(360deg)';
    cat.style.transition = 'transform 0.5s ease';
    
    // Показать попап через задержку
    setTimeout(() => {
        popup.classList.add('active');
        cat.style.transform = 'scale(1) rotate(0deg)';
    }, 500);
    
    // Добавить котиков в попап
    const popupCat = popup.querySelector('.popup-cat');
    popupCat.innerHTML = '🐱😺😸😻🐈'.repeat(3);
}

// Закрыть попап
function closePopup() {
    document.getElementById('secretPopup').classList.remove('active');
}

// Показать записку от котика
function showCatNote() {
    const popup = document.getElementById('catNotePopup');
    const noteCat = document.querySelector('.cat-note');
    
    // Анимация котика с запиской
    noteCat.style.animation = 'none';
    noteCat.style.transform = 'rotate(360deg) scale(1.5)';
    
    setTimeout(() => {
        noteCat.style.animation = 'noteCat 2s infinite';
        noteCat.style.transform = 'rotate(0deg) scale(1)';
        popup.classList.add('active');
    }, 500);
}

// Закрыть записку
function closeCatNote() {
    document.getElementById('catNotePopup').classList.remove('active');
}

// Увеличить прогресс
function increaseProgress() {
    const progress = document.getElementById('egeProgress');
    const currentWidth = parseInt(progress.style.width) || 75;
    const newWidth = Math.min(currentWidth + 5, 100);
    
    progress.style.width = `${newWidth}%`;
    
    // Обновить текст
    document.querySelector('.progress-text').textContent = `${newWidth}% готово`;
    
    // Анимация успеха
    const btn = document.querySelector('.progress-btn');
    btn.innerHTML = '<i class="fas fa-check"></i> Прогресс увеличен!';
    btn.style.background = 'var(--success)';
    
    // Добавить анимацию
    progress.style.background = `linear-gradient(90deg, var(--success), var(--secondary))`;
    
    // Восстановить кнопку через 2 секунды
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i> Увеличить прогресс';
        btn.style.background = 'var(--accent)';
    }, 2000);
}

// Переключить детали времени
const timeDetails = [
    "Учусь в школе. Любимые предметы: математика и литература. Активно участвую в школьной жизни.",
    "Усердно готовлюсь к ЕГЭ. Решаю пробники, повторяю теорию, посещаю дополнительные курсы.",
    "Время для себя! Занимаюсь хобби, общаюсь с друзьями, читаю книги и отдыхаю."
];

function toggleTimeDetail(index) {
    const timeItem = document.querySelectorAll('.time-item')[index];
    const timeContent = timeItem.querySelector('.time-content');
    
    // Проверяем, есть ли уже детали
    if (timeItem.classList.contains('expanded')) {
        // Скрываем детали
        timeContent.querySelector('.activity').style.display = 'block';
        if (timeContent.querySelector('.detail')) {
            timeContent.querySelector('.detail').remove();
        }
        timeItem.classList.remove('expanded');
    } else {
        // Показываем детали
        timeContent.querySelector('.activity').style.display = 'none';
        
        const detail = document.createElement('div');
        detail.className = 'detail';
        detail.innerHTML = `
            <p>${timeDetails[index]}</p>
            <div style="text-align: right; margin-top: 10px; font-size: 1.5em;">🐱</div>
        `;
        detail.style.animation = 'fadeIn 0.3s ease';
        
        timeContent.appendChild(detail);
        timeItem.classList.add('expanded');
    }
}

// Переключить цель
function toggleGoal(element) {
    const icon = element.querySelector('i');
    const isCompleted = element.classList.contains('completed');
    
    if (isCompleted) {
        // Снять отметку
        element.classList.remove('completed');
        icon.classList.remove('fa-check-circle');
        icon.classList.add('fa-circle');
    } else {
        // Отметить выполненной
        element.classList.add('completed');
        icon.classList.remove('fa-circle');
        icon.classList.add('fa-check-circle');
        
        // Анимация успеха
        element.style.background = 'var(--light)';
        
        // Добавить котика
        const cat = document.createElement('span');
        cat.innerHTML = ' 🐱';
        cat.style.fontSize = '1.2em';
        cat.style.animation = 'catBounce 2s infinite';
        element.appendChild(cat);
        
        // Восстановить через 3 секунды
        setTimeout(() => {
            element.style.background = '';
            cat.remove();
        }, 3000);
    }
}

// Помощь от котика
function catHelp() {
    const popup = document.getElementById('helpPopup');
    const helperCat = document.querySelector('.cat-helper');
    
    // Анимация котика
    helperCat.style.animation = 'none';
    helperCat.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
        helperCat.style.animation = 'helperCat 3s infinite';
        helperCat.style.transform = 'scale(1)';
        popup.classList.add('active');
    }, 500);
}

// Закрыть помощь
function closeHelp() {
    document.getElementById('helpPopup').classList.remove('active');
}

// Добавить фото
function addPhotoPrompt(slotNumber) {
    const slot = document.querySelectorAll('.photo-slot')[slotNumber - 1];
    
    // Анимация слота
    slot.style.transform = 'scale(1.1)';
    slot.style.background = 'rgba(255, 107, 139, 0.2)';
    
    // Показать сообщение
    const message = prompt(`Введите URL фото для слота ${slotNumber} (или оставьте пустым для демо):`);
    
    if (message) {
        // Если ввели URL
        slot.innerHTML = `
            <img src="${message}" alt="Фото ${slotNumber}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 13px;">
        `;
    } else {
        // Демо фото
        slot.innerHTML = `
            <div style="font-size: 3em; color: var(--primary);">📸</div>
            <span style="margin-top: 10px; font-size: 0.9em;">Фото ${slotNumber} добавлено!</span>
            <div style="margin-top: 5px; font-size: 1.5em;">😺</div>
        `;
    }
    
    // Восстановить анимацию
    setTimeout(() => {
        slot.style.transform = '';
        slot.style.background = '';
    }, 1000);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Добавить обработчик для секретной карточки
    document.getElementById('secretCard').addEventListener('click', showSecret);
    
    // Инициализировать прогресс бар
    document.getElementById('egeProgress').style.width = '75%';
    
    // Добавить котиков в фоновые элементы
    const floatingCats = document.querySelector('.floating-cats');
    for (let i = 0; i < 10; i++) {
        const cat = document.createElement('div');
        cat.className = 'cat';
        cat.textContent = ['🐱', '😺', '😸', '😻', '🐈'][Math.floor(Math.random() * 5)];
        cat.style.left = Math.random() * 100 + '%';
        cat.style.top = Math.random() * 100 + '%';
        cat.style.animationDelay = Math.random() * 20 + 's';
        cat.style.fontSize = (Math.random() * 20 + 20) + 'px';
        floatingCats.appendChild(cat);
    }
    
    // Анимация при первом посещении
    setTimeout(() => {
        const welcomeCat = document.createElement('div');
        welcomeCat.style.position = 'fixed';
        welcomeCat.style.top = '20px';
        welcomeCat.style.right = '20px';
        welcomeCat.style.fontSize = '2rem';
        welcomeCat.style.zIndex = '1000';
        welcomeCat.textContent = '😺';
        welcomeCat.style.animation = 'catBounce 2s infinite';
        document.body.appendChild(welcomeCat);
        
        setTimeout(() => {
            welcomeCat.remove();
        }, 5000);
    }, 1000);
});
