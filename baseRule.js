var baseRule;

// Define the base rule
baseRule = function () {};

baseRule.prototype.provides = function () {
    return [];
};

baseRule.prototype.check = function (animal) {
    return false;
};

baseRule.prototype.set = function (animal) {
    return animal;
};

baseRule.prototype.requires = function () {
    return [];
};

module.exports = baseRule;
