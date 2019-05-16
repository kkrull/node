const assert = require('assert');
const Commander = require('../src/commander').Commander;

describe('Commander', () => {
  describe('#assignMission', () => {
    it('returns a string', () => {
      const mission = new Commander().assignMission();
      assert.equal(typeof(mission), 'string');
    });
  });
});
