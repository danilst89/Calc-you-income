// helloPage


class helloPage {
    constructor() {
        this.mainPage = document.querySelector('#mainPage');
        this.root = document.querySelector('#root');
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
            this.mainPage.style.display = 'none';
            this.root.style.display = 'block';
        }
    }

    onSubmit() {
        this.sendData.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('counterIncome', this.income.value);
            localStorage.setItem('counterSaving', this.saving.value);
            this.mainPage.style.display = 'none';
            this.root.style.display = 'block';
        });
    }

    render() {
        this.root.style.display = 'none';
        // Проверка localstorage
        this.checkLocalStorage()
        // Добавление на select обработчиков
        this.addListeners(this.select1, 'valueIncome');
        this.addListeners(this.select2, 'valueSaving');
        // Навешивание обработчика на кнопку
        this.onSubmit();
    }
}

class rootElement extends helloPage {
    constructor() {
        super();
        this.budget = document.querySelector('.budgetCounter');
        this.add = document.querySelector('.add');
        this.modalBudget = document.querySelector('.modalBudget');
        this.closeModalBudget = document.querySelector('.closeModal');
        this.addInUlBudget = document.querySelector('.addInUlBudget');
        this.budgetList = document.querySelector('.budgetList');
        this.itemBudget = 0;
        this.counterBudget = 0;
    }

    render() {
        this.modalBudget.classList.add('hideModal');
        this.modalBudget.style.display = 'none';
        this.modalBudget.classList.remove('showModal');
        this.budget.innerHTML = localStorage.getItem('counterSaving');
        this.addListenerClick();
    }

    addListenerClick() {
        this.closeModalBudget.addEventListener('click', () => {
            this.modalBudget.classList.add('hideModal');
            setTimeout(() => {
                this.modalBudget.style.display = 'none';
            }, 1000);
            this.modalBudget.classList.remove('showModal');
        });

        this.add.addEventListener('click', (e) => {
            e.preventDefault();
            this.modalBudget.classList.add('showModal');
            this.modalBudget.style.display = 'flex';
            this.modalBudget.classList.remove('hideModal');
        });

        this.addInUlBudget.addEventListener('click', () => {
            this.budgetList.innerHTML = ``
        });
    }
}

const hello = new helloPage();
hello.render();

const rootExtension = new rootElement();
rootExtension.render();