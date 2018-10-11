const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const darkestDungeonFeedUrl = 'https://www.reddit.com/r/darkestdungeon/hot.json?limit=100';
var darkestDungeonMemes = [];
const maxMemes = 20;

const dankestDungeonMemes = () => {
	console.log('Descending into dankness...');
	fetch(darkestDungeonFeedUrl, {
		method: "GET"
	})
	.then(res => { return res.json(); })
	.then(res => {
		// Collect only the memes.
		for(var i=0; i<res.data.children.length && darkestDungeonMemes.length<=maxMemes; i++) {
			if ('meme' === res.data.children[i].data.link_flair_css_class) {
				darkestDungeonMemes.push(res.data.children[i].data);
			}
		}
	})
	.then(() => {
		console.log('Today\'s dankest dungeon memes:');
		for(var i=0; i<darkestDungeonMemes.length; i++) {
			console.log((i+1) + '. ' + darkestDungeonMemes[i].title);
		}
		rl.question('Choose a meme! (1-' + i + '):', (selection) => {
			if ( isNaN(selection) || ! darkestDungeonMemes[selection-1] ) {
				console.log('Send this one to journey elsewhere, for we have need of sterner stock.');
				rl.close();
				process.exit();
				return;
			}
			opn(darkestDungeonMemes[selection-1].url);
			rl.close();
			process.exit();
		});
	});
};

dankestDungeonMemes();
