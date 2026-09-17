require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./db');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/tasks', tasksRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Todo app rulează pe http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Eroare la conectarea cu MongoDB:', err);
    process.exit(1);
  });
