const Greeter = function() { };

Greeter.prototype.greet = (who = 'World') => {
  return `Hello ${who}`;
};

exports.Greeter = Greeter;
