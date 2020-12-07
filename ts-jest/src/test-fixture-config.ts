export default class TestFixtureConfig {
  static supportingOnlyMockApis(): TestFixtureConfig {
    return new TestFixtureConfig(['mock']);
  }

  static supportingMockAndRealApis(): TestFixtureConfig {
    return new TestFixtureConfig(['mock', 'real']);
  }

  private constructor(private supportedApis: string[]) { }

  pickApi(): string {
    return this.supportedApis[0];
  }
}
