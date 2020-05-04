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

  if(!title.value.trim()|| !description.value.trim()|| !value.value.trim()|| !state.type){
    alert('llene los campos o selecciones type de operacion');
    return;
  }
  
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
  state.type = '';
});

const listTransactions = document.querySelector("#listTransactions");

function getTransactions(type){
  listTransactions.innerHTML = '';
  switch (type) {
    case 'income':
      generatedHTML(state.incomes);
      break;
      case 'expense':
        generatedHTML(state.expenses);
      break;
  
    default:
      generatedHTML(state.transactions);
      break;
  }
  
}

function formatDate(value){
  const date = new Date(value)
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short', day: '2-digit' }).format(date)
}

function generatedHTML(array){
  return array.map(item => {
    listTransactions.innerHTML +=`
      <div class="transaction">
        <div class="transactionLeft">
          <p>${item.title}</p>
          <span>${item.description}</span>
        </div>
        <div class="transactionRight">
          <p class="${item.type === 'income' ? 'income' : 'expense'}">${formatValue(item.value)}</p>
          <span>${formatDate(item.date)}</span>
        </div>
      </div>
    `;
  })
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
const listTitle = document.querySelector("#listTitle");

function destroySelectedNav() {
  all.classList.remove('active');
  income.classList.remove('active');
  expense.classList.remove('active');
  listTitle.innerHTML='';
}

all.addEventListener('click', () => {
  destroySelectedNav();
  all.classList.add('active');
  listTitle.innerHTML='All';
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  if(transactionsLocalS){
    state.transactions = JSON.parse(transactionsLocalS);
    getTransactions();
  }
});

income.addEventListener('click', () => {
  destroySelectedNav();
  income.classList.add('active');
  listTitle.innerHTML='Income';
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  const incomes = JSON.parse(transactionsLocalS).filter(transaction => transaction.type === 'income');

  state.incomes = [...incomes];
  getTransactions('Income');
});

expense.addEventListener('click', () => {
  destroySelectedNav();
  expense.classList.add('active');
  listTitle.innerHTML='Expense';
  const transactionsLocalS = localStorage.getItem('@Project:transactions');
  const expenses = JSON.parse(transactionsLocalS).filter(transaction => transaction.type === 'expense');

  state.expenses = [...expenses];
  getTransactions('expense');
});