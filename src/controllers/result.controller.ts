import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger, IMailService, IResultService } from "../interfaces";
import 'reflect-metadata';
import { IResultController } from "../interfaces";
import { ValidateMiddleware } from "../middlewares";
import { ResultSetDto, ResultGetByIdDto } from "../dto";

@injectable()
export class ResultController extends BaseController implements IResultController{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IResultService) private resultService: IResultService,
    @inject(TYPES.IMailService) private mailService: IMailService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/result',
        method: 'post',
        func: this.setResult,
        middlewares: [new ValidateMiddleware(ResultSetDto)]
      },
      {
        path: '/result',
        method: 'get',
        func: this.getResult,
        middlewares: [new ValidateMiddleware(ResultGetByIdDto)]
      }
    ])
  }
  async getResult(req: Request, res: Response, next: NextFunction) {
    try {  
      const result = await this.resultService.getResultById(req.query as unknown as ResultGetByIdDto);
      
      if (!result) {
        return this.send(res, 401, {
          message: `Результат ${req.query._id} не зарегистрирован`
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

      await this.mailService.send(req.body.email, result._id!.toString());
  
      this.ok(res, {
        message: 'Результат зарегистрирован',
        payload: result
      });
    } catch(e) {
      return this.send(res, 500, {
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`
      })
    }
    
  }
}
