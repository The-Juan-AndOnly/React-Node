'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

// Bring in database & Models
const sequelize = require('./db/database');
const Course = require('./models/Course');
const User = require('./models/User');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// TODO setup your api routes here
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!'
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Create an association between the models
Course.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Course, { foreignKey: 'userId' });

// Connect to DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connected');
  })
  .catch(err => console.log(err));

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
