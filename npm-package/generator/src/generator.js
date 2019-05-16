const namor = require('namor');

const NameGenerator = function() { };

NameGenerator.prototype.nextName = () => {
  const name = namor.generate({
    char: ' ',
    manly: true,
    numbers: 0,
    words: 2
  });

  console.log(`generated: ${name}`);
  return name;
};

module.exports.NameGenerator = NameGenerator;
