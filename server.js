const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares.

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes.
app.use('/users', require('./routes/users'));

// Start Server.

const port = process.env.PORT || 9001;
app.listen(port);
console.log(`Server listening at port ${port}`);
