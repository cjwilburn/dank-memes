const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const chooseMemeBase = async () => {
	const res = await fetch('https://api.imgflip.com/get_memes', { method: "GET" });
	const json = await res.json();
	for (let i = 0; i < 20; i++) {
		console.log(`${i + 1}. ${json.data.memes[i].name}`);
	}
	rl.question('Choose a meme(1-20):', (answer) => {
		if ( isNaN(answer) || ! json.data.memes[answer-1] ) {
			console.log('Try again!');
		} else {
			captionMeme( json.data.memes[answer-1] );
		}
	});
};

const captionMeme = (meme) => {
	rl.question('Please provide a caption (1 of 2):', (caption1) => {
		if (caption1.length) {
			rl.question('Please provide a caption (2 of 2, optional):', (caption2 = '') => {
				generateMeme(meme, caption1, caption2);
				rl.close();
				console.log('Creating your content...');
			});
		} else {
			rl.close();
			console.log('Goodbye!');
		}
	});
};

const generateMeme = async (meme, caption1, caption2) => {
	try {
		const username = 'dankestofmemes2000';
		const password = 'bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W';
		const res = await fetch(`https://api.imgflip.com/caption_image?template_id=${meme.id}&text0=${caption1}&text1=${caption2}&username=${username}&password=${password}`);
		const json = await res.json();
		if (json.error_message) {
			throw new Error(json.error_message);
		}
		opn(json.data.url);
	} catch (error) {
		console.error(error);
	}
};

chooseMemeBase();
