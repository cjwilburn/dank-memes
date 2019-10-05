const fetch = require('node-fetch');
const open = require('open');
const consoleReader = require('../utils/console-reader');

const pimpMyMeme = async () => {
	console.log('\nXzibit needs some details...\n');

	const captions = await requestCaptions();
	generateMeme(captions);
};

const requestCaptions = async () => {
	// Set some defaults.
	const captions = {
		one: 'cars',
		two: ['car', 'car'],
		three: ['drive', 'drive']
	};

	const caption1 = await consoleReader.question('Yo dawg, we heard you like _____ : ');
	if (caption1 !== '') {
		captions.one = caption1;
	}

	const caption2 = await consoleReader.question('So we put a ____ in your ____ : (e.g. - first, second) ');
	if (caption2 !== '') {
		captions.two = caption2.split(',');
	}

	const caption3 = await consoleReader.question('so you can ____ while you ____ : (e.g. - first, second) ');
	if (caption3 !== '') {
		captions.three = caption3.split(',');
	}

	return captions;
};

const generateMeme = ({ one, two, three }) => {

	let topText = `Yo dawg, we heard you like ${one}`;
	let bottomText = `So we put a ${two[0]} in your ${two[1]} so you can ${three[0]} while you ${three[1]}`

	let url = 'https://api.imgflip.com/caption_image?template_id=101716'
		+ '&text0=' + encodeURI(topText)
		+ '&text1=' + encodeURI(bottomText)
		+ '&username=dankestofmemes2000'
		+ '&password=bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W';

	fetch(url, {
		method: "POST"
	})
		.then(res => {
			return res.json();
		})
		.then(r => {
			return r.data.url;
		})
		.then(url => {
			open(url);
			process.exit();
		})
		.catch(console.error);
};

module.exports = {
	pimpMyMeme,
	requestCaptions,
	generateMeme,
};
