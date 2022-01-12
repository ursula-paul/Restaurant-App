import express, { Request, Response, NextFunction, response } from 'express';
import { Query } from 'mongoose';
import Recipe from '../model/recipeModels';
import { validateRecipe } from '../Utils/validator';

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let query = Recipe.find();

  // Pagination

  const page = +req.query.page! || 1;
  const limit = +req.query.limit! || 100;
  const skip = (page - 1) * limit;

  //page=2&limit=10 page1 = 1-10 ,  page2 = 11-20 page3 = 21-30

  query.skip(skip).limit(limit);

  const recipes = await query;

  res.status(200).json({
    status: 'success',
    data: recipes,
  });
};

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Valid = validateRecipe.validate(req.body);

    if (Valid.error) {
      return res.status(400).json({
        status: 'fail',
        message: Valid.error?.details[0].message,
      });
    }

    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newRecipe,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log('HERE');

  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id);

    // const foundId = await Recipe.findOneAndDelete()

    return res.status(201).json({
      status: 'success',
      data: recipe,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

//   Recipe.findByIdAndDelete()

export const deleteRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deleteRecipe = await Recipe.findByIdAndDelete(id);

    return res.status(201).json({
      status: 'success',
      data: 'Deleted successfully',
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: err,
    });
  }
};

export const updateRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const updateRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // console.log(id);

    return res.status(201).json({
      status: 'success',
      data: updateRecipe,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: err,
    });
  }
};
