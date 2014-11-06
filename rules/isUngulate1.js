var baseRule = require('../baseRule'),

  isUngulate1;

// If X gives milk, then X is a mammal
isUngulate1 = function () {
    baseRule.apply(this, arguments);
};

isUngulate1.prototype = new baseRule();

isUngulate1.prototype.provides = function () {
    return ['ungulate'];
};

isUngulate1.prototype.requires = function () {
    return ['mammal', 'hasHoofs'];
};

isUngulate1.prototype.check = function (animal) {
    if (animal.mammal && animal.hasHoofs) {
        return true;
    }

    return false;
};

isUngulate1.prototype.set = function (animal) {
    animal.ungulate = true;

    return animal;
};

module.exports = isUngulate1;
