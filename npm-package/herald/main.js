const Greeter = require('greeter').Greeter;
const NameGenerator = require('generator').NameGenerator;

const Commander = function() { };
Commander.prototype.assignMission = () => {
  return 'solve one problem without creating any new ones';
};

const commander = new Commander();
const generator = new NameGenerator();
const greeter = new Greeter();

console.log(greeter.greet(generator.nextName()));
console.log('Run along now, and ' + commander.assignMission());
