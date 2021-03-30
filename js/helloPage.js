// helloPage


class helloPage {
    constructor() {
        this.mainPage = document.querySelector('#mainPage');
        this.root = document.querySelector('#root');
        this.income = document.querySelector('#income');
        this.saving = document.querySelector('#saving');
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
        // Навешивание обработчика на кнопку
        this.onSubmit();
    }
}

class rootElement extends helloPage {
    constructor() {
        super();
    }

    addAndRemoveClasses(selector) {
        selector.classList.add('hideModal');
        selector.style.display = 'none';
        selector.classList.remove('showModal');
    }

    addCounterSum() {
        this.budget.innerHTML = localStorage.getItem('counterIncome');
        this.savingMoney.innerHTML = localStorage.getItem('counterSaving');
    }

    render() {
        this.addAndRemoveClasses(this.modalBalance);
        this.addAndRemoveClasses(this.modalBudget);
        this.addAndRemoveClasses(this.modalExpenses);
        this.addCounterSum();
        this.addListenerClick();
        this.checkBudgetList();
        this.addListenersRange();
    }

    setAttributesScrol() {
        this.rangeInput.setAttribute('max', this.savingMoney.innerHTML);
        this.rangeInput.setAttribute('min', -this.budget.innerHTML);
    }

    addListenersRange() {
        this.rangeInput.removeEventListener('input', () => {
            this.rangeValue.value = this.rangeInput.value;
            this.setAttributesScrol();
        });
        this.rangeValue.removeEventListener('input', () => {
            this.rangeInput.value = this.rangeValue.value;
            checkCorrectData(this.rangeValue.value);
            this.setAttributesScrol();
        });
        const checkCorrectData = (data) => {
            if (+data < -this.budget.innerHTML) {
                this.rangeValue.value = -this.budget.innerHTML;
            } else if (+data > +this.savingMoney.innerHTML) {
                this.rangeValue.value = this.savingMoney.innerHTML;
            }
        }
        this.rangeInput.addEventListener('input', () => {
            this.rangeValue.value = this.rangeInput.value;
            this.setAttributesScrol();
        });
        this.rangeValue.addEventListener('input', () => {
            this.rangeInput.value = this.rangeValue.value;
            checkCorrectData(this.rangeValue.value);
            this.setAttributesScrol();
        });
        this.setAttributesScrol();
    }

    addCloseClasses(elementListener, elementWhoNeedDisplayNone) {
        elementListener.addEventListener('click', () => {
            elementWhoNeedDisplayNone.classList.add('hideModal');
            setTimeout(() => {
                elementWhoNeedDisplayNone.style.display = 'none';
            }, 1000);
            elementWhoNeedDisplayNone.classList.remove('showModal');
        });
    }

    addListenerOnAddTrigger(elementListener, elementWhoNeedDisplayFlex) {
        elementListener.addEventListener('click', (e) => {
            e.preventDefault();
            elementWhoNeedDisplayFlex.classList.add('showModal');
            elementWhoNeedDisplayFlex.style.display = 'flex';
            elementWhoNeedDisplayFlex.classList.remove('hideModal');
        });
    }

    addListenerClick() {
        this.addCloseClasses(this.closeModalBudget, this.modalBudget);
        this.addCloseClasses(this.closeModalScroll, this.modalBalance);
        this.addCloseClasses(this.closeModalExpense, this.modalExpenses);

        this.addListenerOnAddTrigger(this.add, this.modalBudget);
        this.addListenerOnAddTrigger(this.addScroll, this.modalBalance);
        this.addListenerOnAddTrigger(this.addExpenses, this.modalExpenses);

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
            this.addListenersRange();
        });

        this.addInUlExpense.addEventListener('click', () => {
            if (+this.counterExpense.value <= +this.budget.innerHTML) {
                this.expenseList.innerHTML += `
                <li>
                    <div>${this.itemExpense.value}</div>
                    <div>${this.counterExpense.value}</div>
                </li>
            `;
                this.expense.innerHTML -= this.counterExpense.value;
                localStorage.setItem('expense', this.expense.innerHTML);
                localStorage.setItem('expenseList', this.expenseList.innerHTML);
                localStorage.setItem('counterIncome', parseInt(this.budget.innerHTML) + parseInt(this.expense.innerHTML));
                this.budget.innerHTML = parseInt(this.budget.innerHTML) - parseInt(this.counterExpense.value);
                this.addListenersRange();
            } else if (+this.counterExpense.value > +this.budget.innerHTML) {
                const div = document.createElement('div');
                div.innerHTML = 'Недостаточно средств, попробуйте взять дополнительные средства из сбережений';
                div.style.marginTop = '7px';
                div.style.color = 'red';
                this.addInUlExpense.after(div);
                setTimeout(() => {
                    div.remove();
                }, 2000);
            }
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