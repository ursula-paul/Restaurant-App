import { HttpError } from 'http-errors';
import express, { Response, Request, NextFunction } from 'express';
// import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexroute from './routes/index';
import recipeRouter from './routes/recipeRouter';
import usersRouter from './routes/usersRouter';
import { mongoConnect, mongoMockConnect } from './db/db';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ejs from 'ejs';
import path from 'path';

dotenv.config();

const app = express();

// view engine setup
// app.set('views', path.join(`/../${__dirname}`, 'views'));

// app.set('view engine', 'ejs');

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
  // MongoMemoryServer.create().then((mongo) => {
  //   const uri = mongo.getUri();

  //   mongoose.connect(uri).then(() => {
  //     console.log(`Mock DB connected`);
  //   });
  // });
} else {
  mongoConnect();
}
// mongoMockConnect();

app.use('/', indexroute);
app.use('/api/v1/recipes', recipeRouter);
app.use('/users', usersRouter);

export default app;
