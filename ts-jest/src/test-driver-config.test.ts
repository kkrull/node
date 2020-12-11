import TestDriverConfig from './test-driver-config';

describe('TestDriverConfig', () => {
  let subject: TestDriverConfig;

  describe('#pickApi', () => {
    describe('when running during development', () => {
      it('picks mock mode for an e2e that supports mock mode (phase 1-2)', () => {
        subject = TestDriverConfig.withOnlyMockAPISupport();
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks mock mode for an e2e that supports mock and real mode (phase 3)', () => {
        subject = TestDriverConfig.withMockAndRealAPISupport();
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });

      it('picks mock mode for a monitored e2e that supports mock and real mode (phase 4)', () => {
        subject = TestDriverConfig.externallyMonitored();
        expect(subject.pickApi({ preferredApi: 'mock' })).toEqual('mock');
      });
    });

    describe('when running integration', () => {
      it('picks mock mode for an e2e that supports mock mode (phase 1-2)', () => {
        subject = TestDriverConfig.withOnlyMockAPISupport();
        expect(subject.pickApi()).toEqual('mock');
      });

      it('picks mock mode for an e2e that supports mock and real mode (phase 3)', () => {
        subject = TestDriverConfig.withMockAndRealAPISupport();
        expect(subject.pickApi()).toEqual('mock');
      });

      it('picks mock mode for a monitored e2e that supports mock and real mode (phase 4)', () => {
        subject = TestDriverConfig.externallyMonitored();
        expect(subject.pickApi()).toEqual('mock');
      });
    });

    describe('when running prerelease', () => {
      it('picks mock mode for an un-monitored e2e that supports mock mode (phase 1-2)', () => {
        subject = TestDriverConfig.withOnlyMockAPISupport();
        expect(subject.pickApi({ preferredApi: 'mock-monitored' })).toEqual('mock');
      });

      it('picks real mode for an un-monitored e2e that supports mock and real mode (phase 3)', () => {
        subject = TestDriverConfig.withMockAndRealAPISupport();
        expect(subject.pickApi({ preferredApi: 'mock-monitored' })).toEqual('real');
      });

      it('picks mock mode for a monitored e2e that supports mock and real mode (phase 4)', () => {
        subject = TestDriverConfig.externallyMonitored();
        expect(subject.pickApi({ preferredApi: 'mock-monitored' })).toEqual('mock');
      });
    });

    describe('when running external monitoring', () => {
      it('picks mock mode for an un-monitored e2e that supports mock mode (phase 1-2)', () => {
        subject = TestDriverConfig.withOnlyMockAPISupport();
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('mock');
      });

      it('picks real mode for an un-monitored e2e that supports mock and real mode (phase 3)', () => {
        subject = TestDriverConfig.withMockAndRealAPISupport();
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('real');
      });

      it('picks real mode for an monitored e2e that supports mock and real mode (phase 4)', () => {
        subject = TestDriverConfig.externallyMonitored();
        expect(subject.pickApi({ preferredApi: 'real' })).toEqual('real');
      });
    });
  });
});
