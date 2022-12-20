import { Application } from "./application";

export function bootstrap() {
  const app = new Application({
    defaultScope: "Singleton",
  });

  app.setup();
}

bootstrap();
