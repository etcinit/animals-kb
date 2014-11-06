var baseRule = require('../baseRule'),

  isTiger;

// If X gives milk, then X is a mammal
isTiger = function () {
    baseRule.apply(this, arguments);
};

isTiger.prototype = new baseRule();

isTiger.prototype.provides = function () {
    return ['animalType'];
};

isTiger.prototype.requires = function () {
    return ['carnivore', 'hasTawnyColor', 'hasBlackStripes'];
};

isTiger.prototype.check = function (animal) {
    if (animal.carnivore &&
      animal.hasTawnyColor &&
      animal.hasBlackStripes) {
        return true;
    }

    return false;
};

isTiger.prototype.set = function (animal) {
    animal.animalType = 'tiger';

    return animal;
};

module.exports = isTiger;
