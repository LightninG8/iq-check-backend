import { NextFunction, Request, Response } from "express";
import { IBaseController } from '../common';

export interface IResultController extends IBaseController {
  getResult: (req: Request, res: Response, next: NextFunction) => void;
  setResult: (req: Request, res: Response, next: NextFunction) => void;
};
