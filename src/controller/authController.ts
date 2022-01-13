import express, { NextFunction, Request, Response } from 'express';
import User from '../model/userModels';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import ErrorHandler from '../Utils/errorHandler';
import { Type } from '../Utils/interface';
import bcrypt from 'bcryptjs';

import {
  validateSignup,
  validatelogin,
  validateRecipe,
} from '../Utils/validator';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwared=proto'] === 'http',
  });

  //Remove password from output

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Valid = validateSignup.validate(req.body);

    if (Valid.error) {
      return res.status(400).json({
        status: 'fail',
        message: Valid.error?.details[0].message,
      });
    }

    // const newUser = new User({

    // });

    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
    });

    // console.log(newUser, '***');

    // createSendToken(newUser, 201, req, res);

    res.status(201).json({
      status: 'fail',
      message: 'error creating new user',
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'fail',
      message: 'error creating new user',
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Joi validation
    const Valid = validatelogin.validate(req.body);
    if (Valid.error) {
      return res.status(400).json({
        status: 'fail',
        message: Valid.error?.details[0].message,
      });
    }

    // 1 Check if email and password exist

    const { email, password } = req.body;
    if (!email || !password) {
      return next(ErrorHandler(400, 'Please provide email and password!', {}));
    }
    // 2 Check if user exists && password is correct

    const user: Type | null = await User.findOne({
      email: req.body.email,
    }).select('+password');
    if (!user) {
      return res.status(400).json({
        message: 'Invalid login credentials',
      });
    }
    const correct = await bcrypt.compare(req.body.password, user.password);
    console.log(correct);
    if (!correct) {
      return next(ErrorHandler(400, 'Invalid login credentials', {}));
    }

    // 3 if client details are okay , send token to client
    createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'err',
    });
  }
};

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not an authorized, kindly login!',
    });
  }
  try {
    const decodedToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    const freshUser = await User.findById(decodedToken.id);

    if (!freshUser) {
      return res.status(401).json({
        message: 'The token belonging to this user does not exist',
      });
    }

    req.user = freshUser;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not authorized!!!',
    });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    return res.status(200).json({
      status: 'success',
      message: 'you are logged out !',
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'user not recored',
    });
  }
};
