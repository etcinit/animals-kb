var baseRule = require('../baseRule'),

  isAlbatross;

// If X gives milk, then X is a mammal
isAlbatross = function () {
    baseRule.apply(this, arguments);
};

isAlbatross.prototype = new baseRule();

isAlbatross.prototype.provides = function () {
    return ['animalType'];
};

isAlbatross.prototype.requires = function () {
    return ['bird', 'isGoodFlyer'];
};

isAlbatross.prototype.check = function (animal) {
    if (animal.bird &&
      animal.isGoodFlyer) {
        return true;
    }

    return false;
};

isAlbatross.prototype.set = function (animal) {
    animal.animalType = 'albatross';

    return animal;
};

module.exports = isAlbatross;
