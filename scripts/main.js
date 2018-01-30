//инициализация
function initDropdown(containers, data) {
    let oldValue = "";

    [].forEach.call(containers, function (container) {
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown-content');

        const dropdownArrow = document.createElement('span');
        dropdownArrow.classList.add('dropdownArrow');

        const dropdownInput = document.createElement('input');
        dropdownInput.type = 'text';
        dropdownInput.classList.add('myInput');

        const dropdownList = document.createElement('div');
        dropdownList.classList.add('dropdownList');

        container.appendChild(dropdown);

        dropdown.appendChild(dropdownContent);
        dropdownContent.appendChild(dropdownArrow);
        dropdownContent.appendChild(dropdownInput);
        dropdownContent.appendChild(dropdownList);

        addLabels(dropdownList,data);

        const dropdownLabels = dropdownContent.querySelectorAll('.dropdownList label');
        dropdownLabels.forEach(function (dropdownLabel) {
            dropdownLabel.addEventListener('click', selectLabel);
        });

        dropdownList.addEventListener('click', hideDropdownClick);
        dropdownArrow.addEventListener('click', openDropdownList);
        dropdownInput.addEventListener('click', openDropdownList);
        dropdownInput.onkeyup = filter;

        document.body.addEventListener('click', hideDropdownClick);
        window.addEventListener('resize', hideDropdown);
        window.addEventListener('scroll', hideDropdown);

        //добавление элементов в список
        function addLabels(container, data) {
            let items = JSON.parse(data);
            let newElement;
            items.forEach(function (item) {
                newElement = document.createElement('label');
                newElement.id = item.id;
                newElement.innerText = item.label;
                container.append(newElement);
            });
        }

        //открытие списка
        function openDropdownList() {
            dropdownInput.focus();
            if(!isVisible()) {
                showItems(dropdownList.childNodes);
                oldValue = dropdownInput.value;
                updownOpen(dropdownInput, dropdownList);
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
            let offsetHeight = dropdownList.offsetHeight;
            let windowHeight = window.innerHeight;
            let position = getCoords(input);
            let scroll = getDocumentScroll();
            if (windowHeight - position.top + scroll.top < offsetHeight + input.offsetHeight) {
                dropdownList.classList.add('openedTop')
            } else {
                dropdownList.classList.remove('openedTop');
            }
            dropdownList.classList.add("visible");
            dropdownInput.value = "";
        }

        //фильтр
        function filter() {
            const filterValue = dropdownInput.value.toUpperCase();
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
            let target = e.target;
            if(target !== dropdownInput && target !== dropdownList && target !== dropdownArrow) {
                hideDropdown(e);
            }
        }

        //скрываем дропдаун лист
        function hideDropdown() {
            if (isVisible()) {
                dropdownInput.value = oldValue;
            }
            dropdownList.classList.remove("visible");
        }

        //выбор элемента в списке
        function selectLabel(e) {
            let label = e.currentTarget;
            dropdownInput.value = label.textContent;
            oldValue = dropdownInput.value;
        }

        //получение данных о скроле
        function getDocumentScroll() {
            let scrollHeight = Math.max(
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
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
        function isVisible() {
            return dropdownList.classList.contains('visible');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initDropdown(document.getElementsByClassName('container'),jsonData);
    initDropdown(document.getElementsByClassName('container2'),jsonData);
});