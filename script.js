


// переменные
const newListInput = document.querySelector('.new-list__input');
const newListDiv = document.querySelector('.new-list__div');
const elementMain = document.querySelector('main');
const footer = document.querySelector('footer');

// переменные для инпута подзадачи пользователя subTask. содержимое инпута для преобразования в чекбокс и счетчик для разных id

let subTaskValue;
let subTaskId = -1;


// массив для added-list__container (контейнера с названием, счетчиком главного таска и + list item) и массив для блоков + List item
const divTitleArray = [];
const listItemArray = [];


let generalTaskCounter = -1;

// не завершенные инпуты пользователя. не написал и перезагрузил - значит не нужно было, удаляем

const inputNotCompleted = document.querySelectorAll('#notCompleted');
const inputNotCompletedArr = [];


// тут псевдомассивы. при загрузке страницы смотрит есть что нибудь или нет
const divTitleArray1 = document.querySelectorAll('.added-list__red');
const listItemArray1 = document.querySelectorAll('.added-list__list-item-div');
// внести все существующие элементы для переключения в массив
for (let i = 0; i < divTitleArray1.length; i++) {
    divTitleArray.push(document.querySelector(`#generalTaskTitle${i}`));
    listItemArray.push(document.querySelector(`#list-item${i}`));
}

// массив для added-list__container, added-list__list-item-div, added-list__checkbox-div-input и др.
const listItemArr = []; // added-list__list-item-div
const listContainerArray = []; // added-list__container
const checkboxInputArray = []; // added-list__checkbox-div-input

// чекбоксы
const checkboxArr = document.querySelectorAll('.added-list__checkbox-div-input'); // все чекбоксы на странице
const checkboxDiv = []; // все флажки чекбоксов
const checkboxText = []; // все текстовые значения чекбоксов


// применяется чтобы перезаписывать дата атрибут собой. используется в функции со слушателем на окне, надеюсь дальше вспомнишь 
// как шла мысля. я объяснить тут наврядли смогу, читай что написал. извини что код такой отвратительный, я старался :с
let count;



// массив для текста в блоке + List item 

const listItemParray = [];

// массивы которые собирают создаваемые элементы. нужны мне для работы с localStorage (дальше будет понятно зачем)

const listItemStorageArray = [];
const addedListContainerArray = [];

listItemStorageArray.push(document.querySelectorAll('.added-list__list-item-div'));
addedListContainerArray.push(document.querySelectorAll('.added-list__container'));


const toDoLists = {
    lists: [
        {
        //     listName: 'name',
        //     listId: 0,
        //     listDataNum: 0,
        //     listCounter: 0,
            // actions: [],
            // actionsId: [],
        }
    ]
}



// поменял событие keydown на input. теперь работает корректнее
function addNewList () {
    newListInput.addEventListener('focus', function () {
        this.style.outline = 'none';
    })
    newListInput.addEventListener('input', function () {
        newListDiv.classList.add('new-list__div-active');
        if (newListInput.value === '') {
            newListDiv.classList.remove('new-list__div-active');
        } 
    })
    newListDiv.addEventListener('click', function () {
        if (newListDiv.classList.contains('new-list__div-active')) {
            // тут должны быть блоки которые добавляются при нажатии по активированному new list
            addedList(footer);
        }
    })
}

addNewList();

// создание общего дива с задачами юзера. added-list 
function addedList (connection) {
    const div = document.createElement('div');
    div.classList.add('added-list');
    connection.appendChild(div);
    generalTask(div);
}

// название общей задачи и счетчик подзадач, добавление подзадачи + List item
function generalTask (connection) {
    let check = true;
    let countTask = 0;
    let title = newListInput.value;
    const div = document.createElement('div');
    // divTitle это элемент <p> который содержит название и счетчик общего таска. он помещается в контейнер
    const divTitle = document.createElement('p');
    generalTaskCounter++;
    // div3 - контейнер в который вложены два элемента <p> название задачи и счетчик
    const div3 = document.createElement('div');
    div3.classList.add('added-list__red');
    const taskCounter = document.createElement('p');
    taskCounter.classList.add('added-list__red-counter');
    taskCounter.setAttribute('data-num', generalTaskCounter); 
    taskCounter.setAttribute('id', `taskCounter${generalTaskCounter}`);
    taskCounter.textContent = countTask;
    divTitle.classList.add('added-list__red-text');
    div.classList.add('added-list__container');
    div.setAttribute('data-num', generalTaskCounter);
    div.setAttribute('id', `list${generalTaskCounter}`);
    div3.setAttribute('data-num', generalTaskCounter);
    div3.setAttribute('id', `generalTaskTitle${generalTaskCounter}`);
    divTitle.textContent = `${title}`;
    div3.appendChild(divTitle);
    div3.appendChild(taskCounter);
    divTitleArray.push(div3);
    // div2 это блок с элементом <p> при нажатии по которому добавляется новая подзадача в общий таск. + List item
    const div2 = document.createElement('div');
    const listItemP = document.createElement('p');
    div2.classList.add('added-list__list-item-div');
    div2.setAttribute('data-num', generalTaskCounter);
    // listItemP.classList.add('added-list__list-item-p');
    div2.textContent = '+ List item';
    listItemP.setAttribute('data-num', generalTaskCounter);
    div2.setAttribute('id', `list-item${generalTaskCounter}`); // div2 это блок + List item
    // div2.appendChild(listItemP);
    listItemArray.push(div2);
    div2.style.display = 'none';

    // записывает данные в объект 
    toDoLists.lists[generalTaskCounter] = {
        listContainerId: `list${generalTaskCounter}`, // id блока нового листа (в котором название листа и + List item)
        listContainerDataNum: generalTaskCounter, // data-num блока нового листа (в котором название листа и + List item)
        listName: title, // название нового листа
        listId: `generalTaskTitle${generalTaskCounter}`, // id дива с названием и счетчиком нового листа
        listDataNum: generalTaskCounter, // data-num дива с названием и счетчиком нового листа
        listCounter: countTask, // счетчик около названия нового листа. бесполезно, когда страница закрывается надо записать число сюда!!!
        addListItemPDataNum: generalTaskCounter, // data-num текста в блоке + List item
        addListItemId: `list-item${generalTaskCounter}`, // id блока + List item
        addListDataNum: generalTaskCounter, // data-num блока + List item

         // cоздание массивов для чекбоксов
        actions: [], // названия чекбоксов листа
        actionsId: [], // id чекбоксов листа
    }

    // при клике по + List item происходят ниже описанные действия
    div2.addEventListener('click', function () {
        if (check) {
            countTask++;
            taskCounter.textContent = countTask;
            check = false;
    // инпут подзадачи пользователя
    function subTask (connection) {
        subTaskId++;
    const div = document.createElement('div');
    div.classList.add('added-list__user-task');
    const input = document.createElement('input');
    input.classList.add('added-list__user-task__input');
    const vector = document.createElement('div');
    vector.classList.add('added-list__user-task__vector-img');
    div.setAttribute('id', 'notCompleted');
    input.addEventListener('input', function () {
        vector.classList.add('added-list__user-task__vector-img-active');
        if (input.value === '') {
            vector.classList.remove('added-list__user-task__vector-img-active');
        } 
        if (input.value.length === 26) {
            input.value = input.value.slice(0, -1);
        }
    })
    vector.addEventListener('click', function () {
        if (vector.classList.contains('added-list__user-task__vector-img-active')) {
            div.removeAttribute('id', 'notCompleted');
            subTaskValue = input.value;
            
            
            
            input.remove();
            vector.remove();
            check = true;
            subTaskLabel(div);
        }
    })
    div.appendChild(input);
    div.appendChild(vector);
    connection.after(div);
}

    // постарался отделить отдельный блок кода чтобы было более читабельно. изначально все функции были отделены друг от друга, но
    // но в ходе модифицирования и исправления багов мне пришлось перестроить архитектуру проекта. выглядит отвратительно, но работает
    // надеюсь в этот код никто не полезет, я сам его боюсь
    // вызов функции подзадачи пользователя
    subTask(div);

        } 
    })
    // при клике по generalTask окрашивает блок в красный цвет и меняет цвет текста на белый
    div.addEventListener('click', function () {
        div3.classList.add('added-list-red');
        div2.style.display = 'block';
    })
    div.appendChild(div3);
    div.appendChild(div2);
    connection.appendChild(div);
}

// label для чекбокса подзадачи который создается из инпута
function subTaskLabel (connection) {
    const label = document.createElement('label');
    label.classList.add('added-list__checkbox-div-label');
    label.setAttribute('for', 'checkbox' + subTaskId);
    const div = document.createElement('div');
    div.classList.add('checkbox-label');
    const p = document.createElement('p');
    const input = document.createElement('input');
    input.classList.add('added-list__checkbox-div-input');
    input.setAttribute('id', 'checkbox' + subTaskId);
    input.setAttribute('type', 'checkbox');
    p.classList.add('checkbox-text');
    p.textContent = subTaskValue;
    

    

    input.addEventListener('click', function () {
        if (input.checked) {
            input.setAttribute('checked', true);
            div.classList.add('checkbox-label-active');
            p.classList.add('added-list__checkbox-div-label-active');
        } else {
            input.removeAttribute('checked', true);
            div.classList.remove('checkbox-label-active');
            p.classList.remove('added-list__checkbox-div-label-active');
        }
    })
    label.appendChild(div);
    label.appendChild(p);
    connection.appendChild(input);
    connection.appendChild(label);
}



// слушатель нажатий прикрепленный за окном, который активирует общие таски
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('added-list__red')) {
        count = event.target.dataset.num;
        for (let i = 0; i < divTitleArray.length; i++) {
            divTitleArray[i].classList.remove('added-list-red');
            listItemArray[i].style.display = 'none';
        }
        divTitleArray[count].classList.add('added-list-red');
        listItemArray[count].style.display = 'block';
    }
})

window.addEventListener('change', function () {
    console.log(toDoLists)
    // псевдомассив текста в блоке + List item
    const psevdoListItem = document.querySelectorAll('.added-list__list-item-p');
    for (let i = 0; i < psevdoListItem.length; i++) {
        listItemParray[i] = psevdoListItem[i];
        listItemParray[i].removeEventListener('click', function () {
            
            // запись данных в объект
            toDoLists.lists[listItemParray[i].dataset.num].actionsId.push(`checkbox${subTaskId}`); // id чекбоксов листа

            // запись данных в объект
            toDoLists.lists[listItemParray[i].dataset.num].actions.push(subTaskValue); // названия чекбоксов листа
        })
        listItemParray[i].addEventListener('click', function () {
            
            // запись данных в объект
            toDoLists.lists[listItemParray[i].dataset.num].actionsId.push(`checkbox${subTaskId}`); // id чекбоксов листа

            // запись данных в объект
            toDoLists.lists[listItemParray[i].dataset.num].actions.push(subTaskValue); // названия чекбоксов листа
        })
    }
    console.log(listItemParray);
})

function oneTime () {
    window.addEventListener('click', function (event) {
        let num;
        if (event.target.classList.contains('added-list__list-item-p')) {
            num = event.target.dataset.num;
            if (subTaskValue !== undefined) {
                // запись данных в объект
                toDoLists.lists[Number(num)].actions.push(subTaskValue); // названия чекбоксов листа
            }

            
            // запись данных в объект
            toDoLists.lists[Number(num)].actionsId.push(`checkbox${subTaskId}`); // id чекбоксов листа
        }
    })
}

// oneTime();

// здесь зона localStorage

// window.addEventListener('unload', function () {
//     for (let i = 0; i < divTitleArray.length; i++) {
//         divTitleArray[i].classList.remove('added-list-red');
//         listItemArray[i].style.display = 'none';
//     }
//     for (let i = 0; i < inputNotCompleted.length; i++) {
//         inputNotCompletedArr.push(document.querySelector('#notCompleted'));
//         inputNotCompletedArr[i].remove();
//     }
//     localStorage.setItem('subTaskId', subTaskId);
//     localStorage.setItem('generalTaskCounter', generalTaskCounter);
// })

// если футер содержит элемент не активированного импута, то инпут нужно удалить и сохранить версию верстки без него в localStorage

// window.addEventListener('load', function () {
//     if (localStorage.getItem('subTaskId') === null || localStorage.getItem('subTaskId') === NaN) {
//         subTaskId = -1;
//     } else {
//         subTaskId = localStorage.getItem('subTaskId');
//     }
//     // generalTaskCounter = localStorage.getItem('generalTaskCounter');
//     // subTaskId = localStorage.getItem('subTaskId');


//     for (let i = 0; i < addedListContainerArray[0].length; i++) {
//         listContainerArray.push(document.querySelector(`#list${i}`));
//         listItemArr.push(document.querySelector(`#list-item${i}`));
//     }
//     for (let i = 0; i < addedListContainerArray[0].length; i++) {
//         let check = true;
//         listItemArr[i].addEventListener('click', function () {
//             if (check) {
//                 check = false;
//                 subTaskId++;
//                 const counter = document.querySelector(`#taskCounter${i}`);
//                 let countNum = counter.textContent;
//                 counter.textContent = Number(countNum) += 1;
//                 const div = document.createElement('div');
//                 div.classList.add('added-list__user-task');
//                 const input = document.createElement('input');
//                 input.classList.add('added-list__user-task__input');
//                 const vector = document.createElement('div');
//                 vector.classList.add('added-list__user-task__vector-img');
//                 input.addEventListener('input', function () {
//                     vector.classList.add('added-list__user-task__vector-img-active');
//                     if (input.value === '') {
//                         vector.classList.remove('added-list__user-task__vector-img-active');
//                     } 
//                     if (input.value.length === 26) {
//                         input.value = input.value.slice(0, -1);
//                     }
//                 })
//                 vector.addEventListener('click', function () {
//                     if (vector.classList.contains('added-list__user-task__vector-img-active')) {
//                         subTaskValue = input.value;
//                         input.remove();
//                         vector.remove();
//                         check = true;
//                         subTaskLabel(div);
//                     }
//                 })
//                 div.appendChild(input);
//                 div.appendChild(vector);
//                 listContainerArray[i].after(div);
//             }
//         })
//     }
//     // оживление чекбоксов
//     for (let i = 0; i < checkboxArr.length; i++) {
//         checkboxInputArray.push(document.querySelector(`#checkbox${i}`));
//         checkboxDiv.push(document.querySelector(`#checkboxDiv${i}`));
//         checkboxText.push(document.querySelector(`#checkboxText${i}`));
//     }
//     for (let i = 0; i < checkboxInputArray.length; i++) {
//         checkboxInputArray[i].addEventListener('click', function () {
//             if (checkboxInputArray[i].checked) {
//                 checkboxInputArray[i].setAttribute('checked', true);
//                 checkboxDiv[i].classList.add('checkbox-label-active');
//                 checkboxText[i].classList.add('added-list__checkbox-div-label-active');
//             } else {
//                 checkboxInputArray[i].removeAttribute('checked', true);
//                 checkboxDiv[i].classList.remove('checkbox-label-active');
//                 checkboxText[i].classList.remove('added-list__checkbox-div-label-active');
//             }
//         })
//     }
// })