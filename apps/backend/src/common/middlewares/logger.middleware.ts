import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  // Capture response details
  res.on('finish', () => {
    const elapsedTime = Date.now() - startTime;
    const log = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      elapsedTime: `${elapsedTime}ms`,
      timestamp: new Date().toISOString(),
    };

    console.log(JSON.stringify(log, null, 2));
  });

  next();
}
