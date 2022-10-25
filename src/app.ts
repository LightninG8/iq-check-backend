import express, { Express } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { IConfigService, IDatabaseService, IExceptionFilter, ILogger, IResultController } from './interfaces';
import 'reflect-metadata';
import mongoose from 'mongoose';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor (
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IResultController) private resultController: IResultController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.IDatabaseService) private databaseService: IDatabaseService,

  ) {
    this.app = express();
    this.port = 8080;
  };
  useRoutes() {
    this.app.use('/result', this.resultController.router);
  };

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  };

  async useDatabase() {
    await this.databaseService.connect();
  }

  public async init() {
    this.useRoutes();
    this.useExceptionFilters();
    await this.useDatabase();

    this.server = await this.app.listen(this.port, () => {
      this.logger.log(`[App] Сервер запущен на https://localhost:${this.port}`)
    });

  };
}
