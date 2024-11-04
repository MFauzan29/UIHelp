// server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const reportRoute = require('./routes/ReportRoutes');
const adminRoute = require('./routes/AdminRoutes');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;

// dotenv.config();

// console.log(process.env.password);

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

//app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes);
app.use('/report', reportRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});