const namor = require('namor');

const NameGenerator = function() { };

NameGenerator.prototype.nextName = () => {
  return namor.generate({
    char: ' ',
    manly: true,
    numbers: 0,
    words: 2
  });
};

module.exports.NameGenerator = NameGenerator;
