/* 1. При клике на строку с фильмом элементу li добавляется класс movies__list-item_checked, 
при повторном клике этот класс удаляется. Выбрать можно любое количество строк. */
/* 2. После ввода текста в инпуте и нажатии кнопки в список добавляется новая строка с текстом и 
становится первым li в списке. */
/* 3. После нажатия на кнопку с крестиком строка с фильмом удаляется из списка. */
/* 4. Список фильмов может скроллится. */
/* 5. Серая подложка остается фиксированной. */

const inputMovieAdd = document.querySelector('.js-movies__input');
const btnAddMovie = document.querySelector('.js-movies__btn-add');
const moviesListContainer = document.querySelector('.js-movies__list');
const movieChecked = 'js-movies__list-item_checked';

// Обработчик клика по кнопке добавления фильма
btnAddMovie.addEventListener('click', function () {
    addMovie(); // Вызов функции для добавления фильма
});

// Обработчик события нажатия клавиш в инпуте
inputMovieAdd.addEventListener('keypress', function (event) {
    // Проверяем, была ли нажата клавиша Enter
    if (event.key === 'Enter') {
        event.preventDefault(); // Предотвращаем стандартное поведение (например, перевода на новую строку)
        addMovie(); // Вызов функции для добавления фильма
    }
});

// Функция для добавления фильма в список
function addMovie() {
    const movieToAdd = inputMovieAdd.value; // Получаем текст из инпута
    // Проверяем, не пустой ли ввод
    if (movieToAdd.trim() !== '') {
        // Создаем новый элемент списка
        const newMovieItem = document.createElement('li');
        newMovieItem.classList.add('js-movies__list-item', 'movies__list-item');

        newMovieItem.innerHTML = `
            <label class="movies__label">
                <input type="checkbox" class="input movies__checkbox" />
                <span class="movies__checkbox-real"></span>
                ${movieToAdd}
            </label>
            <img
                src="./cross.svg"
                alt="кнопка удалить фильм из списка"
                class="movies__list-item__cross"
            />
        `;

        // Добавляем новый элемент в начало списка
        moviesListContainer.insertBefore(newMovieItem, moviesListContainer.firstChild);

        // Очищаем инпут после добавления
        inputMovieAdd.value = '';

        // Добавление обработчика для нового чекбокса
        const newCheckbox = newMovieItem.querySelector('.movies__checkbox');
        newCheckbox.addEventListener('change', function () {
            const checkboxReal = newMovieItem.querySelector('.movies__checkbox-real');
            if (newCheckbox.checked) {
                newMovieItem.classList.add(movieChecked);
                checkboxReal.style.background = 'rgba(101, 50, 248, 1)'; // Добавляем фон
            } else {
                newMovieItem.classList.remove(movieChecked);
                checkboxReal.style.background = 'transparent'; // Удаляем фон
            }
        })
    }
}

// Обработчик клика для элементов списка
moviesListContainer.addEventListener('click', function (event) {
    // Проверка на клик по кнопке удаления
    const movieToDelete = event.target.closest('.movies__list-item__cross');
    if (movieToDelete) {
        movieToDelete.closest(".js-movies__list-item").remove(); // Удаляем строку из списка
        return; // Выходим из функции
    }

    const movieToWatch = event.target.closest('.js-movies__list-item');

    // Проверка на клик по строке фильма (li)
    if (movieToWatch) {
        const checkboxReal = movieToWatch.querySelector('.movies__checkbox-real');

        // Проверяем, есть ли класс и добавляем/удаляем его
        if (movieToWatch.classList.contains(movieChecked)) {
            movieToWatch.classList.remove(movieChecked);
            checkboxReal.style.background = 'transparent'; // Удаляем фон
        } else {
            movieToWatch.classList.add(movieChecked);
            checkboxReal.style.background = 'rgba(101, 50, 248, 1)'; // Добавляем фон
        }
    }
})


