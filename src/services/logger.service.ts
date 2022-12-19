import { injectable } from "inversify";

@injectable()
export default class LoggerService {
  debug(data: any) {
    console.log(data);
  }
}
