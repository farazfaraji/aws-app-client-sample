import {
  ApplicationConfigurationInterface,
  configuration,
} from "../configuration/configuration";

describe("Main file", () => {
  test("Check if App variable file loaded successfully", () => {
    const appVariables = configuration.app;
    const keys = Object.keys(appVariables);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof ApplicationConfigurationInterface;
      expect(appVariables[key]).not.toBe(undefined);
    }
  });
});
