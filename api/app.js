const config = require('./utils/config')
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./controllers/index.js');
const middleware = require('./utils/middleware')
const { info, error} = require('./utils/logger')

//require('./db.js');


app.name = 'API';

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
//app.use(middleware.errorHandler)

app.use('/', routes);

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  error(err);
  res.status(status).send(message);
});

module.exports = app;
