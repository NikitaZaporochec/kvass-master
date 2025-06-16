document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация мобильного меню');
    
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    
    if (!menuToggle || !menu) {
        console.error('Элементы меню не найдены');
        return;
    }
    
    console.log('Элементы меню найдены, добавляем обработчики');
    
    // Переключение меню
    menuToggle.addEventListener('click', function(e) {
        console.log('Клик по кнопке меню');
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
    
    // Остальные обработчики...
}); 