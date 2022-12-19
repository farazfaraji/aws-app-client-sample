import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";

@controller("/health")
export class HealthController {
  @httpGet("/")
  async checkHealth(req: Request, res: Response) {
    res.json({ status: "ok" });
  }
}
