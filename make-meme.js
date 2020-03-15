const readline = require('readline');
const fetch = require('node-fetch');
const open = require('open');
const config = require('./config.json');

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
		rl.question('Choose a meme(1-20):', (answer) => {
			if ( isNaN(answer) || ! res.data.memes[answer-1] ) {
				console.log('Try again!');
			} else {
				captionMeme( res.data.memes[answer-1] );
			}
		});
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
			console.log('goodbye!');
		}
	});
};

const generateMeme = (meme, caption1, caption2) => {
	fetch(
		'https://api.imgflip.com/caption_image?template_id=' + meme.id
		+ '&text0=' + caption1
		+ '&text1=' + caption2
		+ `&username=${config.username}`
		+ `&password=${config.password}`, {
			method: "POST"
	})
	.then(res => { return res.json(); })
	.then(r => {
		return r.data.url;
	})
	.then(url => {
		open(url);
		process.exit();
	})
	.catch(console.error);
};


chooseMemeBase();
