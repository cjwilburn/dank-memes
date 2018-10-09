const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const swansonMemes = [
	100512419,
	358280,
	46964400,
	122336292,
	43357204,
	44207560,
	64991891,
	117119699,
	49953384
];

const generateRandomRonSwansonMeme = () => {
	fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes', {
		method: "GET"
	})
	.then(res => { return res.json(); })
	.then(res => {
		console.log('Generating random Ron Swanson meme...');
		generateMeme(swansonMemes[Math.floor(Math.random()*swansonMemes.length)], res[0]);
	});
};

const generateMeme = (meme_id, caption1) => {
	fetch(
		'https://api.imgflip.com/caption_image?template_id=' + meme_id
		+ '&text0=' + caption1
		+ '&username=dankestofmemes2000'
		+ '&password=bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W', {
			method: "POST"
	})
	.then(res => { return res.json(); })
	.then(r => {
		return r.data.url;
	})
	.then(url => opn(url))
	.then(() => process.exit())
	.catch(console.error);
};

generateRandomRonSwansonMeme();
