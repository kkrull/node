const Commander = require('../commander').Commander;
const Greeter = require('greeter').Greeter;
const NameGenerator = require('generator').NameGenerator;

const commander = new Commander();
const generator = new NameGenerator();
const greeter = new Greeter();

console.log(greeter.greet(generator.nextName()));
console.log('Run along now, and ' + commander.assignMission());
