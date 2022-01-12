import mongoose, { Schema, Document } from 'mongoose';

interface Ingredient extends Document {
  name: string;
  price: number;
  recipe: string | undefined;
  user: string | undefined;
}

const IngredientSchema: Schema<Ingredient> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of ingredient must be provided!'],
  },

  price: {
    type: Number,
    required: [true, 'Price of ingredient must be provided'],
  },

  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: [true, 'Please provide a recipe!'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please provide a user!'],
  },
});

// const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
