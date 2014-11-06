var baseRule = require('../baseRule'),

  isHairy;

// If X has hair, then X is a mammal
isHairy = function() {
    baseRule.apply(this, arguments);
};

isHairy.prototype = new baseRule();

isHairy.prototype.requires = function () {
    return ['hairy'];
};

isHairy.prototype.provides = function () {
    return ['mammal'];
};

isHairy.prototype.check = function (animal) {
    if (animal.hairy) {
        return true;
    }

    return false;
};

isHairy.prototype.set = function (animal) {
    animal.mammal = true;

    return animal;
};

module.exports = isHairy;
