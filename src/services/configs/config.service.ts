import { inject, injectable } from "inversify";
import { RemoteConfigAbstract } from "../../abstracts/remote-config.abstract";
import { Symbols } from "../../symbols";
import LoggerService from "../logger.service";
import { ConfigServiceFromLocal } from "./libs/config-from-local.service";

@injectable()
export default class ConfigService {
  private loggerService: LoggerService;
  private remoteConfigService: RemoteConfigAbstract;
  private localConfigService: RemoteConfigAbstract;
  private appConfiguration: any;
  constructor(
    @inject(Symbols.LoggerService) _loggerService: LoggerService,
    @inject(Symbols.RemoteConfigLibrary)
    _remoteConfigService: RemoteConfigAbstract,
    @inject(Symbols.AppConfiguration) _appConfiguration: any
  ) {
    this.loggerService = _loggerService;
    this.remoteConfigService = _remoteConfigService;
    this.appConfiguration = _appConfiguration;

    this.localConfigService = new ConfigServiceFromLocal(
      _appConfiguration.app.localPathConfig
    );
  }
  async fetchConfigByKey(key: string) {
    this.loggerService.debug("fetchConfigByKey Called");
    this.localConfigService.connect();
    await this.remoteConfigService.connect();
    let result = await this.remoteConfigService.getByKey(key);
    if (!result) {
      result = (await this.localConfigService.getByKey(key)) || null;
    }
    return result;
  }

  async fetchConfig() {
    this.loggerService.debug("fetchConfig Called");
    // depend on business decision, it can connect in constractuction, but in this case
    // we want to be sure that each time we are getting the fresh lists of configs
    this.localConfigService.connect();
    await this.remoteConfigService.connect();
    let result = await this.remoteConfigService.get();
    if (!result) {
      result = (await this.localConfigService.get()) || null;
    }
    return result;
  }
}
