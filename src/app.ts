import { HttpError } from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
// import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import recipeRouter from './routes/recipeRouter';
import usersRouter from './routes/usersRouter';
import { mongoConnect, mongoMockConnect } from './db/db';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.NODE_ENV === 'test') {
  mongoMockConnect();
} else {
  mongoConnect();
}

app.use('/api/v1/recipes', recipeRouter);
app.use('/users', usersRouter);

export default app;
