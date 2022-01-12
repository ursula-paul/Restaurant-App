import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const mongoConnect = () => {
  const db = process.env.MONGO_URL?.replace(
    '<password>',
    process.env.MONGO_PASSWORD!
  ) as string;

  mongoose.connect(db, () => {
    console.log('DB connected successfully');
  });
};

export const mongoMockConnect = () => {
  MongoMemoryServer.create().then((mongo) => {
    const uri = mongo.getUri();

    mongoose.connect(uri).then(() => {
      console.log(`Mock DB connected`);
    });
  });
};
