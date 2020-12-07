export default class TestFixtureConfig {
  static supportingOnlyMockApis(): TestFixtureConfig {
    return new TestFixtureConfig(['mock']);
  }

  static supportingMockAndRealApis(): TestFixtureConfig {
    return new TestFixtureConfig(['real', 'mock']);
  }

  static externallyMonitored(): TestFixtureConfig {
    return new TestFixtureConfig(['mock', 'real']);
  }

  private constructor(private supportedApis: string[]) { }

  pickApi(options: PickApiOptions = {}): string {
    if (options.preferredApi && this.supportedApis.find(x => x === options.preferredApi)) {
      return options.preferredApi;
    }

    return this.supportedApis[0];
  }
}

interface PickApiOptions {
  preferredApi?: string
}
