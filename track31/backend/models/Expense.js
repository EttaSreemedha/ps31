const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  formName: { type: String, required: true },
  foodExpense: { type: Number, required: true },
  shoppingExpense: { type: Number, required: true },
  otherExpense: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
