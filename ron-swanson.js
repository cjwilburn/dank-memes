const fetch = require('node-fetch');
const open = require('open');
const config = require('./config.json');

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
		+ `&username=${config.username}`
		+ `&password=${config.password}`, {
			method: "POST"
	})
	.then(res => { return res.json(); })
	.then(r => {
		return r.data.url;
	})
	.then(url => {
		console.log(`\n${url}`);
		open(url);
		process.exit();
	})
	.catch(() => {
		console.log('\nCould not generate meme. Please check if your Imgflip credentials are correct.');
	});
};

generateRandomRonSwansonMeme();
