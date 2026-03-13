const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// existing auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// NEW: post routes
const postRoutes = require('./routes/Postroutes');   // ← add this line
app.use('/api/posts', postRoutes);                  // ← and this line

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('DB connection error:', err));
