import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application route
// app.use('/api/v1');

app.get('/', async (req: Request, res: Response) => {
  res.send('hello world');
});

export default app;
