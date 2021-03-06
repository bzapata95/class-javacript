<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transactions</title>
  <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
  <div class="container">
    <h1>
      <img src="./assets/dollar.svg" alt="dollar">
      Transactions code
    </h1>

    <header>
      <div class="left">
        <p id="totalTransactions">S/ 0.00</p>
        <span>Available Balance</span>
      </div>
      <div class="right">
        <img src="https://avatars3.githubusercontent.com/u/15035675?s=460&u=22621a21f4d306d1df8a625baa28255b434645be&v=4" alt="yo">
      </div>
    </header>

    <main>
      <div class="mainHeader">
        <h3>Recent Transactions</h3>
        <a href="">See all</a>
      </div>
      <div class="mainNavegation">
        <div class="navItem active" id="all">
          <p>All</p>
        </div>
        <div class="navItem" id="income">
          <img src="./assets/arrow-down.svg" alt="income" class="expense">
          <p>Income</p>
        </div>
        <div class="navItem" id="expense">
          <img src="./assets/arrow-up.svg" alt="expense" class="expense">
          <p>Expense</p>
        </div>
      </div>
      <h3 class="transactionTitle" id="listTitle">
        All
      </h3>
      <div class="listOfTransactions" id="listTransactions">
        
        
      </div>
    </main>

    <button type="button" id="addNewTransaction">
        <img src="./assets/plus.svg" alt="plus-add">
    </button>

    <div class="addNewTransaction" id="popUpNewTransaction">
      
      <div class="containerNewTransaction">
        <div class="closePopUp" id="closePopUp">
          x
        </div>
        <div class="newTransactionType">
          <div class="navItem" id="typeTransaction">
            <img src="./assets/arrow-down.svg" alt="income" class="expense">
            <p>Income</p>
          </div>
          <div class="navItem" id="typeTransaction">
            <img src="./assets/arrow-up.svg" alt="expense" class="expense">
            <p>Expense</p>
          </div>
        </div>
        <form action="post" id="formNewTransaction">
          <input id="title" name="title" placeholder="Title" autocomplete="off">
          <input id="description" name="description" placeholder="Description" autocomplete="off">
          <input id="value" name="value" placeholder="Value" autocomplete="off">
          <button type="submit" class="newTransaction">Enviar</button>
        </form>
      </div>
    </div>
  </div>

<script src="./js/main.js"></script>
</body>
</html>