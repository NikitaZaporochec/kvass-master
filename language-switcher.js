document.addEventListener('DOMContentLoaded', function() {
    // Установка языка по умолчанию или из localStorage
    const defaultLang = localStorage.getItem('language') || 'ru';
    setLanguage(defaultLang);
    
    // Обработчик нажатия на кнопку переключения языка
    document.getElementById('langToggle').addEventListener('click', function() {
        const currentLang = localStorage.getItem('language') || 'ru';
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        setLanguage(newLang);
    });
    
    // Функция для установки языка
    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        
        // Обновление текста на странице
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Обновление атрибутов для ссылок
        document.querySelectorAll('a[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Обновление заголовка страницы
        document.title = lang === 'ru' ? 'KvassMaster Site' : 'KvassMaster Site - EN';
        
        // Обновление текста кнопки переключения языка
        document.querySelector('#langToggle span').textContent = lang === 'ru' ? 'RU' : 'EN';
    }
}); 