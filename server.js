const express = require('express');
const path = require('path');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const models = require('./models/');

const users = require('./routes/user');
const stocks = require('./routes/stock');
const drivers = require('./routes/driver');

const outstocks = require('./routes/outstock');

const app = express();
app.use(cors({
  origin:'*'
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/stocks/user', users);
app.use('/stocks', stocks);
app.use('/stocks/dispatch', outstocks);
app.use('/stocks/driver', drivers);



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, ')
        return res.status(200).json({});
    }
    next();
})


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

models.sequelize
  .authenticate()
  .then(function () {
    console.log('Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });

module.exports = app;
