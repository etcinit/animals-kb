var baseRule = require('../baseRule'),

  isCarnivore2;

// If X gives milk, then X is a mammal
isCarnivore2 = function () {
    baseRule.apply(this, arguments);
};

isCarnivore2.prototype = new baseRule();

isCarnivore2.prototype.provides = function () {
    return ['carnivore'];
};

isCarnivore2.prototype.requires = function () {
    return ['mammal', 'hasPointedTeeth', 'hasClaws', 'hasForwardEyes'];
};

isCarnivore2.prototype.check = function (animal) {
    if (animal.mammal &&
        animal.hasPointedTeeth &&
        animal.hasClaws &&
        animal.hasForwardEyes) {
        return true;
    }

    return false;
};

isCarnivore2.prototype.set = function (animal) {
    animal.carnivore = true;

    return animal;
};

module.exports = isCarnivore2;
