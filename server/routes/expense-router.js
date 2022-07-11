const express = require('express')

const ExpenseController = require('../controllers/expense-controller')

const router = express.Router()
console.log("expense router")
router.post('/expense/add', ExpenseController.insertExpense)
router.post('/update', ExpenseController.updateExpense)
router.get('/:id', ExpenseController.deleteExpense)
router.get('/getAllExpense', ExpenseController.getAllExpenses)
/*router.get('/getAllExpense', (req, res) => {
    res.send({data: 'Hello World, from express'});
})

*/
//router.get('/getAllExpense', ExpenseController.getAllExpensesMock)
module.exports = router