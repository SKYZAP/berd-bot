import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

export function logger(req: Request, res: Response, next: NextFunction) {
  Logger.log(`Response...`);
  console.log(res);
  next();
}
