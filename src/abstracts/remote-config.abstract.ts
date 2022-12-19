import { injectable } from "inversify";

@injectable()
export abstract class RemoteConfigAbstract {
  abstract connect(): Promise<any> | boolean;
  abstract get(): Promise<any> | any | null;
  abstract getByKey(key: string): Promise<string | null> | string | null;
}
