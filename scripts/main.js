window.addEventListener('click', hideDropdown);
window.addEventListener('resize', hideDropdown);
window.onscroll = hideDropdown;
window.addEventListener('click', selectLabel);
window.addEventListener('click', openDpList);



document.addEventListener('DOMContentLoaded', function() {
    dpList = document.getElementById("dropdownList");
    input = document.getElementById("myInput");
    input.onkeydown = filterFunction;
    oldInputValue = '';
    // открытие списка при нажатии на поле
    addLabels();
    dpLabel = dpList.getElementsByTagName("label");
});

// открытие списка вверх
function openDpList(e) {
    if(e.target.matches('#myInput, .dropdownArrow')) {
        input.focus();
        if(!dpList.classList.contains('show')) {
            for (i = 0; i < dpLabel.length; i++) {
                dpLabel[i].style.display = "";
            }
            oldInputValue = input.value;
            var h = dpList.offsetHeight;
            var wh = window.innerHeight;
            var pos = getCoords(input);
            var scroll = getDocumentScroll();
            if (wh - pos.top + scroll.top < h + input.offsetHeight) {
                dpList.classList.add('openTop')
            } else {
                dpList.classList.remove('openTop');
            }
            dpList.classList.add("show");
            input.value = "";
        }
    }
}

//фильтр
function filterFunction() {
    var filter, i;
    filter = input.value.toUpperCase();
    for (i = 0; i < dpLabel.length; i++) {
        if (dpLabel[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            dpLabel[i].style.display = "";
        } else {
            dpLabel[i].style.display = "none";
        }
    }
}

//закрытие списка при нажатии на область вне элемента
function hideDropdown(e) {
    if(e.type == 'scroll' || e.type == 'resize' || !e.target.matches('#dropdownList, #myInput')) {
        dpList.classList.remove("show");
        input.value = oldInputValue;
    }
}

function addLabels() {
    var lbls = '';
    var l = JSON.parse(labels);
    for (key in l) {
      if (l.hasOwnProperty(key)) {
        lbls += '<label id="' + key + '">' + l[key].label + '</label>';
      }
    }
    dpList.innerHTML = lbls;
}

function selectLabel(e) {
    if(e.target.matches('#dropdownList label')) {
        input.value = e.target.textContent;
        oldInputValue = input.value;
    }
}

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

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}