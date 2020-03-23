require('dotenv').config({ path: `${__dirname}/../../.env` });

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const expressPinoLogger = require('express-pino-logger');

const logger = require('./utils/logger');

const port = parseInt(process.env.PORT);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  express()
    .use(cors())
    // .use(
    //   expressPinoLogger({
    //     logger
    //   })
    // )
    .use(bodyParser.json({ type: 'application/*+json' }))
    .use(passport.initialize())
    .use(passport.session())
    .use(handler)
    .listen(port, err => {
      if (err) {
        throw err;
      }
      logger.info(
        `App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
      );
    });
});
