var baseRule = require('../baseRule'),

  isCheetah;

// If X gives milk, then X is a mammal
isCheetah = function () {
    baseRule.apply(this, arguments);
};

isCheetah.prototype = new baseRule();

isCheetah.prototype.provides = function () {
    return ['animalType'];
};

isCheetah.prototype.requires = function () {
    return ['carnivore', 'hasTawnyColor', 'hasDarkSpots'];
};

isCheetah.prototype.check = function (animal) {
    if (animal.carnivore && animal.hasTawnyColor && animal.hasDarkSpots) {
        return true;
    }

    return false;
};

isCheetah.prototype.set = function (animal) {
    animal.animalType = 'cheetah';

    return animal;
};

module.exports = isCheetah;
