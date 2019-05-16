const assert = require('assert');

describe('Array', () => {
  describe('#indexOf', () => {
    it('returns -1 when an element is not found', () => {
      assert.equal(['a'].indexOf('b'), -1);
    });
  });
});
