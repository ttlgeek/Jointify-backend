const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initiate App
const app = express();

// Database Connection
mongoose.connect(
  'mongodb://localhost/jointifybackend',
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

// Middlewares.

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes.

// Root path.

app.get('/', function(req, res) {
  res.send('Api root');
});

// User Routes.

app.use('/users', require('./routes/users'));

// Start Server.

const port = process.env.PORT || 9001;
app.listen(port);
console.log(`Server listening at port ${port}`);
