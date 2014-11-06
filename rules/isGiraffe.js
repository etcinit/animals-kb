var baseRule = require('../baseRule'),

  isGiraffe;

// If X gives milk, then X is a mammal
isGiraffe = function () {
    baseRule.apply(this, arguments);
};

isGiraffe.prototype = new baseRule();

isGiraffe.prototype.provides = function () {
    return ['animalType'];
};

isGiraffe.prototype.requires = function () {
    return ['ungulate', 'hasLongLegs', 'hasLongNeck', 'hasDarkSpots'];
};

isGiraffe.prototype.check = function (animal) {
    if (animal.ungulate &&
      animal.hasLongLegs &&
      animal.hasLongNeck &&
      animal.hasDarkSpots) {
        return true;
    }

    return false;
};

isGiraffe.prototype.set = function (animal) {
    animal.animalType = 'giraffe';

    return animal;
};

module.exports = isGiraffe;
