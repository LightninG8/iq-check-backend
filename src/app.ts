import express, { Express } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter, ILogger, IResultController } from './interfaces';
import 'reflect-metadata';
import { IBaseController } from 'common';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor (
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IResultController) private resultController: IResultController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
  ) {
    this.app = express();
    this.port = 8080;
    this.logger = logger;
    this.resultController = resultController;
    this.exceptionFilter = exceptionFilter;

  };

  useRoutes() {
    this.app.use('/result', this.resultController.router);
  };

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  };

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();

    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Сервер запущен на https://localhost:${this.port}`)
    });
  };
}
