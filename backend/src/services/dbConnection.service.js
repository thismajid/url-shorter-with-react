import mongoose from 'mongoose';

import dbConfig from '../configs/db.config';

const dbConnection = () => {
  mongoose
    .connect(
      `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log(`Database is connected and ready to use ...`))
    .catch(() => console.log(`Database connection failed ...`));
};

export default dbConnection;
