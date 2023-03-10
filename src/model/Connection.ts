import 'dotenv/config';
import mongoose from 'mongoose';

const options = {
  dbName: 'fisio',
};

const connectToDatabase = (mongoDatabaseURI = process.env.DATABASEURL
  || 'mongodb://localhost:27017/fisio') => mongoose.connect(mongoDatabaseURI, options);

export default connectToDatabase;