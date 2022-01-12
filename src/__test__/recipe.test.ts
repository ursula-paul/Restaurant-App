import supertest from 'supertest';
import app from '../app';
// import mongoose, { Mongoose } from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import RecipeModel from '../src/model/recipeModels';
// import UserModel from '../src/model/userModels';

// let mongoServer: MongoMemoryServer;

// beforeAll(async () => {
//   mongoServer = new MongoMemoryServer();
//   const mongoUri = await mongoServer.getUri();

//   const opts = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   };

//   try {
//     let _ = await mongoose.connect(mongoUri, opts);
//   } catch(err) {
//     console.error(err)
//   }

//   mongoose
//     .connect(mongoUri)
//     .then((_) => {
//       console.log('Successfully connected to the database');
//     })
//     .catch(console.error);
// });

// afterAll(async () => {
//   await UserModel.findByIdAndDelete();
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// });

const mockRecipe = {
  title: 'ricess',
  meal_type: 'supper',
  difficulty_level: 'Intermidiate',
  ingredients: [
    { name: 'jin', price: 40 },
    { name: 'salt', price: 100 },
  ],
  preparation: 'prepared',
};

// let mockUserId;

describe('CREATE RECIPE', () => {
  it('recipe is successfully created', async () => {
    const mockRecipe = {
      fullname: 'purity',
      email: 'purity@gmail.com',
      password: 'abcd1234',
    };

    const res = await supertest(app).post('/users/signup').send(mockRecipe);

    expect(res.status).toBe(201);
  });
});

// describe('GET RECIPE', () => {
//   it('should all recipe ', async () => {
//     const res = await supertest(app).get('/');
//     expect(res.statusCode).toEqual(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('', async () => {
//     const newRecipe = await supertest(app).post('/').send();
//   });
// });
