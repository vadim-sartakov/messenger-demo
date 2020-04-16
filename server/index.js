require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ms = require('ms');
const createDebug = require('debug');
const jwtAuth = require('./middlewares/auth');
const login = require('./middlewares/login');
const graphqlServer = require('./graphql/server');
const createWsServer = require('./ws/createServer');
const cleanup = require('./tasks/cleanup');
const { port, dbUrl, webAppUrl, cleanupPeriod } = require('./config');
const apiPrefix = '/api';

const appInfo = createDebug('app:info');
const dbDebug = createDebug('db:debug');
const error = createDebug('app:error');

mongoose.set('debug', process.env.DEBUG && process.env.DEBUG.includes('db') ? (col, method, query, doc, ...options) => {
  dbDebug('%s.%s(%o, %o), options: %o', col, method, query, doc, options);
} : undefined);

async function run() {
  try {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });    
    appInfo('Successfully connected to database %s', dbUrl);
    setInterval(cleanup, ms(cleanupPeriod));

    const app = express();

    if (webAppUrl) app.use(cors({ origin: webAppUrl }));

    app.use(bodyParser.json());
    app.post(`${apiPrefix}/login`, login);

    app.use(jwtAuth.unless({ path: ['/ws'] }));
    graphqlServer.applyMiddleware({ app, path: '/graphql' });

    const wsServer = createWsServer(app);

    wsServer.listen(port, () => {
      appInfo('Server started at port %s', port);
    });
  } catch (err) {
    error(err);
  }
}

run();