import { LoggerService } from "./logger";
import { App } from "./app";
import { ResultController } from './controllers';
import { ExceptionFilter } from "./errors";
import { Container, ContainerModule, interfaces  } from 'inversify';
import { TYPES } from "./types";
import { IExceptionFilter, ILogger } from "./interfaces";

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
};

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<ResultController>(TYPES.IResultController).to(ResultController);
  bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = async (): Promise<IBootstrapReturn> => {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  await app.init();

  return { appContainer, app };
}

export const boot = bootstrap();
