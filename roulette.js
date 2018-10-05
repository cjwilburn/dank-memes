const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

memeRoulette = () => {
	rl.question('Insert caption:', (caption) => {
		if(caption.length) {
			generateRandomlyCaptionedMeme(caption);
		} else {
			console.log('farewell');
		}
		rl.close()
	});
}

generateRandomlyCaptionedMeme = (caption) => {

	fetch('https://api.imgflip.com/get_memes',{
        method: "GET"
    })
	.then(res => {return res.json()})
	.then(r => {
		return (r.data.memes[Math.floor(Math.random() * Math.floor(r.data.memes.length-1))].id)
	})
	.then(id => {
		fetch(
			'https://api.imgflip.com/caption_image?template_id=' + id
			+ '&text0=' + caption
			+ '&username=dankestofmemes2000'
			+ '&password=bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W',{
			method: "POST"
		})
		.then(res => {return res.json()})
		.then(r => {
			return r.data.url
		})
		.then(url => {opn(url)})
	})
}

memeRoulette();
