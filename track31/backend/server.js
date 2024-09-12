require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const expensesRoutes = require('./routes/expenses');
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/expenses', expensesRoutes); // Add this line
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
