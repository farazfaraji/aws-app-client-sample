import { injectable } from "inversify";

@injectable()
export default class LoggerService {
  //@todo implement winston here
  debug(data: any) {
    console.log(data);
  }
}
