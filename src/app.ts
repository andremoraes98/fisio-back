import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use((err: Error, _req: Request, res: Response, next: express.NextFunction) => {
  const { name, message, details } = err as any;

  switch (name) {
    case 'BadRequestError':
      res.status(400).json({ message });
      break;
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
});
app.use(userRoute);

app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'working' })
})

export default app