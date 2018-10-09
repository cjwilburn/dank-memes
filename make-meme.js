const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const makeMeme = () => {
	fetch('https://api.imgflip.com/get_memes', {
		method: "GET"
	})
	.then(res => { return res.json(); })
	.then(res => {
		for(var i=0; i<10; i++) {
			console.log( (i + 1) + '. ' + res.data.memes[i].name );
		}
	})
};

makeMeme();
