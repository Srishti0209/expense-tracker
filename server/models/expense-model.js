const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const expenseSchema = new Schema({
    description: String,
    amount: Number,
    year: Number,
    month: String
  });
  
 const Expense = mongoose.model('expenses', expenseSchema);
 module.exports = Expense;