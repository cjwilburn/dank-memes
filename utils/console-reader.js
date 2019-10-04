const readline = require('readline');
const { promisify } = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prepare readline.question for promisification
rl.question[promisify.custom] = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

exports.question = (text) => {
    return promisify(rl.question)(text);
};
