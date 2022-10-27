import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger, IResultService } from "../interfaces";
import 'reflect-metadata';
import { IResultController } from "../interfaces";
import { ValidateMiddleware } from "../middlewares";
import { ResultSetDto, ResultGetDto } from "../dto";

@injectable()
export class ResultController extends BaseController implements IResultController{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IResultService) private resultService: IResultService,
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
      const result = await this.resultService.get(req.body);
      
      if (!result) {
        return this.send(res, 401, {
          message: `Результат ${req.body._id} не зарегистрирован`
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
      const result = await this.resultService.set(req.body);

      if (!result) {
        return this.send(res, 401, {
          message: `Ошибка запроса. Проверьте корректность введённых данных`
        })
      }
  
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
