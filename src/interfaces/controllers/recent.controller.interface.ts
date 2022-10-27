import { NextFunction, Request, Response } from "express";
import { IBaseController } from './base.controller.interface';

export interface IRecentController extends IBaseController {
  getRecent: (req: Request, res: Response, next: NextFunction) => void;
}
