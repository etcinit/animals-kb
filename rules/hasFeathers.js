var baseRule = require('../baseRule'),

  hasFeathers;

// If X gives milk, then X is a mammal
hasFeathers = function () {
    baseRule.apply(this, arguments);
};

hasFeathers.prototype = new baseRule();

hasFeathers.prototype.provides = function () {
    return ['bird'];
};

hasFeathers.prototype.requires = function () {
    return ['hasFeathers'];
};

hasFeathers.prototype.check = function (animal) {
    if (animal.hasFeathers) {
        return true;
    }

    return false;
};

hasFeathers.prototype.set = function (animal) {
    animal.bird = true;

    return animal;
};

module.exports = hasFeathers;
