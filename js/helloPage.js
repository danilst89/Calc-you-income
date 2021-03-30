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
        this.budget = document.querySelector('.budgetCounter');
        this.add = document.querySelector('.add');
        this.addScroll = document.querySelector('.addScroll');
        this.modalBudget = document.querySelector('.modalBudget');
        this.closeModalBudget = document.querySelector('.closeModal');
        this.addInUlBudget = document.querySelector('.addInUlBudget');
        this.budgetList = document.querySelector('.budgetList');
        this.itemBudget = document.querySelector('.itemBudget');
        this.counterBudget = document.querySelector('.counterBudget');
        this.savingMoney = document.querySelector('.savingMoney');
        this.modalBalance = document.querySelector('.modalBalance');
        this.closeModalScroll = document.querySelector('.closeModalScroll');
        this.rangeInput = document.querySelector('.rangeInput');
        this.rangeValue = document.querySelector('.rangeValue');
        this.addRangeButton = document.querySelector('.addRangeButton');
        this.modalExpenses = document.querySelector('.modalExpenses');
        this.addExpenses = document.querySelector('.addExpenses');
        this.closeModalExpense = document.querySelector('.closeModalExpense');
        this.addInUlExpense = document.querySelector('.addInUlExpense');
        this.expenseList = document.querySelector('.expenseList');
        this.itemExpense = document.querySelector('.itemExpense');
        this.counterExpense = document.querySelector('.counterExpense');
        this.expense = document.querySelector('.expenseCounter');
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
            this.budget.innerHTML = this.income.value;
            this.savingMoney.innerHTML = this.saving.value;
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
    }

    render() {
        this.modalBalance.classList.add('hideModal');
        this.modalBalance.style.display = 'none';
        this.modalBalance.classList.remove('showModal');
        this.modalBudget.classList.add('hideModal');
        this.modalBudget.style.display = 'none';
        this.modalBudget.classList.remove('showModal');
        this.modalExpenses.classList.add('hideModal');
        this.modalExpenses.style.display = 'none';
        this.modalExpenses.classList.remove('showModal');
        this.budget.innerHTML = localStorage.getItem('counterIncome');
        this.savingMoney.innerHTML = localStorage.getItem('counterSaving');
        this.addListenerClick();
        this.checkBudgetList();
        this.addListenersRange();
    }

    addListenersRange() {
        this.rangeInput.setAttribute('max', this.savingMoney.innerHTML);
        this.rangeInput.setAttribute('min', -this.budget.innerHTML);
        this.rangeInput.addEventListener('input', () => {
            this.rangeValue.value = this.rangeInput.value;
        });
        this.rangeValue.addEventListener('input', () => {
            this.rangeInput.value = this.rangeValue.value;
        })
    }

    addListenerClick() {
        this.closeModalBudget.addEventListener('click', () => {
            this.modalBudget.classList.add('hideModal');
            setTimeout(() => {
                this.modalBudget.style.display = 'none';
            }, 1000);
            this.modalBudget.classList.remove('showModal');
        });

        this.closeModalScroll.addEventListener('click', () => {
            this.modalBalance.classList.add('hideModal');
            setTimeout(() => {
                this.modalBalance.style.display = 'none';
            }, 1000);
            this.modalBalance.classList.remove('showModal');
        });

        this.closeModalExpense.addEventListener('click', () => {
            this.modalExpenses.classList.add('hideModal');
            setTimeout(() => {
                this.modalExpenses.style.display = 'none';
            }, 1000);
            this.modalExpenses.classList.remove('showModal');
        });

        this.add.addEventListener('click', (e) => {
            e.preventDefault();
            this.modalBudget.classList.add('showModal');
            this.modalBudget.style.display = 'flex';
            this.modalBudget.classList.remove('hideModal');
        });

        this.addScroll.addEventListener('click', (e) => {
            e.preventDefault();
            this.modalBalance.classList.add('showModal');
            this.modalBalance.style.display = 'flex';
            this.modalBalance.classList.remove('hideModal');
        });

        this.addExpenses.addEventListener('click', (e) => {
            e.preventDefault();
            this.modalExpenses.classList.add('showModal');
            this.modalExpenses.style.display = 'flex';
            this.modalExpenses.classList.remove('hideModal');
        });

        this.addInUlBudget.addEventListener('click', () => {
            this.budgetList.innerHTML += `
                <li>
                    <div>${this.itemBudget.value}</div>
                    <div>${this.counterBudget.value}</div>
                </li>
            `;
            localStorage.setItem('counterSaving', parseInt(localStorage.getItem('counterSaving')) + parseInt(this.counterBudget.value));
            localStorage.setItem('budgetList', this.budgetList.innerHTML);
            this.savingMoney.innerHTML = parseInt(this.savingMoney.innerHTML) + parseInt(this.counterBudget.value);
        });

        this.addInUlExpense.addEventListener('click', () => {
            this.expenseList.innerHTML += `
                <li>
                    <div>${this.itemExpense.value}</div>
                    <div>${this.counterExpense.value}</div>
                </li>
            `;
            this.expense.innerHTML -= this.counterExpense.value;
            localStorage.setItem('expense', this.expense.innerHTML);
            localStorage.setItem('expenseList', this.expenseList.innerHTML);
            localStorage.setItem('counterIncome', parseInt(this.budget.innerHTML) - parseInt(this.expense.innerHTML));
            this.budget.innerHTML = parseInt(this.budget.innerHTML) - parseInt(this.counterExpense.value);
        });

        this.addRangeButton.addEventListener('click', () => {
            if (this.rangeValue.value >= 0) {
                localStorage.setItem('counterIncome', parseInt(localStorage.getItem('counterIncome')) + parseInt(this.rangeValue.value));
                localStorage.setItem('counterSaving', parseInt(localStorage.getItem('counterSaving')) - parseInt(this.rangeValue.value));
                this.savingMoney.innerHTML = parseInt(this.savingMoney.innerHTML) - parseInt(this.rangeValue.value);
                this.budget.innerHTML = parseInt(this.budget.innerHTML) + parseInt(this.rangeValue.value);
            } else {
                localStorage.setItem('counterIncome', parseInt(localStorage.getItem('counterIncome')) + parseInt(this.rangeValue.value));
                localStorage.setItem('counterSaving', parseInt(localStorage.getItem('counterSaving')) - parseInt(this.rangeValue.value));
                this.savingMoney.innerHTML = parseInt(this.savingMoney.innerHTML) - parseInt(this.rangeValue.value);
                this.budget.innerHTML = parseInt(this.budget.innerHTML) + parseInt(this.rangeValue.value);
            }
        });
    }

    checkBudgetList() {
        if (localStorage.getItem('budgetList')) {
            this.budgetList.innerHTML = localStorage.getItem('budgetList');
        }
        if (localStorage.getItem('expenseList')) {
            this.expenseList.innerHTML = localStorage.getItem('expenseList');
        }
        if (localStorage.getItem('expense')) {
            this.expense.innerHTML = (localStorage.getItem('expense'));
        }
    }
}

const hello = new helloPage();
hello.render();

const rootExtension = new rootElement();
rootExtension.render();