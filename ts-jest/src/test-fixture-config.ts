export default class TestFixtureConfig {
  static supportingOnlyMockApis(): TestFixtureConfig {
    return new TestFixtureConfig(false, ['mock']);
  }

  static supportingMockAndRealApis(): TestFixtureConfig {
    return new TestFixtureConfig(false, ['mock', 'real']);
  }

  static externallyMonitored(): TestFixtureConfig {
    return new TestFixtureConfig(true, ['mock', 'real']);
  }

  private constructor(private isExternallyMonitored: boolean, private supportedApis: string[]) { }

  pickApi(options: PickApiOptions = {}): string {
    if(options.preferredApi && this.isSupported(options.preferredApi)) {
      return options.preferredApi;
    } else if(options.preferredApi === 'mock-monitored' && this.isExternallyMonitored && this.isSupported('mock')) {
      return 'mock';
    } else if(options.preferredApi === 'mock-monitored' && !this.isExternallyMonitored && this.isSupported('real')) {
      return 'real';
    } else {
      return 'mock';
    }

    // throw Error('unsupported');
  }

  isSupported(api: string): boolean {
    return this.supportedApis.find(x => x === api) && true || false;
  }
}

interface PickApiOptions {
  preferredApi?: string
}
