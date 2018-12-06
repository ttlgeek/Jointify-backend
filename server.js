const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initiate App
const app = express();

// Middlewares.

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Connection

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost/jointifybackend',
      { useNewUrlParser: true, autoIndex: false }
    );
    console.log('mongoDB connected');
  } catch (err) {
    console.log(err);
  }
};

// 1- fire up the db connection
connectDB();

// Routes.

// 1- Root path.

app.get('/', function(req, res) {
  res.send('Api root');
});

// 2- User Routes.

app.use('/users', require('./routes/users'));

// Start Server.

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Api listening on port: ${port}`));
