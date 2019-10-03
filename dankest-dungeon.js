const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const darkestDungeonFeedUrl = 'https://www.reddit.com/r/darkestdungeon/hot.json?limit=150';
var darkestDungeonMemes = [];
var memeCounter = 0;
var afterSlug = '';

const dankestDungeonMemes = (after = null) => {
	var fetchUrl = darkestDungeonFeedUrl;
	var message = 'Descending into dankness...';
	if ( after ) {
		fetchUrl += '&after=' + after;
		message = 'Descending deeper into dankness...';
	}
	console.log('');
	console.log(message);
	fetch(fetchUrl, {
		method: "GET"
	})
	.then(res => { return res.json(); })
	.then(res => {
		// Collect only the memes.
		for(var i=0; i<res.data.children.length; i++) {
			if ('meme' === res.data.children[i].data.link_flair_css_class) {
				darkestDungeonMemes.push(res.data.children[i].data);
			}
		}
		afterSlug = res.data.after;
	})
	.then(() => {
		if ( ! after ) {
			console.log('Today\'s dankest dungeon memes:');
		}
		for(i = memeCounter; i<darkestDungeonMemes.length; i++) {
			console.log((i+1) + '. ' + darkestDungeonMemes[i].title);
		}
		console.log('Deeper!')
		rl.question('Choose a meme! (1-' + i + ') or delve "deeper": ', (selection) => {
			if ( selection.toLowerCase().includes('deeper') ) {
				memeCounter = i;
				dankestDungeonMemes(afterSlug);
			} else if ( isNaN(selection) || ! darkestDungeonMemes[selection-1] ) {
				console.log('Send this one to journey elsewhere, for we have need of sterner stock.');
				rl.close();
				process.exit();
				return;
			} else {
				opn(darkestDungeonMemes[selection-1].url);
				rl.close();
				process.exit();
			}
			
		});
	});
};

dankestDungeonMemes();

module.exports = { darkestDungeonMemes };

