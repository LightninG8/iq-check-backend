import { NextFunction, Request, Response } from "express";
import { IBaseController } from "./base.controller.interface";

export interface IRestoreController extends IBaseController {
  restoreResult: (req: Request, res: Response, next: NextFunction) => void;
}
