import { controller, httpGet, requestParam } from "inversify-express-utils";
import { Request, Response } from "express";

import ConfigService from "../services/configs/config.service";

@controller("/config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}
  @httpGet("/:key")
  async getConfigByKey(
    @requestParam("key") key: string,
    req: Request,
    res: Response
  ) {
    const result = await this.configService.fetchConfigByKey(key);
    if (result) {
      res.send({ key, value: result });
    } else {
      res.sendStatus(404);
    }
  }

  @httpGet("/")
  async getConfig(req: Request, res: Response) {
    const result = await this.configService.fetchConfig();
    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  }
}
