import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import status from 'http-status';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application route
app.use('/api/v1', router);

// root api
app.get('/', async (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Car Rental System Backend</title>
    </head>
    <body>
        <h1 style="color: #0275d8; font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            Car Rental System Backend 🚗
        </h1>
    </body>
    </html>
  `);
});

// api not found
app.use((req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!',
    error: '',
  });
});

export default app;
