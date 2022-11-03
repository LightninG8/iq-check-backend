import { NextFunction, Request, Response } from "express";
import { IBaseController } from './base.controller.interface';

export interface IResultController extends IBaseController {
  getResult: (req: Request, res: Response, next: NextFunction) => void;
  getResults: (req: Request, res: Response, next: NextFunction) => void;
  setResult: (req: Request, res: Response, next: NextFunction) => void;
};
