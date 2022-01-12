import express from 'express';
import {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  deleteRecipeById,
  updateRecipeById,
} from '../controller/recipeControllers';
import { protectRoute } from '../controller/authController';

const router = express.Router();

/* GET home page. */
router.route('/').get(protectRoute, getAllRecipes).post(createRecipe);

router
  .route('/:id')
  .get(protectRoute, getRecipeById)
  .delete(protectRoute, deleteRecipeById)
  .put(protectRoute, updateRecipeById);

export default router;
