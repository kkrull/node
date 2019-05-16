const Greeter = require('greeter').Greeter;
const NameGenerator = require('generator').NameGenerator;

const generator = new NameGenerator();
const greeter = new Greeter();
console.log(greeter.greet(generator.nextName()));
