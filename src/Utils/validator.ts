import joi from 'joi';
//import { Recipe, User, Ingredient } from './validator';

interface Recipe extends Document {
  title: string;
  meal_type: string;
  difficulty_level: string;
  ingredients: string;
  preparation: string;
  created_At: any;
  updated_At: any;
}

export const validateRecipe = joi.object({
  title: joi.string().required().trim(),
  meal_type: joi.string().required().trim(),
  difficulty_level: joi.string().required().trim(),
  ingredients: joi.array().required(),
  preparation: joi.string().required(),
});

interface User {
  email: string;
  password: string;
  fullname: string;
  created_At: any;
  updated_At: any;
}

export const validateSignup = joi.object({
  email: joi.string().trim().email().required(),
  fullname: joi.string().trim().required().min(1).max(50),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const validatelogin = joi.object({
  email: joi.string().trim().email().required(),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const ingredient = joi.object({
  name: joi.string().trim().required(),
  price: joi.number().required(),
  recipe: joi.string().trim(),
  user: joi.string().trim(),
});
