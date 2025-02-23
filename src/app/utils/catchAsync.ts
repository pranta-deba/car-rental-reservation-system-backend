import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => {
      res.json({
        path: '',
        err,
      });
    });
  };
};

export default catchAsync;
