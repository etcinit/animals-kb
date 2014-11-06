var Engine = require('./engine'),

    zooEngine;

zooEngine = new Engine();

console.log('Computable:', zooEngine.getComputableRules());
console.log('Uncomputable:', zooEngine.getUncomputableRules());
console.log('Best question:', zooEngine.getBestNextQuestion());

zooEngine.loop();
