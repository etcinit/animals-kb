var baseRule = require('../baseRule'),

  isUngulate2;

// If X gives milk, then X is a mammal
isUngulate2 = function () {
    baseRule.apply(this, arguments);
};

isUngulate2.prototype = new baseRule();

isUngulate2.prototype.provides = function () {
    return ['ungulate'];
};

isUngulate2.prototype.requires = function () {
    return ['mammal', 'eatsCud'];
};

isUngulate2.prototype.check = function (animal) {
    if (animal.mammal && animal.eatsCud) {
        return true;
    }

    return false;
};

isUngulate2.prototype.set = function (animal) {
    animal.ungulate = true;

    return animal;
};

module.exports = isUngulate2;
