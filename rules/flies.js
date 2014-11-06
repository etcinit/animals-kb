var baseRule = require('../baseRule'),

  flies;

// If X gives milk, then X is a mammal
flies = function () {
    baseRule.apply(this, arguments);
};

flies.prototype = new baseRule();

flies.prototype.provides = function () {
    return ['bird'];
};

flies.prototype.requires = function () {
    return ['flies', 'laysEggs'];
};

flies.prototype.check = function (animal) {
    if (animal.flies && animal.laysEggs) {
        return true;
    }

    return false;
};

flies.prototype.set = function (animal) {
    animal.bird = true;

    return animal;
};

module.exports = flies;
