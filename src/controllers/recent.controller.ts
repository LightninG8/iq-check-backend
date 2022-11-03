import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger, IResultService } from "../interfaces";
import 'reflect-metadata';
import { IRecentController } from "../interfaces";
import { ValidateMiddleware } from "../middlewares";
import { ResultGetRecentDto } from "../dto";

@injectable()
export class RecentController extends BaseController implements IRecentController{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IResultService) private resultService: IResultService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/recent',
        method: 'get',
        func: this.getRecent,
        middlewares: [new ValidateMiddleware(ResultGetRecentDto)]
      }
    ])
  }
  async getRecent(req: Request, res: Response, next: NextFunction) {
    try { 
      const recentResults = await this.resultService.getRecent(req.query as unknown as ResultGetRecentDto);
      
      if (!recentResults?.length) {
        return this.send(res, 401, {
          message: `Последние ${req.query.limit} не найдены`
        })
      }

      this.ok(res, {
        message: 'Результаты найдены',
        data: recentResults
      })
    } catch (e) {
      return this.send(res, 500, {
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`
      })
    }
  }
}
