var baseRule = require('../baseRule'),

  givesMilk;

// If X gives milk, then X is a mammal
givesMilk = function () {
    baseRule.apply(this, arguments);
};

givesMilk.prototype = new baseRule();

givesMilk.prototype.provides = function () {
    return ['mammal'];
};

givesMilk.prototype.requires = function () {
    return ['givesMilk'];
};

givesMilk.prototype.check = function (animal) {
    if (animal.givesMilk) {
        return true;
    }

    return false;
};

givesMilk.prototype.set = function (animal) {
    animal.mammal = true;

    return animal;
};

module.exports = givesMilk;
