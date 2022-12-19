import { RemoteConfigAbstract } from "../../../abstracts/remote-config.abstract";
import * as fs from "fs";
import * as flat from "flat";
import * as path from "path";

export class ConfigServiceFromLocal extends RemoteConfigAbstract {
  private configPath: string;
  private localConfig: any;
  constructor(_configPath: string) {
    super();
    this.configPath = path.resolve(_configPath);
  }
  connect(): boolean {
    if (!fs.existsSync(this.configPath))
      throw new Error("Local config file not found");
    try {
      this.localConfig = flat.flatten(
        JSON.parse(fs.readFileSync(this.configPath, "utf-8"))
      );
    } catch (e) {
      throw new Error("Something is wrong to load the config file");
    }
    return true;
  }

  async getByKey(key: string) {
    return this.localConfig[key] === undefined ? null : this.localConfig[key];
  }

  async get() {
    return this.localConfig;
  }
}
