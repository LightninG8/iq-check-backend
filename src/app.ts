import express, { Express } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { IConfigService, IDatabaseService, IExceptionFilter, ILogger, IMailService, IRecentController, IRestoreController, IResultController, ITopController } from './interfaces';
import 'reflect-metadata';
import { json } from 'body-parser';
import cors from 'cors';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor (
    @inject(TYPES.ILogger) private logger: ILogger,

    @inject(TYPES.IResultController) private resultController: IResultController,
    @inject(TYPES.IRecentController) private recentController: IRecentController,
    @inject(TYPES.ITopController) private topController: ITopController,
    @inject(TYPES.IRestoreController) private restoreController: IRestoreController,


    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.IDatabaseService) private databaseService: IDatabaseService,
    @inject(TYPES.IMailService) private mailService: IMailService,


  ) {
    this.app = express();
    this.port = 8080;
  };
  useRoutes() {
    this.app.use('/api/v1', this.resultController.router);
    this.app.use('/api/v1', this.recentController.router);
    this.app.use('/api/v1', this.topController.router);
    this.app.use('/api/v1', this.restoreController.router);

  };

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  };

  useMiddleware() {
    this.app.use(json());
    this.app.use(cors());

  }

  async useDatabase() {
    await this.databaseService.connect();
  }

  async useMail() {
    await this.mailService.connect();
  }

  public async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    await this.useDatabase();
    await this.useMail();

    this.server = await this.app.listen(this.port, () => {
      this.logger.log(`[App] Сервер запущен на https://localhost:${this.port}`)
    });

  };
}
