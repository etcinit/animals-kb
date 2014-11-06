var baseRule = require('../baseRule'),

  isZebra;

// If X gives milk, then X is a mammal
isZebra = function () {
    baseRule.apply(this, arguments);
};

isZebra.prototype = new baseRule();

isZebra.prototype.provides = function () {
    return ['animalType'];
};

isZebra.prototype.requires = function () {
    return ['ungulate', 'hasWhiteColor', 'hasBlackStripes'];
};

isZebra.prototype.check = function (animal) {
    if (animal.ungulate &&
      animal.hasWhiteColor &&
      animal.hasBlackStripes) {
        return true;
    }

    return false;
};

isZebra.prototype.set = function (animal) {
    animal.animalType = 'zebra';

    return animal;
};

module.exports = isZebra;
