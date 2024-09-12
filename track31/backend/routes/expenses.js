// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Assuming you have an Expense model

// POST route to save expenses
router.post('/', async (req, res) => {
  const { username, formName, foodExpense, shoppingExpense, otherExpense } = req.body;

  try {
    const newExpense = new Expense({
      username,
      formName,
      foodExpense,
      shoppingExpense,
      otherExpense,
    });

    await newExpense.save();
    res.status(201).json({ message: 'Expense saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving expense', error: error.message });
  }
});

// In routes/expenses.js
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const expenses = await Expense.find({ username });
    if (!expenses.length) {
      return res.status(404).json({ message: 'No expenses found for this user' });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
});




module.exports = router;
