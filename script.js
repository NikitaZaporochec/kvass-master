document.addEventListener('DOMContentLoaded', function() {
    // Инициализация 3D модели Sketchfab
    const iframe = document.getElementById('sketchfabModel');
    const modelId = 'c4958926b88c4b918d0a902f0628b6c7';
    
    // Устанавливаем src для iframe с моделью
    iframe.src = `https://sketchfab.com/models/${modelId}/embed?autospin=1&autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1`;
    
    // API для управления моделью
    let api;
    
    // Инициализируем API Sketchfab после загрузки iframe
    iframe.onload = function() {
        // Ждем, пока API станет доступным
        iframe.contentWindow.addEventListener('load', function() {
            iframe.contentWindow.postMessage({
                type: 'api.initialize',
                api_id: 1
            }, '*');
        });
    };
    
    // Слушаем сообщения от iframe для инициализации API
    window.addEventListener('message', function(e) {
        const message = e.data;
        
        // Проверка, что сообщение от API Sketchfab
        if (message && message.type === 'api.ready') {
            api = new window.Sketchfab(1, iframe);
            api.start();
            
            // После успешной инициализации
            api.addEventListener('load', function() {
                console.log('3D модель загружена');
            });
        }
    });
    
    // Плавный скролл до секций
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Функция для скролла к 3D модели
    window.scrollToModel = function() {
        const modelSection = document.getElementById('model');
        window.scrollTo({
            top: modelSection.offsetTop,
            behavior: 'smooth'
        });
    };
    
    // Управление 3D моделью
    document.getElementById('rotateLeft').addEventListener('click', function() {
        if (api) {
            api.getCameraLookAt(function(err, camera) {
                if (!err) {
                    // Поворот модели влево
                    api.setCameraLookAt(camera.position, camera.target, 3, 1);
                }
            });
        }
    });
    
    document.getElementById('resetView').addEventListener('click', function() {
        if (api) {
            api.recenterCamera();
        }
    });
    
    document.getElementById('rotateRight').addEventListener('click', function() {
        if (api) {
            api.getCameraLookAt(function(err, camera) {
                if (!err) {
                    // Поворот модели вправо
                    api.setCameraLookAt(camera.position, camera.target, 3, -1);
                }
            });
        }
    });
    
    // Обработка отправки формы контакта
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение значений полей формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // В реальном проекте здесь был бы код отправки данных на сервер
        console.log('Отправка формы:', { name, email, message });
        
        // Сброс формы и уведомление пользователя
        this.reset();
        alert('Спасибо! Ваше сообщение отправлено.');
    });
    
    // Анимация при скролле для секций
    const fadeElements = document.querySelectorAll('.about-content, .model-info, form');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeInObserver.observe(element);
    });

    // Обработчик события для логотипа - возврат наверх
    const logoLink = document.querySelector('.logo-link');
    
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Мобильное меню - исправленная версия
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        // Переключение меню
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('active');
            
            // Изменение иконки
            const icon = menuToggle.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Закрытие меню при клике на ссылку
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Закрытие меню при клике вне меню
        document.addEventListener('click', function(event) {
            if (menu.classList.contains('active') && 
                !menu.contains(event.target) && 
                !menuToggle.contains(event.target)) {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

function scrollToModel() {
    document.getElementById('model').scrollIntoView({ behavior: 'smooth' });
}

// Инициализация 3D модели
window.onload = function() {
    const iframe = document.getElementById('sketchfabModel');
    iframe.src = 'https://sketchfab.com/models/c4958926b88c4b918d0a902f0628b6c7/embed';
}; 