import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { dbConnection } from './services';
import corsOptions from './configs';
import router from './routes';

dotenv.config();
const app = express();
dbConnection();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/api', cors(corsOptions), router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default app;
