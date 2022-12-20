import "reflect-metadata";

import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer, next } from "inversify-express-utils";
import { ApplicationAbstract } from "./abstracts/application.abstarct";
import ConfigService from "./services/configs/config.service";
import LoggerService from "./services/logger.service";
import { Request, Response, NextFunction } from "express";

import "./controllers";
import { ConfigServiceFromAWS } from "./services/configs/libs/config-from-aws.service";
import { Symbols } from "./symbols";
import { configuration } from "./configuration/configuration";

export class Application extends ApplicationAbstract {
  configureApplication(container: Container): void {
    container.bind(Symbols.AppConfiguration).toConstantValue(configuration);
    container.bind(ConfigService).to(ConfigService);
    container.bind<LoggerService>(Symbols.LoggerService).to(LoggerService);
    // modify here if you don't want to use AWS anymore
    container
      .bind<ConfigServiceFromAWS>(Symbols.RemoteConfigLibrary)
      .to(ConfigServiceFromAWS);
  }

  async setup(): Promise<Express.Application> {
    console.log("Starting Server ...");
    const server = new InversifyExpressServer(this.container);

    server.setErrorConfig((app) => {
      // can be improve by creating HTTPExecption Class
      app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        return res.sendStatus(400);
      });
      next();
    });

    server.setConfig((app) => {
      app.use(express.json());
    });

    const app = server.build();

    const port = configuration.app.port;

    app.listen(port, () => {
      console.log(`🎉 [server]: Server is running at http://localhost:${port}`);
    });

    return app;
  }
}
