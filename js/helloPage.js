// helloPage


class helloPage {
    constructor() {
        this.root = document.querySelector('#mainPage');
        this.income = document.querySelector('#income');
        this.saving = document.querySelector('#saving');
        this.select1 = document.querySelector('#select1');
        this.select2 = document.querySelector('#select2');
        this.sendData = document.querySelector('#sendHelloPage');
    }

    addListeners(elementValidate, nameLocalStrorage) { // Добавлюю обработчики событий на inputы
        // Добавление на select
        localStorage.setItem(nameLocalStrorage, elementValidate.value);

        elementValidate.addEventListener('input', (e) => {
            localStorage.setItem(nameLocalStrorage, e.target.value);
        });
    }

    checkLocalStorage() {
        if (localStorage.getItem('counterIncome') && localStorage.getItem('counterSaving')) {
            this.root.style.display = 'none';
        }
    }

    onSubmit() {
        this.sendData.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('counterIncome', this.income.value);
            localStorage.setItem('counterSaving', this.saving.value);
            this.root.style.display = 'none';
        });
    }

    render() {
        // Проверка localstorage
        this.checkLocalStorage()
        // Добавление на select обработчиков
        this.addListeners(this.select1, 'valueIncome');
        this.addListeners(this.select2, 'valueSaving');
        // Навешивание обработчика на кнопку
        this.onSubmit();
    }
}

const hello = new helloPage();
hello.render();