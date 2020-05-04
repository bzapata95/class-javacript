const state = {
  isOpen: false,
  type: '',
  transactions: [],
  incomes: [],
  expenses: [],
}

addEventListener('DOMContentLoaded', () => {
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  if(transactionsLocalS){
    state.transactions = JSON.parse(transactionsLocalS);
    getTransactions();
    getTotal();
  }
})

const addNewTransaction = document.querySelector("#addNewTransaction");
const popUpNewTransaction = document.querySelector("#popUpNewTransaction")
const closePopUp = document.querySelector('#closePopUp');

function showPopUp(){
  state.isOpen = !state.isOpen;

  if(state.isOpen){
    popUpNewTransaction.style.display='flex';
  }else {
    popUpNewTransaction.style.display='none';
  }
}

addNewTransaction.addEventListener('click', () => {
  showPopUp();
})
closePopUp.addEventListener('click', () => {
  showPopUp();
})


const typeTransaction = document.querySelectorAll('#typeTransaction');

typeTransaction[0].addEventListener('click', () => {
  typeTransaction[1].classList.remove('selected');
  typeTransaction[0].classList.add('selected');
  state.type = 'income';

})
typeTransaction[1].addEventListener('click', () => {
  typeTransaction[0].classList.remove('selected');
  typeTransaction[1].classList.add('selected');
  state.type = 'expense';
})

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const value = document.querySelector("#value");

function cleanInputs(){
  title.value = "";
  description.value = "";
  value.value = "";
  typeTransaction[0].classList.remove('selected');
  typeTransaction[1].classList.remove('selected');
}

const formNewTransaction = document.querySelector("#formNewTransaction");





formNewTransaction.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const data = {
    title: title.value,
    description: description.value,
    value: value.value,
    type: state.type,
    date: new Date(),
  }

  state.transactions = [...state.transactions, data];

  localStorage.setItem('@Project:transactions', JSON.stringify(state.transactions))


  cleanInputs();
  showPopUp();
  getTransactions();
  getTotal();
});

const listTransactions = document.querySelector("#listTransactions");

function getTransactions(type){
  listTransactions.innerHTML = '';
  switch (type) {
    case 'income':
      state.incomes.map(transaction => {
        listTransactions.innerHTML +=`
          <div class="transaction">
            <div class="transactionLeft">
              <p>${transaction.title}</p>
              <span>${transaction.description}</span>
            </div>
            <div class="transactionRight">
              <p class="${transaction.type === 'income' ? 'income' : 'expense'}">${formatValue(transaction.value)}</p>
              <span>26 April</span>
            </div>
          </div>
        `;
      })
      break;
      case 'expense':
      state.expenses.map(transaction => {
        listTransactions.innerHTML +=`
          <div class="transaction">
            <div class="transactionLeft">
              <p>${transaction.title}</p>
              <span>${transaction.description}</span>
            </div>
            <div class="transactionRight">
              <p class="${transaction.type === 'income' ? 'income' : 'expense'}">${formatValue(transaction.value)}</p>
              <span>26 April</span>
            </div>
          </div>
        `;
      })
      break;
  
    default:
      state.transactions.map(transaction => {
        listTransactions.innerHTML +=`
          <div class="transaction">
            <div class="transactionLeft">
              <p>${transaction.title}</p>
              <span>${transaction.description}</span>
            </div>
            <div class="transactionRight">
              <p class="${transaction.type === 'income' ? 'income' : 'expense'}">${formatValue(transaction.value)}</p>
              <span>26 April</span>
            </div>
          </div>
        `;
      })
      break;
  }
  
}

const totalTransactions = document.querySelector('#totalTransactions');

function getTotal() {

  const { income, expense } = state.transactions.reduce(
    (accumulator, transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += Number(transaction.value);
          break;
        case 'expense':
          accumulator.expense += Number(transaction.value);
          break;
        default:
          break;
      }
      return accumulator;
    },
    {
      income: 0,
      expense: 0,
    },
  );

  const total = income - expense;

  totalTransactions.innerHTML = formatValue(total);
}


function formatValue(value){
  return Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN"
  }).format(value)
}


const all = document.querySelector("#all");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");

all.addEventListener('click', () => {
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  if(transactionsLocalS){
    state.transactions = JSON.parse(transactionsLocalS);
    getTransactions();
  }
});

income.addEventListener('click', () => {
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  const incomes = JSON.parse(transactionsLocalS).filter(transaction => transaction.type === 'income');

  state.incomes = [...incomes];
  getTransactions('income');
});

expense.addEventListener('click', () => {
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  const expense = JSON.parse(transactionsLocalS).filter(transaction => transaction.type === 'expense');

  state.expenses = [...expense];
  getTransactions('expense');
});