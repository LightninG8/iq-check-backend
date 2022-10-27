import { ConfigService, DatabaseService, LoggerService, ResultService } from "./services";
import { App } from "./app";
import { ResultController } from './controllers';
import { ExceptionFilter } from "./exceptions";
import { Container, ContainerModule, interfaces  } from 'inversify';
import { TYPES } from "./types";
import { IConfigService, IDatabaseService, IExceptionFilter, ILogger, IResultController, IResultService } from "./interfaces";

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
};

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IResultController>(TYPES.IResultController).to(ResultController).inSingletonScope();
  bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
  bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService).inSingletonScope();
  bind<IResultService>(TYPES.IResultService).to(ResultService).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

const bootstrap = async (): Promise<IBootstrapReturn> => {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();

  return { appContainer, app };
}

export const boot = bootstrap();
