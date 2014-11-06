var baseRule = require('../baseRule'),

  isPenguin;

// If X gives milk, then X is a mammal
isPenguin = function () {
    baseRule.apply(this, arguments);
};

isPenguin.prototype = new baseRule();

isPenguin.prototype.provides = function () {
    return ['animalType'];
};

isPenguin.prototype.requires = function () {
    return ['bird', 'flies', 'swims', 'isBW'];
};

isPenguin.prototype.check = function (animal) {
    if (animal.bird &&
      animal.flies === false &&
      animal.swims &&
      animal.isBW) {
        return true;
    }

    return false;
};

isPenguin.prototype.set = function (animal) {
    animal.animalType = 'penguin';

    return animal;
};

module.exports = isPenguin;
