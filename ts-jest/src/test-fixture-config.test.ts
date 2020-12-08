import TestFixtureConfig from './test-fixture-config';

describe('TestFixtureConfig', () => {
  let subject: TestFixtureConfig;

  describe('#pickApi', () => {
    it('picks the first supported mode, given no preference', () => {
      subject = TestFixtureConfig.supportingMockAndRealApis();
      expect(subject.pickApi()).toEqual('real');
    });

    it('picks a preferredApi, when supported', () => {
      subject = TestFixtureConfig.supportingMockAndRealApis();
      expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
    });

    it('falls back to the first supported API, when the preferredApi is not available', () => {
      subject = TestFixtureConfig.supportingOnlyMockApis();
      expect(subject.pickApi({ preferredApi: 'real' })).toEqual('mock');
    });

    describe('given an un-monitored e2e that supports mock mode (phase 1-2)', () => {
      beforeEach(() => {
        subject = TestFixtureConfig.supportingOnlyMockApis();
      });

      it('picks mock mode, during integration', () => {
        //TODO KDK: This means the nonintegrate pipeline needs to be updated
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks mock mode, during pre-release', () => {
        //TODO KDK: This means the prerelease pipeline needs to be updated
        expect(subject.pickApi()).toEqual('mock');
      });

      it('picks mock mode, despite a given preference for real mode', () => {
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('mock');
      });
    });

    describe('given an un-monitored e2e that supports mock and real mode (phase 3)', () => {
      beforeEach(() => {
        subject = TestFixtureConfig.supportingMockAndRealApis();
      });

      it('picks mock mode, during integration', () => {
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks real mode, during pre-release', () => {
        expect(subject.pickApi()).toEqual('real');
      });

      it('picks real mode, given a preference for it', () => {
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('real');
      });
    });

    describe('given a monitored e2e that supports mock and real mode (phase 4)', () => {
      beforeEach(() => {
        subject = TestFixtureConfig.externallyMonitored();
      });

      it('picks mock mode, during integration', () => {
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks mock mode, during pre-release', () => {
        expect(subject.pickApi()).toEqual('mock');
      });

      it('picks real mode, given a preference for it', () => {
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('real');
      });
    });
  });
});
