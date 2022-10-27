import { NextFunction, Request, Response } from "express";

export interface IValidateMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void
}
