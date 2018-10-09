const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const chooseMemeBase = () => {
	fetch('https://api.imgflip.com/get_memes', {
		method: "GET"
	})
	.then(res => { return res.json(); })
	.then(res => {
		for(var i=0; i<20; i++) {
			console.log( (i + 1) + '. ' + res.data.memes[i].name );
		}
		return res;
	})
	.then(res => {
		rl.question('Choose a meme(1-20)', (answer) => {
			if ( isNaN(answer) || ! res.data.memes[answer-1] ) {
				console.log('Try again!');
			} else {
				captionMeme( res.data.memes[answer-1] );
			}
			rl.close();
		});
	});
};

const captionMeme = (answer) => {
	console.log(JSON.stringify(answer));
};

chooseMemeBase();
