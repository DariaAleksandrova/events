//инициализация
function initDropdown(container, data) {
    var html = '<div class="dropdown"><div class="dropdown-content"><span class="dropdownArrow"></span><input type="text" placeholder="Поиск..." data-value="" class="myInput" /><div class="dropdownList"></div></div></div>';
    container[0].innerHTML = html;
    addLabels(container[0],data);

    var dropdownLabels = document.querySelectorAll('.dropdownList label');
    dropdownLabels.forEach(function (dropdownLabel) {
        dropdownLabel.addEventListener('click', selectLabel);
    });

    var dropdownLists = document.querySelectorAll('.dropdownList');
    dropdownLists.forEach(function (dropdownList) {
        dropdownList.addEventListener('click', hideDropdownClick);
    });

    var inputs = document.querySelectorAll('.myInput');
    inputs.forEach(function (input) {
        input.addEventListener('click', openDropdownList);
        input.onkeyup = filter;
    });

    var inputArrows =  document.querySelectorAll('.dropdownArrow');
    inputArrows.forEach(function (inputArrow) {
        inputArrow.addEventListener('click', openDropdownList);
    });

    document.body.addEventListener('click', hideDropdownClick);
    window.addEventListener('resize', hideDropdownScrollAndResize);
    window.addEventListener('scroll', hideDropdownScrollAndResize);
}

//добавление элементов в список
function addLabels(container, data) {
    var items = JSON.parse(data);
    var newElement;
    items.forEach(function (item) {
        newElement = document.createElement('label');
        newElement.id = item.id;
        newElement.innerText = item.label;
        container.getElementsByClassName('dropdownList')[0].append(newElement);
    });
}

//открытие списка
function openDropdownList(e) {
    if(e.currentTarget.className === 'myInput') {
        var input = e.currentTarget;
    } else {
        var input = e.target.nextSibling;
    }
    var dropdownList = input.nextSibling;

    input.focus();
    if(!dropdownList.classList.contains('showed')) {
        showItems(dropdownList.childNodes);
        input.attributes["data-value"].value = input.value;
        updownOpen(input, dropdownList);
    }
}

//показать элементы
function showItems(items) {
    items.forEach(function (item) {
        item.classList.remove('hidden');
    });
}

//скрыть элемент
function hideItem(item) {
    item.classList.add('hidden');
}

//показать элемент
function showItem(item) {
    item.classList.remove('hidden');
}

//открытие списка вверх или вниз
function updownOpen(input, dropdownList) {
    var offsetHeight = dropdownList.offsetHeight;
    var windowHeight = window.innerHeight;
    var position = getCoords(input);
    var scroll = getDocumentScroll();
    if (windowHeight - position.top + scroll.top < offsetHeight + input.offsetHeight) {
        dropdownList.classList.add('openedTop')
    } else {
        dropdownList.classList.remove('openedTop');
    }
    dropdownList.classList.add("showed");
    input.value = "";
}

//фильтр
function filter(e) {
    var input = e.currentTarget;
    const filterValue = input.value.toUpperCase();
    var dropdownLabels = input.nextElementSibling.childNodes;

    dropdownLabels.forEach(function (dropdownLabel) {
        if (dropdownLabel.innerHTML.toUpperCase().indexOf(filterValue) === 0) {
            showItem(dropdownLabel);
        } else {
            hideItem(dropdownLabel);
        }
    });
}

//закрытие списка при нажатии на область вне элемента
function hideDropdownClick(e) {
    if(!e.target.matches('.dropdownList, .myInput, .dropdownArrow')) {
        hideDropdown(e);
    }
}

//скрываем дропдаун лист
function hideDropdown(e) {
    if (e) {
        if (e.target.tagName.toLowerCase() === 'label') {
            var dropdownList = e.target.parentElement;
            if (dropdownList.classList.contains('showed')) {
                var input = dropdownList.previousSibling;
                input.value = input.attributes["data-value"].value;
            }
            dropdownList.classList.remove("showed");
        } else {
            showDropdownLists(document.querySelectorAll('.dropdownList'));
        }
    } else {
        showDropdownLists(document.querySelectorAll('.dropdownList'));
    }
}

//обработчик скрытия всех дропдаунов на странице
function showDropdownLists(dropdownLists) {
    dropdownLists.forEach(function (dropdownList) {
        if (dropdownList.classList.contains('showed')) {
            var input = dropdownList.previousSibling;
            input.value = input.attributes["data-value"].value;
        }
        dropdownList.classList.remove("showed");
    });
}


//скрываем дробдаун на скол и ресайз
function hideDropdownScrollAndResize() {
    hideDropdown();
}



//выбор элемента в списке
function selectLabel(e) {
    var label = e.currentTarget;
    var input = label.parentElement.previousSibling;
    input.value = label.textContent;
    input.attributes["data-value"].value = input.value;
}

//получение данных о скроле
function getDocumentScroll() {
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    return {
        top: pageYOffset,
        bottom: pageYOffset + document.documentElement.clientHeight,
        height: scrollHeight
    };
}

//получение координат элемента
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

document.addEventListener('DOMContentLoaded', function() {
    initDropdown(document.getElementsByClassName('container'),jsonData);
    initDropdown(document.getElementsByClassName('container2'),jsonData);
});