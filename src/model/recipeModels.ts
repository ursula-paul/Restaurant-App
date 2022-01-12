import { Schema, Document, model } from 'mongoose';
import validator from 'validator';

interface Recipe extends Document {
  title: string;
  meal_type: string;
  difficulty_level: string;
  ingredients: string;
  preparation: string;
}

const recipeSchema: Schema<Recipe> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A recipe must have a title'],
      trim: true,
      lowercase: true,
    },

    meal_type: {
      type: String,
      required: [true, 'A recipe must have a meal type'],
      trim: true,
      enum: {
        values: ['breakfast', 'lunch', 'supper', 'snack'],
        message: 'Meal type is either braekfast, lunch, supper or snack',
      },
    },
    difficulty_level: {
      type: String,
      required: [true, 'A recipe must have a difficulty level'],
      trim: true,
      enum: {
        values: ['Beginner', 'Intermidiate', 'Advanced'],
        message:
          'Difficulty level is either Beginner , Intermidiate or Advanced',
      },
    },
    ingredients: [
      {
        name: { type: String },
        price: { type: Number },
      },
    ],
    preparation: {
      type: String,
      required: [true, 'A receipe must have preparation steps!'],
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
