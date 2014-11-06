var rules,

    initializedRules = {},
    key,

    requireDir = require('require-dir');

rules = requireDir('./rules');

console.log('Loaded', Object.keys(rules).length, 'rules');

for (key in rules) {
    initializedRules[key] = new rules[key]();
}

console.log('Constructed rule instances');

module.exports = initializedRules;
