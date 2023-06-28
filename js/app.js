const budgetForm = document.querySelector('#budget-form');
let budgetInput = document.querySelector('.budget-input');
const expenseForm = document.querySelector('#expense-form');
const budgetAmount = document.querySelector('#budget-amount');
const expenseAmount = document.querySelector('#expense-amount');
const balanceAmount = document.querySelector('#balance-amount');
const expenseList = document.querySelector('.TaskExp');
const expenseInput = document.querySelector('#expense-input');
const amountInput = document.querySelector('#amount-input');

budgetForm.addEventListener('submit', budgetFun);
let totalBudget = 0;

document.addEventListener('DOMContentLoaded', () => {
    const storedBudget = localStorage.getItem('budget');
    if (storedBudget) {
        totalBudget = parseFloat(storedBudget);
        budgetAmount.textContent = totalBudget.toFixed(2);
    }

    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        const storedExpenseArr = JSON.parse(storedExpenses);
        storedExpenseArr.forEach(singleExp => {
            const newdiv = document.createElement('div');
            const outPut = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
          <h6 class="expense-title mb-0 text-uppercase list-item">${singleExp.title}</h6>
          <h5 class="expense-amount mb-0 list-item">${singleExp.num}</h5>
          <div class="expense-icons list-item">
            <a href="#" class="delete-icon" data-id="">
              <i class="fas fa-trash"></i>
            </a>
          </div>
        </div>
      `;
            newdiv.innerHTML = outPut;
            expenseList.append(newdiv);
        });
    }
});

function budgetFun(e) {
    e.preventDefault();
    const inputField = document.querySelector('.budget-input');
    const inputVal = inputField.value;
    const newBudget = parseFloat(inputVal);
    if (isNaN(newBudget) || newBudget === 0) {
        alert('Please enter a valid number');
        return;
    }
    totalBudget += newBudget;
    budgetAmount.textContent = totalBudget.toFixed(2);
    localStorageBudget(totalBudget.toFixed(2));
    inputField.value = '';
}

function localStorageBudget(value) {
    localStorage.setItem('budget', value);
}

expenseForm.addEventListener('submit', expenseFun);

let allExpenses = [];

function expenseFun(e) {
  e.preventDefault();

  const expenseObj = {
    title: expenseInput.value,
    num: amountInput.value
  };

  const storedExpenses = localStorage.getItem('expenses');
  if (storedExpenses) {
    allExpenses = JSON.parse(storedExpenses);
  }

  // Check if the expense already exists in allExpenses array
  const isDuplicate = allExpenses.some(existingExpense => {
    return existingExpense.title === expenseObj.title && existingExpense.num === expenseObj.num;
  });

  if (!isDuplicate) {
    allExpenses.push(expenseObj);
    localStorage.setItem('expenses', JSON.stringify(allExpenses));

    const newdiv = document.createElement('div');
    const outPut = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">
        <h6 class="expense-title mb-0 text-uppercase list-item">${expenseObj.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expenseObj.num}</h5>
        <div class="expense-icons list-item">
          <a href="#" class="delete-icon" data-id="">
            <i class="fas fa-trash"></i>
          </a>
        </div>
      </div>
    `;
    newdiv.innerHTML = outPut;
    expenseList.append(newdiv);
  }

  expenseInput.value = '';
  amountInput.value = '';
}
