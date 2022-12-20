import { Container, interfaces } from "inversify";

export abstract class ApplicationAbstract {
  protected readonly container: Container;

  constructor(options: interfaces.ContainerOptions) {
    this.container = new Container(options);

    this.configureApplication(this.container);
  }

  abstract configureApplication(container: Container): void;
  abstract setup(): Promise<Express.Application> | Express.Application;
}
