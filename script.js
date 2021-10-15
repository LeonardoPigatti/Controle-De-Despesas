const transactionsU1 = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')






let dummyTransactions = [
  {id: 1, name: 'Salário', amount: +1000}
  
  
  
]
const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))

const removeTransaction = ID => {
  dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
  init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transaction.name}
     <span>$${operator} R$ ${amountWithoutOperator}</span>
     <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
     x
     </button>
    `
    transactionsU1.append(li)
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        
        const expense = Math.abs(transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator+value, 0))
        
        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent = `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`

   

}
const init = () => {
    transactionsU1.innerHTML = ''
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}
init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()


    if ( transactionName === "" || transactionAmount === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }
    const transaction = {
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }
    dummyTransactions.push(transaction)
    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''


})