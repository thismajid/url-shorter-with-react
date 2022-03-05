import mongoose from 'mongoose';

import { dbConfig } from '../configs';

const { DB_HOST, DB_PORT, DB_NAME } = dbConfig;

const dbConnection = () => {
  mongoose
    .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Database is connected and ready to use ...`))
    .catch(() => console.log(`Database connection failed ...`));
};

export default dbConnection;
