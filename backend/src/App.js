const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('../routes/Authroutes');
const studentRoutes = require('../routes/studentRoutes');
const errorhandler = require('../middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.use(errorhandler);

module.exports = app;