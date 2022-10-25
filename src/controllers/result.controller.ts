import { BaseController } from "../common";
import { NextFunction, Request, Response } from "express";
import { LoggerService } from "logger";
import { HTTPError } from "../errors";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger } from "../interfaces";
import 'reflect-metadata';
import { IResultController } from "../interfaces";

@injectable()
export class ResultController extends BaseController implements IResultController{
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);

    this.bindRoutes([
      { path: '/', method: 'post', func: this.setResult },
      { path: '/', method: 'get', func: this.getResult }
    ])
  }
  getResult(req: Request, res: Response, next: NextFunction) {
    // this.ok(res, 'get result');
    next(new HTTPError(401, 'ошибка авторизации', 'login'));
  }
  setResult(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'set result');
  }
}
