var baseRule = require('../baseRule'),

  isCarnivore1;

// If X gives milk, then X is a mammal
isCarnivore1 = function () {
    baseRule.apply(this, arguments);
};

isCarnivore1.prototype = new baseRule();

isCarnivore1.prototype.provides = function () {
    return ['carnivore'];
};

isCarnivore1.prototype.requires = function () {
    return ['mammal', 'eatsMeat'];
};

isCarnivore1.prototype.check = function (animal) {
    if (animal.mammal && animal.eatsMeat) {
        return true;
    }

    return false;
};

isCarnivore1.prototype.set = function (animal) {
    animal.carnivore = true;

    return animal;
};

module.exports = isCarnivore1;
