import "reflect-metadata";
import { Application } from "./application";

export function bootstrap() {
  new Application({
    defaultScope: "Singleton",
  });
}

bootstrap();
