const Greeter = function() { };

Greeter.prototype.greet = (who = 'World') => {
  return `Hello ${who}`;
};

module.exports.Greeter = Greeter;
