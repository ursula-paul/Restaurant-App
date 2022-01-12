interface Recipe {
  title: string;
  meal_type: string;
  difficulty_level: string;
  ingredients: string;
  preparation: string;
  created_At: any;
  updated_At: any;
}

interface User {
  email: string;
  hashedPassword: string;
  fullname: string;
  created_At: any;
  updated_At: any;
}

interface Ingredients {
  name: string;
  price: number;
  recipe: string | undefined;
  user: string | undefined;
}

interface ErrorInt {
  success: boolean;
  status: number;
  message: string;
  data: object;
}

interface Type {
  email: string;
  password: string;
  fullname: string;
}

export { Recipe, User, Ingredients, ErrorInt, Type };
