export default class TestDriverConfig {
  static withOnlyMockAPISupport(): TestDriverConfig {
    return new TestDriverConfig(false, ['mock']);
  }

  static withMockAndRealAPISupport(): TestDriverConfig {
    return new TestDriverConfig(false, ['mock', 'real']);
  }

  static externallyMonitored(): TestDriverConfig {
    return new TestDriverConfig(true, ['mock', 'real']);
  }

  private constructor(private isExternallyMonitored: boolean, private supportedApis: string[]) { }

  pickApi(options: PickApiOptions = {}): string {
    if(options.preferredApi && this.isSupported(options.preferredApi)) {
      return options.preferredApi;
    } else if(options.preferredApi === 'mock-monitored' && this.isExternallyMonitored) {
      return 'mock';
    } else if(options.preferredApi === 'mock-monitored' && !this.isExternallyMonitored && this.isSupported('real')) {
      return 'real';
    } else {
      //Default to mock mode when no preference given (integration) or fall back when preferred API not supported
      return 'mock';
    }
  }

  isSupported(api: string): boolean {
    return this.supportedApis.find(x => x === api) && true || false;
  }
}

interface PickApiOptions {
  preferredApi?: string
}
