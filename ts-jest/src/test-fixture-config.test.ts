import TestFixtureConfig from './test-fixture-config';

describe('TestFixtureConfig', () => {
  let subject: TestFixtureConfig;

  describe('#pickApi', () => {
    describe('given a configuration that only supports mock mode (phase 1-2)', () => {
      it('picks mock mode', () => {
        subject = TestFixtureConfig.supportingOnlyMockApis();
        expect(subject.pickApi()).toEqual('mock');
      });
    });

    describe('given a configuration that supports mock and real mode (phase 3+)', () => {
      it('picks mock mode, during integration', () => {
        subject = TestFixtureConfig.supportingMockAndRealApis();
        expect(subject.pickApi()).toEqual('mock');
      });
    });

    it.todo('picks a supported mock mode, when no preference is given');
    it.todo('falls back to real mode, when mock mode is preferred but not supported');
    it.todo('picks a supported real mode, when real mode is preferred');
    it.todo('picks a supported real mode, when compelled to do so');
  });
});
