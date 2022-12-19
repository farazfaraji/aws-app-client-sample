interface IRemoteConfig {
  connect(): void;
  get(key: string): string;
}
