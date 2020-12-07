import TestFixtureConfig from './test-fixture-config';

describe('TestFixtureConfig', () => {
  let subject: TestFixtureConfig;

  describe('#pickApi', () => {
    describe('given an un-monitored e2e that supports mock mode (phase 1-2)', () => {
      beforeEach(() => {
        subject = TestFixtureConfig.supportingOnlyMockApis();
      });

      it.skip('picks mock mode, during integration', () => {
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks mock mode, during pre-release', () => {
        expect(subject.pickApi()).toEqual('mock');
      });

      it.skip('picks mock mode, despite a given preference for real mode', () => {
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('mock');
      });
    });

    describe('given an un-monitored e2e that supports mock and real mode (phase 3)', () => {
      beforeEach(() => {
        subject = TestFixtureConfig.supportingMockAndRealApis();
      });

      it.skip('picks mock mode, during integration', () => {
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks real mode, during pre-release', () => {
        expect(subject.pickApi()).toEqual('real');
      });

      it.skip('picks real mode, given a preference for it', () => {
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('real');
      });
    });

    describe('given a monitored e2e that supports mock and real mode (phase 4)', () => {
      beforeEach(() => {
        subject = TestFixtureConfig.externallyMonitored();
      });

      it.skip('picks mock mode, during integration', () => {
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks mock mode, during pre-release', () => {
        expect(subject.pickApi()).toEqual('mock');
      });

      it.skip('picks real mode, given a preference for it', () => {
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('real');
      });
    });

    it.todo('falls back to real mode, when mock mode is preferred but not supported');
  });
});
