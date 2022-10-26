import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../services";
import { HTTPError } from "../exceptions";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger } from "../interfaces";
import 'reflect-metadata';
import { IResultController } from "../interfaces";
import { ResultModel } from '../models';
import { ValidateMiddleware } from "../middlewares";
import { ResultSetDto, ResultGetDto } from "../dto";

@injectable()
export class ResultController extends BaseController implements IResultController{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/',
        method: 'post',
        func: this.setResult,
        middlewares: [new ValidateMiddleware(ResultSetDto)]
      },
      {
        path: '/',
        method: 'get',
        func: this.getResult,
        middlewares: [new ValidateMiddleware(ResultGetDto)]
      }
    ])
  }
  async getResult(req: Request, res: Response, next: NextFunction) {
    try {
      const result = (await ResultModel.find({email: req.query.email}).sort({updatedAt: -1}).limit(1))[0]

      if (!result) {
        next(new HTTPError(401, `Результат ${req.query.email} не зарегистрирован`, 'result'));

        return this.send(res, 401, {
          message: `Результат ${req.route.email} не зарегистрирован`
        })
      }

      this.ok(res, {
        message: 'Результат найден',
        result
      })
    } catch (e) {
      return this.send(res, 500, {
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`
      })
    }
  }
  async setResult(req: Request, res: Response, next: NextFunction) {
    try {
      const result = new ResultModel(req.body);

      await result.save();

      this.ok(res, {
        message: 'Результат зарегистрирован',
        result
      });
    } catch(e) {
      return this.send(res, 500, {
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`
      })
    }
    
  }
}
