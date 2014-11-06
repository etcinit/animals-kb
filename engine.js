var engine,

    ensure = require('ensure.js'),
    prompt = require('prompt'),

    dictionary = require('./dictionary'),
    rules = require('./rules');

engine = function () {
    this.currentAnimal = {};

    this.rules = rules;

    this.dictionary = dictionary;

    // Keep track of property the user does not want to answer
    this.skipped = [];

    // Initialize prompt
    prompt.message = "Question!";
    //prompt.delimiter = "><".green;

    prompt.start();
};

engine.prototype.setAnimalObject = function (animal) {
    this.currentAnimal = animal;
};

engine.prototype.getComputableRules = function () {
    var currentKeys = Object.keys(this.currentAnimal),
    computableRules = [],
    usable,
    rule,
    key;

    for(key in this.rules) {
      // Check if we have all the properties needed for this rule
      rule = this.rules[key];
      usable = true;

      rule.requires().forEach(function (requiredProp) {
          if (!ensure.isIn(requiredProp, currentKeys)) {
              usable = false;
          }
      });

      if (usable) {
          computableRules.push(rule);
      }
    }

    return computableRules;
};

engine.prototype.getUncomputableRules = function () {
    var currentKeys = Object.keys(this.currentAnimal),
    uncomputableRules = [],
    isUsable,
    isDuplicated,
    usable,
    rule,
    key;

    isUsable = function (requiredProp) {
        if (!ensure.isIn(requiredProp, currentKeys)) {
            usable = false;
        }
    };

    isDuplicated = function (providedProp) {
        if (ensure.isIn(providedProp, currentKeys)) {
            usable = true;
        }
    };

    for(key in this.rules) {
      // Check if we have all the properties needed for this rule
      rule = this.rules[key];
      usable = true;

      rule.requires().forEach(isUsable);

      rule.provides().forEach(isDuplicated);

      if (!usable) {
          uncomputableRules.push(rule);
      }
    }

    return uncomputableRules;
};

engine.prototype.getBestNextQuestion = function () {
    var uncomputable = this.getUncomputableRules(),
        currentKeys = Object.keys(this.currentAnimal),
        unknownFields = {},
        unknownFieldsArr = [],
        compareProps,
        highestRequirements = 0,
        key;

    // Get all required fields by uncomputable rules
    uncomputable.forEach(function (rule) {
        var requires = rule.requires();

        if (requires.length > highestRequirements) {
            highestRequirements = require.length;
        }
    });

    uncomputable.forEach(function (rule) {
        var requires = rule.requires();

        value = highestRequirements - requires.length;

        requires.forEach(function (requiredProp) {
            if (unknownFields.hasOwnProperty(requiredProp)) {
                unknownFields[requiredProp] += value;
            } else {
                unknownFields[requiredProp] = value;
            }
        });
    });

    // Conver the whole thing to an array
    for (key in unknownFields) {
        unknownFieldsArr.push({
            name: key,
            value: unknownFields[key]
        });
    }

    // Now, filter any that we already have
    unknownFieldsArr = unknownFieldsArr.filter(function (field) {
        if (ensure.isIn(field.name, currentKeys)) {
            return false;
        }

        return true;
    });



    // Sort them by count
    compareProps = function(a, b) {
        if (a.value > b.value) {
        return -1;
        }
        if (a.value < b.value) {
        return 1;
        }
        // a must be equal to b
        return 0;
    };

    unknownFieldsArr = unknownFieldsArr.sort(compareProps);

    return unknownFieldsArr[0];
};

engine.prototype.ask = function (property, callback) {
    var message = 'What ' + property + '?';

    if (this.dictionary.hasOwnProperty(property)) {
        message = this.dictionary[property];
    }

    prompt.get({
        properties: {
            theProp: {
                description: message.white
            }
        }
    }, function (err, result) {
        var lower = result.theProp.toLowerCase();

        if (lower === 'true' || lower === 'yes' || lower === 'y') {
            if (callback) {
                callback(true);
            }
        } else if (lower === 'false' || lower === 'no' || lower === 'n') {
            if (callback) {
                callback(false);
            }
        } else {
            if (callback) {
                callback(lower);
            }
        }

    });
};

engine.prototype.applyComputable = function () {
    var computable = this.getComputableRules(),
        changes = 0;

    computable.forEach(function (rule) {
        if (rule.check(this.currentAnimal)) {
            rule.set(this.currentAnimal);
        }
    }.bind(this));

    if (changes > 0) {
        // Keep going if we made discoveries
        this.applyComputable();
    } else {
        return;
    }
};

engine.prototype.loop = function () {
    var property,
    question;

    // Try to apply computable rules
    this.applyComputable();

    console.log(this.currentAnimal);

    // If we have a type, finish
    if (this.currentAnimal.hasOwnProperty('animalType')) {
        console.log('Animal type is:'.green, this.currentAnimal.animalType);
        return;
    }

    // Ask a question
    question = this.getBestNextQuestion();

    if (ensure.isEmpty(question)) {
        console.log('Sorry, I can\'t help you with that :/'.red);
        return;
    }

    property = question.name;

    this.ask(property, function (result) {
        this.currentAnimal[property] = result;

        this.loop();
    }.bind(this));
};

module.exports = engine;
