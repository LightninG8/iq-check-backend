import { BaseController } from "./base.controller";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { ILogger, IMailService, IResultService } from "../interfaces";
import 'reflect-metadata';
import { IRestoreController } from "../interfaces";
import { ValidateMiddleware } from "../middlewares";
import { ResultRestoreDto } from "../dto";

@injectable()
export class RestoreController extends BaseController implements IRestoreController{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.IResultService) private resultService: IResultService,
    @inject(TYPES.IMailService) private mailService: IMailService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/restore',
        method: 'post',
        func: this.restoreResult,
        middlewares: [new ValidateMiddleware(ResultRestoreDto)]
      }
    ])
  }
  async restoreResult(req: Request, res: Response, next: NextFunction) {
    try { 
      const result = await this.resultService.getResultByEmail(req.body);
      
      if (!result) {
        return this.send(res, 401, {
          message: `Результат ${req.body.email} не найден`
        })
      }

      this.mailService.send(req.body.email as string, result._id!.toString());

      this.ok(res, {
        message: 'Результат найден',
        data: result
      })
    } catch (e) {
      return this.send(res, 500, {
        message: `Ошибка сервера. Повтроите запрос позднее. ${e}`
      })
    }
  }
}
