
// при загрузке страницы проверяет хранилище. если ничего нет, то работает по дефолту. если есть, то меняет объект 
window.addEventListener('load', function(){
    if (localStorage.getItem('toDo') === null) {
        return
    } else {
        toDoLists = JSON.parse(localStorage.getItem('toDo'));
        calculateDataNum();
        render();
    }
})

// переменные
const newListInput = document.querySelector('.new-list__input');
const newListDiv = document.querySelector('.new-list__div');
const elementMain = document.querySelector('main');
let added = false;


// надо придумать метод. когда удаляешь лист, то все листы получают новый дата атрибут. с нулевого и по нарастающей

// чекбосы нужно сделать так checkbox: [[checkboxTitle, checkBoxId, checkbox-checked?][checkboxTitle2, checkboxId2, checkbox-checked?]]



let toDoLists = {
    dataNum: 0,
    lists: [
        // {
        //     listTitle: 'MyFirstTitle',
        //     listCounter: 0,
        //     listDataNum: 0,
        //     checkbox: [
        //         {
        //             checkboxTitle: 'test1',
        //             checkboxId: 'a0',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'test2',
        //             checkboxId: 'a1',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'test3',
        //             checkboxId: 'a2',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'test4',
        //             checkboxId: 'a3',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'test5',
        //             checkboxId: 'a4',
        //             checkboxState: false,
        //         },
        //     ],
        // },
        // {
        //     listTitle: 'MySecondTitle',
        //     listCounter: 0,
        //     listDataNum: 1,
        //     checkbox: [
        //         {
        //             checkboxTitle: 'secTest1',
        //             checkboxId: 'b5',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'secTest2',
        //             checkboxId: 'b6',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'secTest3',
        //             checkboxId: 'b7',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'secTest4',
        //             checkboxId: 'b8',
        //             checkboxState: false,
        //         },
        //         {
        //             checkboxTitle: 'secTest5',
        //             checkboxId: 'b9',
        //             checkboxState: false,
        //         },
        //     ],
        // }
    ]
}


// метод расчета нового числа для data атрибута
// закинул этот алгоритм для рассчета на объект из хранилища. тут нужен другой алгоритм
function calculateDataNum(){
    let max;
    for (let key in toDoLists.lists) {
        max = Number(key);
    }
    toDoLists.dataNum = max;
}

// метод расчета нового числа для data атрибута v2 (для добавления новых листов)
function calculateDataNum2(){
    let max;
    for (let key in toDoLists.lists) {
        max = Number(key) + 1;
    }
    if (max === undefined) {
        max = 0;
    }
    if (max < 0) {
        max = 0;
    }
    toDoLists.dataNum = max;
}

function addNewList(){
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
            // рассчитывает новый data number для листа
            calculateDataNum2();
            // пушит новый лист в массив для листов
            toDoLists.lists.push({
                listTitle: newListInput.value,
                listCounter: 0,
                listDataNum: toDoLists.dataNum,
                checkbox: [],
            })
            createdNewList();
            render();
        }
    })
}

addNewList();

function render(){
    elementMain.innerHTML = '';
    const list = toDoLists.lists;
    for (let key in list) {
        const generalContainer = createdNewList(list[key].listDataNum);
        const newList = createNewListContainer(list[key].listTitle, list[key].listCounter, list[key].listDataNum);
        generalContainer.appendChild(newList);
        for (let i = 0; i < list[key].checkbox.length; i++) {
            const newSubTask = checkbox(list[key].checkbox[i].checkboxTitle, list[key].checkbox[i].checkboxId, list[key].checkbox[i].checkboxState);
            newList.after(newSubTask);
        }
    }
}


// новый список для задач
function createdNewList(dataNum){
    const div = document.createElement('div');
    div.classList.add('added-list');
    // div.appendChild(createNewListContainer());
    // div.appendChild(inputSubTask());
    // div.appendChild(checkbox());
    div.setAttribute('data-num', `${dataNum}`);
    elementMain.prepend(div);
    return div;
}

// контейнер с названием и кнопкой добавления подзадачи
function createNewListContainer(listTitle, listCounter, dataNum){
    // контейнер где содержится див с названием листа и блоком для добавления подзадач
    const generalDiv = document.createElement('div');
    generalDiv.classList.add('added-list__container');

    // название и счетчик листа, кнопка Clean
    const titleDiv = document.createElement('div');
    const title = document.createElement('p');
    const counter = document.createElement('p');
    const clean = document.createElement('p');
    clean.textContent = 'Clean';
    titleDiv.setAttribute('data-num', `${dataNum}`);
    title.textContent = listTitle;
    counter.textContent = listCounter;
    title.classList.add('added-list__red-text');
    counter.classList.add('added-list__red-counter');
    clean.classList.add('added-list__red-clean');
    titleDiv.classList.add('added-list__red');
    titleDiv.appendChild(title);
    titleDiv.appendChild(counter);
    titleDiv.appendChild(clean);
    clean.style.display = 'none';

    // кнопка для добавления подзадач
    const addListItemDiv = document.createElement('div');
    addListItemDiv.setAttribute('data-num', `${dataNum}`);
    addListItemDiv.classList.add('added-list__list-item-div');
    addListItemDiv.textContent = '+ List item';
    addListItemDiv.style.display = 'none';

    generalDiv.appendChild(titleDiv);
    generalDiv.appendChild(addListItemDiv);
    return generalDiv;
}

// ипнут для ввода подзадачи юзера
function inputSubTask(){
    const div = document.createElement('div');
    div.classList.add('added-list__user-task');

    const input = document.createElement('input');
    input.classList.add('added-list__user-task__input');
    div.appendChild(input);

    const vector = document.createElement('div');
    vector.classList.add('added-list__user-task__vector-img');
    div.appendChild(vector);

    return div;
}

// готовый чекбокс из инпута подзадачи
function checkbox(title, id, state){
    const div = document.createElement('div');
    div.classList.add('added-list__checkbox-div');

    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', id);
    input.classList.add('added-list__checkbox-div-input');
    input.checked = state;
    div.appendChild(input);

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add('added-list__checkbox-div-label');

    const labelDiv = document.createElement('div');
    const inputValue = document.createElement('p');
    labelDiv.classList.add('checkbox-label');
    inputValue.classList.add('checkbox-text');
    inputValue.textContent = title;
    label.appendChild(labelDiv);
    label.appendChild(inputValue);

    div.appendChild(label);

    // если состояние чекбокса checked, то условие срабатывает и меняет стили
    if (input.checked) {
        labelDiv.classList.remove('checkbox-label');
        labelDiv.classList.add('checkbox-label-active');
        inputValue.classList.add('added-list__checkbox-div-label-active');
    }

    return div;
}

// инпут для чекбокса
function inputNewTask(connect){
    let uniqueId = Date.now();
    const div = document.createElement('div');
    div.classList.add('added-list__user-task');

    const input = document.createElement('input');
    input.classList.add('added-list__user-task__input');

    const vector = document.createElement('div');
    vector.classList.add('added-list__user-task__vector-img');

    function inp(){
        if(input.value !== '') {
            vector.classList.remove('added-list__user-task__vector-img');
            vector.classList.add('added-list__user-task__vector-img-active');
        } else {
            vector.classList.remove('added-list__user-task__vector-img-active');
            vector.classList.add('added-list__user-task__vector-img');
        }
        if (input.value.length === 30) {
            input.value = input.value.slice(0, -1);
        }
    }
    input.addEventListener('input', inp);

    function vec(){
        if (vector.classList.contains('added-list__user-task__vector-img-active')) {
            // добавляет новый чекбокс в объект 
            toDoLists.lists[Number(vector.parentElement.parentElement.dataset.num)].listCounter += 1;
            toDoLists.lists[Number(vector.parentElement.parentElement.dataset.num)].checkbox.push({
                checkboxTitle: input.value,
                checkboxId: uniqueId,
                checkboxState: false,
            });
            added = false;

            div.parentNode.replaceChild(checkbox(input.value, uniqueId), div);
            
            vector.removeEventListener('click', vec);
            input.removeEventListener('input', inp);
            render();
        }
    }
    vector.addEventListener('click', vec);

    div.appendChild(input);
    div.appendChild(vector);
    connect.after(div);
    return div;
}

// движ на странице здесь
elementMain.addEventListener('click', event => {
    // это нужно для работы чекбоксов на странице
    if (event.target.classList.contains('added-list__checkbox-div-input')) {
        const dataNum = Number(event.target.parentNode.parentNode.dataset.num);
        for (let i = 0; i < toDoLists.lists.length; i++) {
            for (let j = 0; j < toDoLists.lists[i].checkbox.length; j++) {
                if (toDoLists.lists[i].listDataNum == dataNum) {
                    if (toDoLists.lists[i].checkbox[j].checkboxId == event.target.id) {
                        toDoLists.lists[i].checkbox[j].checkboxState = !toDoLists.lists[i].checkbox[j].checkboxState;
                    }
                }
            }
        }
        render();
    }
    // это нужно чтобы листы становились активными при нажатии на них
    if (event.target.classList.contains('added-list__red') || event.target.classList.contains('added-list__red-text') || event.target.classList.contains('added-list__red-counter')) {
        let dataNum = 0;
        // при клике обнаруживает номер дата атрибута
        if (event.target.classList.contains('added-list__red-text')) {
            dataNum = event.target.parentNode.dataset.num;
        }
        if (event.target.classList.contains('added-list__red-counter')) {
            dataNum = event.target.parentNode.dataset.num;
        }
        if (event.target.classList.contains('added-list__red')) {
            dataNum = event.target.dataset.num;
        }
        // по дата атрибуту меняет состояние листа
        for (let item in toDoLists.lists) {
            elementMain.querySelector(`[data-num="${toDoLists.lists[item].listDataNum}"]`).querySelector('.added-list__red').classList.remove('added-list-red');
            elementMain.querySelector(`[data-num="${toDoLists.lists[item].listDataNum}"]`).querySelector('.added-list__list-item-div').style.display = 'none';
            elementMain.querySelector(`[data-num="${toDoLists.lists[item].listDataNum}"]`).querySelector('.added-list__red-clean').style.display = 'none';
        }
        elementMain.querySelector(`[data-num='${dataNum}']`).querySelector('.added-list__red').classList.add('added-list-red');
        elementMain.querySelector(`[data-num='${dataNum}']`).querySelector('.added-list__list-item-div').style.display = 'block';
        elementMain.querySelector(`[data-num="${dataNum}"]`).querySelector('.added-list__red-clean').style.display = 'block';
    }
    // при нажатии по + List item добавляет инпут для нового таска
    if (event.target.classList.contains('added-list__list-item-div')) {
        let dataNum = 0;
        dataNum = event.target.dataset.num;
        if (added === false) {
            inputNewTask(elementMain.querySelector(`[data-num='${dataNum}']`).querySelector('.added-list__container'));
            added = true;
        }
    }
    // появление модального окна
    if (event.target.classList.contains('added-list__red-clean')) {
        // передает название листа по которому кликнул юзер
        const listTitle = event.target.parentElement.parentElement.parentElement.querySelector('.added-list__red-text').textContent;
        const currentListData = Number(event.target.parentElement.parentElement.parentElement.dataset.num);
        popupContent.addEventListener('click', modalWindow(listTitle, currentListData));
    }
});

// модальное окно для удаления тасков или листа
const popupContent = document.querySelector('.popup__content');
const removeCompletedItemsInput = popupContent.querySelector(`[data-label='items']`);
const removeListInput = popupContent.querySelector(`[data-label='list']`);
const popupText = popupContent.querySelector('p');


// все операции связанные с модальным окном находятся здесь
function modalWindow(title, listData){
    popupContent.parentElement.style.display = 'block';
    popupText.textContent = `What do you want to do with ${title}?`;
    // возвращаю функцию чтобы получить параметры при передаче колбеком в слушатель событий
    return function listener(event){
        if (event.target.dataset.label === 'items') {
            if (removeCompletedItemsInput.checked) {
                event.target.parentElement.querySelector('div').classList.add('popup__div-active');
            } else {
                event.target.parentElement.querySelector('div').classList.remove('popup__div-active');
            }
        }
        if (event.target.dataset.label === 'list') {
            if(removeListInput.checked) {
                event.target.parentElement.querySelector('div').classList.add('popup__div-active');
            } else {
                event.target.parentElement.querySelector('div').classList.remove('popup__div-active');
            }
        }
        // при нажатии по кнопке отмены ничего не происходит. модальное окно закрывается
        if (event.target.id === 'cancel') {
            popupContent.parentElement.style.display = 'none';
            popupContent.removeEventListener('click', listener);
        }
        // при нажатии на подтверждение происходит много всего
        if (event.target.id === 'confirm') {
            if (removeCompletedItemsInput.checked) {
                let listCounter = 0;
                let currentIndex;
                const checkboxArray = [];
                for (let i = 0; i < toDoLists.lists.length; i++) {
                    if (toDoLists.lists[i].listDataNum == listData) {
                        currentIndex = toDoLists.lists[i].listDataNum;
                    }
                }
                for (let i = 0; i < toDoLists.lists[currentIndex].checkbox.length; i++) {
                    if (toDoLists.lists[currentIndex].checkbox[i].checkboxState === false) {
                        checkboxArray.push(toDoLists.lists[currentIndex].checkbox[i]);
                    }
                    if (toDoLists.lists[currentIndex].checkbox[i].checkboxState === true) {
                        listCounter++;
                    }
                }
                toDoLists.lists[currentIndex].checkbox = checkboxArray;
                for (let i = 0; i < toDoLists.lists.length; i++) {
                    if (toDoLists.lists[i].listDataNum == listData) {
                        toDoLists.lists[i].listCounter -= listCounter;
                    }
                }
                render();
                popupContent.parentElement.style.display = 'none';
                popupContent.removeEventListener('click', listener);
            } 
            if (removeListInput.checked) {
                for (let i = 0; i < toDoLists.lists.length; i++) {
                    if (toDoLists.lists[i].listDataNum == listData) {
                        toDoLists.lists.splice(i, 1);
                    }
                }
                render();
                popupContent.parentElement.style.display = 'none';
                popupContent.removeEventListener('click', listener);
            }
            if (removeCompletedItemsInput.checked && removeListInput.checked) {
                for (let i = 0; i < toDoLists.lists.length; i++) {
                    if (toDoLists.lists[i].listDataNum == listData) {
                        toDoLists.lists.splice(i, 1);
                    }
                }
                render();
                popupContent.parentElement.style.display = 'none';
                popupContent.removeEventListener('click', listener);
            }
        }
    }
}


// объект с задачами помещается в локальное хранилище при уходе со страницы 
window.addEventListener('unload', function(){
    const str = JSON.stringify(toDoLists);
    localStorage.setItem('toDo', str);
});