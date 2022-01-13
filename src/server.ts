import mongoose from 'mongoose';

import app from './app';

// console.log(process.env)

// const DBURI: string =
//   process.env.NODE_ENV === 'development'
//     ? process.env.MONGO_URL?.replace('<password>', process.env.MONGO_PASSWORD!)
//     : mongoUri;

const port = 4000 || process.env.PORT;

// console.log('HI');

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
