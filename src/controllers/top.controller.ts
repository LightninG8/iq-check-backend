import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger, IResultService } from "../interfaces";
import 'reflect-metadata';
import { ITopController } from "../interfaces";
import { ValidateMiddleware } from "../middlewares";
import { ResultGetTopDto } from "../dto";

@injectable()
export class TopController extends BaseController implements ITopController{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IResultService) private resultService: IResultService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/top',
        method: 'get',
        func: this.getTop,
        middlewares: [new ValidateMiddleware(ResultGetTopDto)]
      }
    ])
  }
  async getTop(req: Request, res: Response, next: NextFunction) {
    try { 
      const topOfPeriodResults = await this.resultService.getTop(req.query as unknown as ResultGetTopDto);
      
      if (!topOfPeriodResults?.length) {
        return this.send(res, 401, {
          message: `Топ результатов за ${req.query.period} дней не найдены`
        })
      }

      this.ok(res, {
        message: 'Результаты найдены',
        data: topOfPeriodResults
      })
    } catch (e) {
      return this.send(res, 500, {
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`
      })
    }
  }
}
