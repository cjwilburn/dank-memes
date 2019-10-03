const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const invokeGenerateRandomMeme = () => {
	generateRandomMeme();
	console.log('Fresh-baked meme, coming right up.');
};
const randomMeme = () => {
	if (process.argv[2] && process.argv[2] === '-y') {
		invokeGenerateRandomMeme();
	} else {
		rl.question('Generate random meme?(y/n)', (answer) => {
			if (answer === "y") {
				invokeGenerateRandomMeme();
			} else {
				console.log('goodbye');
			}
			rl.close();
		});
	}
};

const generateRandomMeme = () => {
	fetch('https://api.imgflip.com/get_memes', {
		method: "GET"
	})
		.then(res => res.json())
		.then(r => {
			return (r.data.memes[Math.floor(Math.random() * Math.floor(r.data.memes.length - 1))].url);
		})
		.then(url => {
			opn(url);
			process.exit();
		})
		.catch(console.error);
};

randomMeme();
