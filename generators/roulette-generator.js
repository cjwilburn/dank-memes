const readline = require('readline');
const fetch = require('node-fetch');
const open = require('open');
const config = require('../config.json');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const getMeme = () => {
	rl.question('Please provide a caption (1 of 2):', (caption1) => {
		if (caption1.length) {
			rl.question('Please provide a caption (2 of 2, optional):', (caption2 = '') => {
				generateRandomlyCaptionedMeme(caption1, caption2);
				rl.close();
				console.log('Spinning the wheel of memes...');
			});
		} else {
			rl.close();
			goodbye();
		}
	});
};

const generateRandomlyCaptionedMeme = (caption1, caption2) => {

	fetch('https://api.imgflip.com/get_memes', {
		method: "GET"
	})
		.then(res => { return res.json(); })
		.then(r => {
			return (r.data.memes[Math.floor(Math.random() * Math.floor(r.data.memes.length - 1))].id);
		})
		.then(id => {
			fetch(
				'https://api.imgflip.com/caption_image?template_id=' + id
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
		});
};

const goodbye = () => {
	console.log('Ya done messed up!');
};

module.exports = {
  getMeme
};