// helloPage


class rootClass {
    constructor() {
        this.mainPage = document.querySelector('#mainPage');
        this.root = document.querySelector('#root');
        this.income = document.querySelector('#income');
        this.saving = document.querySelector('#saving');
        this.sendData = document.querySelector('.sendHelloPage');
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

    addErrorMessage(message, afterElement) {
        const div = document.createElement('div');
        div.innerHTML = message;
        div.style.marginTop = '7px';
        div.style.color = 'red';
        afterElement.after(div);
        setTimeout(() => {
            div.remove();
        }, 2000);
    }

    checkLocalStorage() {
        if (localStorage.getItem('counterIncome') && localStorage.getItem('counterSaving')) {
            this.mainPage.style.display = 'none';
            this.root.style.display = 'block';
        }
    }

    addAndRemoveClasses(selector) {
        selector.classList.add('hideModal');
        selector.style.display = 'none';
        selector.classList.remove('showModal');
    }

    addListenerOnAddTrigger(elementListener, elementWhoNeedDisplayFlex) {
        elementListener.addEventListener('click', (e) => {
            e.preventDefault();
            elementWhoNeedDisplayFlex.classList.add('showModal');
            elementWhoNeedDisplayFlex.style.display = 'flex';
            elementWhoNeedDisplayFlex.classList.remove('hideModal');
        });
    }

    addCloseClasses(elementListener, elementWhoNeedDisplayNone, inputsClassListDelete) {
        elementListener.addEventListener('click', () => {
            elementWhoNeedDisplayNone.classList.add('hideModal');
            setTimeout(() => {
                elementWhoNeedDisplayNone.style.display = 'none';
                inputsClassListDelete.forEach(item => {
                item.classList.remove('errorBorder');
            });
            }, 1000);
            elementWhoNeedDisplayNone.classList.remove('showModal');
        });
    }

    addValidateOnExpenseInputs(input) {
        input.addEventListener('input', () => {
            if (input.value == '') {
                input.classList.add('errorBorder');
            } else if (input.value != '') {
                input.classList.remove('errorBorder');
            }
        });
    }

    addInnerHTML(selectorInner, item, counter) {
        selectorInner.innerHTML += `
            <li>
                <div>${item.value}</div>
                <div>${counter.value}</div>
            </li>
        `;
    }

    onSubmit() {
        this.sendData.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.income.value != '' && this.saving.value != '') {
                localStorage.setItem('counterIncome', this.income.value);
                localStorage.setItem('counterSaving', this.saving.value);
                this.budget.innerHTML = this.income.value;
                this.savingMoney.innerHTML = this.saving.value;
                this.mainPage.style.display = 'none';
                this.root.style.display = 'block';
            } else {
                if (this.income.value == '' && this.saving.value == '') {
                    this.income.classList.add('errorBorder');
                    this.saving.classList.add('errorBorder');
                } else if (this.saving.value == '') {
                    this.saving.classList.add('errorBorder');
                } else if (this.income.value == '') {
                    this.income.classList.add('errorBorder');
                }
                this.addErrorMessage('Поля не должны быть пусты', this.sendData);
            }
        });
    };

    addValidateInputs(item, counter) {
        if (item.value == '' && counter.value == '') {
            item.classList.add('errorBorder');
            counter.classList.add('errorBorder');
        } else if (item.value == '') {
            item.classList.add('errorBorder');
        } else if (counter.value == '') {
            counter.classList.add('errorBorder');
        }
    }

    deleteValidateInputs(item, counter) {
        item.classList.remove('errorBorder');
        counter.classList.remove('errorBorder');
    }

    addCounterSum() {
        this.budget.innerHTML = localStorage.getItem('counterIncome');
        this.savingMoney.innerHTML = localStorage.getItem('counterSaving');
    };

    checkInnerList() {
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

    render() {
        this.root.style.display = 'none';
        // Проверка localstorage
        this.checkLocalStorage();
        // Навешивание обработчика на кнопку
        this.onSubmit();
        this.addCounterSum()
    }
}
class rootElement extends rootClass {
    constructor() {
        super();
    }

    // scroll
    setAttributesScrol() {
        this.rangeInput.setAttribute('max', this.savingMoney.innerHTML);
        this.rangeInput.setAttribute('min', -this.budget.innerHTML);
    }

    // scroll
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

    //budget
    deleteValidateInputs() {
        this.itemBudget.classList.remove('errorBorder');
        this.counterBudget.classList.remove('errorBorder');
    }

    // каша
    addListeners() {
        this.addCloseClasses(this.closeModalBudget, this.modalBudget, [this.itemBudget, this.counterBudget]);
        this.addCloseClasses(this.closeModalScroll, this.modalBalance, [this.rangeValue]);
        this.addCloseClasses(this.closeModalExpense, this.modalExpenses, [this.itemExpense, this.counterExpense]);

        this.addListenerOnAddTrigger(this.add, this.modalBudget);
        this.addListenerOnAddTrigger(this.addScroll, this.modalBalance);
        this.addListenerOnAddTrigger(this.addExpenses, this.modalExpenses);

        this.addValidateOnExpenseInputs(this.itemExpense);
        this.addValidateOnExpenseInputs(this.counterExpense);

        this.addValidateOnExpenseInputs(this.itemBudget);
        this.addValidateOnExpenseInputs(this.counterBudget);


        this.addInUlBudget.addEventListener('click', () => {
            if (this.itemBudget.value === '' || this.counterBudget.value === '') {
                this.addValidateInputs(this.itemBudget, this.counterBudget);
                this.addErrorMessage('Поля не должны быть пусты', this.addInUlBudget);
            } else {
                this.deleteValidateInputs(this.itemBudget, this.counterBudget);
                this.addInnerHTML(this.budgetList, this.itemBudget, this.counterBudget);
                localStorage.setItem('counterSaving', parseInt(localStorage.getItem('counterSaving')) + parseInt(this.counterBudget.value));
                localStorage.setItem('budgetList', this.budgetList.innerHTML);
                this.savingMoney.innerHTML = parseInt(this.savingMoney.innerHTML) + parseInt(this.counterBudget.value);
                this.addListenersRange();
                document.querySelectorAll('.modalBudget .divForModalBudget input').forEach(item => item.value = '');
            }
        });

        this.counterExpense.addEventListener('input', () => {
            if (this.counterExpense.value < 0) {
                this.counterExpense.value = 0;
            }
        });

        this.addInUlExpense.addEventListener('click', () => {
            debugger;
            if (this.itemExpense.value == '' || this.counterExpense.value == '') {
                this.addValidateInputs(this.itemExpense, this.counterExpense);
                this.addErrorMessage('Поля не должны быть пусты', this.addInUlExpense);
            } else if (+this.counterExpense.value > +this.budget.innerHTML) {
                this.deleteValidateInputs(this.itemExpense, this.counterExpense);
                this.addErrorMessage('Недостаточно средств, попробуйте взять дополнительные средства из сбережений', this.addInUlExpense);
            } else if (+this.counterExpense.value <= +this.budget.innerHTML) {
                this.deleteValidateInputs(this.itemExpense, this.counterExpense);
                this.addInnerHTML(this.expenseList, this.itemExpense, this.counterExpense);
                this.expense.innerHTML -= this.counterExpense.value;
                this.budget.innerHTML = parseInt(this.budget.innerHTML) - parseInt(this.counterExpense.value);
                localStorage.setItem('expense', this.expense.innerHTML);
                localStorage.setItem('counterIncome', this.budget.innerHTML);
                localStorage.setItem('expenseList', this.expenseList.innerHTML);
                this.addListenersRange();
                document.querySelectorAll('.modalExpenses .divForModalBudget input').forEach(item => item.value = '');
            }
        });

        this.addRangeButton.addEventListener('click', () => {
            if (this.rangeValue.value > 0) {
                this.rangeValue.classList.remove('errorBorder');
                if (+this.rangeValue.value <= +this.savingMoney.innerHTML) {
                    localStorage.setItem('counterIncome', parseInt(localStorage.getItem('counterIncome')) + parseInt(this.rangeValue.value));
                    localStorage.setItem('counterSaving', parseInt(localStorage.getItem('counterSaving')) - parseInt(this.rangeValue.value));
                    this.savingMoney.innerHTML = parseInt(this.savingMoney.innerHTML) - parseInt(this.rangeValue.value);
                    this.budget.innerHTML = parseInt(this.budget.innerHTML) + parseInt(this.rangeValue.value);
                } else {
                    this.addErrorMessage('Сумма больше текущих сбережений', this.addRangeButton);
                    this.rangeValue.classList.add('errorBorder');
                }
            } else if (this.rangeValue.value < 0) {
                this.rangeValue.classList.remove('errorBorder');
                if (-this.rangeValue.value <= this.budget.innerHTML) {
                    localStorage.setItem('counterIncome', parseInt(localStorage.getItem('counterIncome')) + parseInt(this.rangeValue.value));
                    localStorage.setItem('counterSaving', parseInt(localStorage.getItem('counterSaving')) - parseInt(this.rangeValue.value));
                    this.savingMoney.innerHTML = parseInt(this.savingMoney.innerHTML) - parseInt(this.rangeValue.value);
                    this.budget.innerHTML = parseInt(this.budget.innerHTML) + parseInt(this.rangeValue.value);
                } else {
                    this.addErrorMessage('Сумма больше текущего бюджета', this.addRangeButton);
                    this.rangeValue.classList.add('errorBorder');
                }
            } else if (this.rangeValue.value == '') {
                this.addErrorMessage('Поле не должно быть пустым', this.addRangeButton);
                this.rangeValue.classList.add('errorBorder');
            }
        });

        this.addListenerRangeInput();
    }

    // scroll
    addListenerRangeInput() {
        this.rangeValue.addEventListener('input', () => {
            if (this.rangeValue.value == '') {
                this.rangeValue.classList.add('errorBorder');
            } else {
                this.rangeValue.classList.remove('errorBorder');
            }
        });
    }

    render() {
        this.addAndRemoveClasses(this.modalBalance);
        this.addAndRemoveClasses(this.modalBudget);
        this.addAndRemoveClasses(this.modalExpenses);
        this.checkInnerList();
        this.addListeners();
        this.addListenersRange();
    }
}

class Budget extends rootClass {
    constructor() {

    }

    render() {
        
    }
}

const hello = new rootClass();
hello.render();

const rootExtension = new rootElement();
rootExtension.render();