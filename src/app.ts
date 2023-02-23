import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import errorMiddleware from './middleware/error';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(errorMiddleware);

export default app