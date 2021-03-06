const fruitsList = document.querySelector('.fruits__list');
const shuffleButton = document.querySelector('.shuffle__btn');
const filterButton = document.querySelector('.filter__btn');
const sortKindLabel = document.querySelector('.sort__kind');
const sortTimeLabel = document.querySelector('.sort__time');
const sortChangeButton = document.querySelector('.sort__change__btn');
const sortActionButton = document.querySelector('.sort__action__btn');
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const addActionButton = document.querySelector('.add__action__btn');

const minWeightFruit = document.querySelector('.minweight__input');
const maxWeightFruit = document.querySelector('.maxweight__input');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
    // TODO: очищаем fruitsList от вложенных элементов,
    // чтобы заполнить актуальными данными из fruits
    fruitsList.innerHTML = '';

    for (let i = 0; i < fruits.length; i++) {
        // TODO: формируем новый элемент <li> при помощи document.createElement,
        // и добавляем в конец списка fruitsList при помощи document.appendChild

        // создаю элемент li с классом "fruit__item" и дополняю класс цветом "fruit_color"
        let fruitLi = document.createElement('li');
        fruitLi.className = 'fruit__item';
        switch (fruits[i].color) {
            case "фиолетовый":
                fruitLi.className += ' fruit_violet';
                break;
            case "зеленый":
                fruitLi.className += ' fruit_green';
                break;
            case "розово-красный":
                fruitLi.className += ' fruit_carmazin';
                break;
            case "желтый":
                fruitLi.className += ' fruit_yellow';
                break;
            case "светло-коричневый":
                fruitLi.className += ' fruit_lightbrown';
                break;

            default:
                fruitLi.className += ' fruit_grey';
                break;
        }

        // вставляю элемент li
        fruitLi.innerHTML = `<div class = 'fruit__info'>
                        <div>index: ${i}</div>
                        <div>kind: ${fruits[i].kind}</div>
                        <div>color: ${fruits[i].color}</div>
                        <div>weight (кг): ${fruits[i].weight}</div>
                      </div>`;

        fruitsList.appendChild(fruitLi);
    }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
    let result = [];

    // копирование массива
    let oldFruits = fruits.slice();

    while (fruits.length > 0) {
        // TODO: допишите функцию перемешивания массива
        // Подсказка: находим случайный элемент из fruits, используя getRandomInt
        // вырезаем его из fruits и вставляем в result.
        // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
        // (массив fruits будет уменьшатся, а result заполняться)
        let fruitRandom = getRandomInt(0, fruits.length - 1);
        result.push(fruits.slice(fruitRandom, fruitRandom + 1)[0]);
        fruits.splice(fruitRandom, 1);
    }

    // вывод предупреждения, если массив не изменился
    fruits = result;
    if (JSON.stringify(oldFruits) === JSON.stringify(fruits)) {
        alert('Порядок не изменился!');
    }
};

// сортировка после перемешивания
shuffleButton.addEventListener('click', () => {
    sortTimeLabel.textContent = 'sorting...';
    shuffleFruits();
    display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
    fruits = fruits.filter((item) => {
        // TODO: допишите функцию 
        return (item.weight >= minWeightFruit.value && item.weight <= maxWeightFruit.value);
    });
};

// проверка диапазона фильтрации
filterButton.addEventListener('click', () => {
    if (isNaN(minWeightFruit.value) || isNaN(maxWeightFruit.value)) {
        alert('Введите положительные min и max weight для фильтрации!');
        return false;
    } else if (minWeightFruit.value <= 0 || maxWeightFruit.value <= 0) {
        alert('Введите положительные min и max weight для фильтрации!');
        return false;
    } else if (minWeightFruit.value > maxWeightFruit.value) {
        let temp = minWeightFruit.value;
        minWeightFruit.value = maxWeightFruit.value;
        maxWeightFruit.value = temp;
    }

    filterFruits();
    display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort';
let sortTime = '-';

const comparationColor = (a, b) => {
    // TODO: допишите функцию сравнения двух элементов по цвету

    // сортировка по алфавиту
    return a.color > b.color ? true : false;
};

const sortAPI = {
    bubbleSort(arr, comparation) {
        // TODO: допишите функцию сортировки пузырьком
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                if (comparation(arr[j], arr[j + 1])) {
                    let temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    },

    // функция обмена элементов
    swap(items, firstIndex, secondIndex) {
        const temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
    },

    // функция разделитель
    partition(items, left, right) {
        var pivot = items[Math.floor((right +
                let) / 2)],
            i = left;
        j = right;
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                this.swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    },

    quickSort(items, left, right) {
        // TODO: допишите функцию быстрой сортировки
        var index;
        if (items.length > 1) {
            left = typeof left != "number" ? 0 : left;
            right = typeof right != "number" ? items.length - 1 : right;
            index = this.partition(items, left, right);
            if (left < index - 1) {
                this.quickSort(items, left, index - 1);
            }
            if (index < right) {
                this.quickSort(items, index, right);
            }
        }
        return items;
    },

    // сортировка и замер времени
    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
    },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
    // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort' 
    sortKindLabel.textContent === 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
    sortTimeLabel.textContent = '-';
});

sortActionButton.addEventListener('click', () => {
    // TODO: вывести в sortTimeLabel значение 'sorting...'
    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    display();
    // TODO: вывести в sortTimeLabel значение sortTime
    sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
    // TODO: создание и добавление нового фрукта в массив fruits
    // берем значения из kindInput, colorInput, weightInput
    if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '') {
        alert('Заполните все поля!');
        return false;
    } else if (isNaN(weightInput.value)) {
        alert('Введите положительное число в поле weight!');
        return false;
    } else if (weightInput.value <= 0) {
        alert('Введите положительное число в поле weight!');
        return false;
    }
    let newFruit = {
        kind: kindInput.value,
        color: colorInput.value,
        weight: weightInput.value
    };
    fruits.push(newFruit);
    display();
});