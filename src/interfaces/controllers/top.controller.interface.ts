import { NextFunction, Request, Response } from "express";
import { IBaseController } from './base.controller.interface';

export interface ITopController extends IBaseController {
  getTop: (req: Request, res: Response, next: NextFunction) => void;
};
