const assert = require('assert');
const Greeter = require('../src/greeter').Greeter;

describe('Greeter', () => {
  describe('#greet', () => {
    it('returns "Hello World", given no parameters', () => {
      const greeter = new Greeter();
      assert.equal(greeter.greet(), 'Hello World');
    });

    it('returns "Hello George", given "George"', () => {
      const greeter = new Greeter();
      assert.equal(greeter.greet('George'), 'Hello George');
    });
  });
});
