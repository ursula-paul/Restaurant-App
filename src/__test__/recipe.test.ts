import supertest from 'supertest';
import app from '../app';

let token = '';
let identity = '';

describe('SIGNUP', () => {
  it('Should successfuly signup', async () => {
    const mockRecipe = {
      fullname: 'purity',
      email: 'purity@gmail.com',
      password: 'abcd1234',
    };

    const res = await supertest(app).post('/users/signup').send(mockRecipe);

    expect(res.status).toBe(201);
  });
});

describe('LOGIN', () => {
  it('should login successfuly', async () => {
    const mocklogin = {
      email: 'purity@gmail.com',
      password: 'abcd1234',
    };
    const res = await supertest(app).post('/users/login').send(mocklogin);
    token = res.body.token;

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('data');
  });
});

describe('LOGOUT', () => {
  it('should logout successfuly', async () => {
    const mocklogout = {
      status: 'success',
      message: 'you are logged out !',
    };
    const res = await supertest(app).get('/users/logout').send(mocklogout);
    //token = res.body.token;

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.token).toBeUndefined();
  });
});

describe('CREATE RECIPE', () => {
  it('should create a new recipe', async () => {
    const mockCreateRecipe = {
      title: 'pineapple juice',
      meal_type: 'supper',
      difficulty_level: 'Beginner',
      ingredients: [
        { name: 'pineapple', price: 600 },
        { name: 'falvour', price: 100 },
      ],
      preparation: 'wash and cut your pineapple',
    };
    const res = await supertest(app)
      .post('/api/v1/recipes')
      .send(mockCreateRecipe)
      .set(`Authorization`, `Bearer ${token}`);

    identity = res.body.data._id;
    console.log(identity);
    expect(res.status).toBe(201);
  });
});

describe('GET RECIPE', () => {
  it('should all recipe ', async () => {
    const res = await supertest(app)
      .get('/api/v1/recipes')
      .set(`Authorization`, `Bearer ${token}`);

    expect(res.status).toEqual(200);
  });
});

describe('GET RECIPE BY ID ', () => {
  it('should one recipe ', async () => {
    const res = await supertest(app)
      .get(`/api/v1/recipes/${identity}`)
      .set(`Authorization`, `Bearer ${token}`);

    expect(res.status).toEqual(200);
  });
});

describe('UPDATE RECIPE BY ID ', () => {
  it('should update recipe', async () => {
    const mockUdateRecipe = {
      title: 'beans',
      meal_type: 'lunch',
      difficulty_level: 'Beginner',
      ingredients: [
        { name: 'Beans', price: 600 },
        { name: 'falvour', price: 100 },
      ],
      preparation: 'wash and cut your pineapple',
    };

    const res = await supertest(app)
      .put(`/api/v1/recipes/${identity}`)
      .send(mockUdateRecipe)
      .set(`Authorization`, `Bearer ${token}`);

    console.log(res.body);
    expect(res.status).toEqual(201);
    expect(res.body.data.meal_type).toBe(mockUdateRecipe.meal_type);
    expect(res.body.data.title).toBe(mockUdateRecipe.title);
  });
});

describe('DELETE RECIPE BY ID ', () => {
  it('should delete recipe ', async () => {
    const res = await supertest(app)
      .delete(`/api/v1/recipes/${identity}`)
      .set(`Authorization`, `Bearer ${token}`);

    expect(res.status).toEqual(204);
  });
});
