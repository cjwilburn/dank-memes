import fetch from 'node-fetch';
import * as readline from 'readline';
import * as opn from 'opn';

// to run this typescript file, run 'npm start' or 'ts-node index.ts'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const randomMeme = () => {
	rl.question('Generate random meme?(y/n)', (answer) => {
		if (answer === 'y') {
			generateRandomMeme();
			console.log('Fresh-baked meme, coming right up.');
		} else {
			console.log('goodbye');
		}
		rl.close();
	});
};

const generateRandomMeme = async (): Promise<void> => {
	try {
		const res = await fetch('https://api.imgflip.com/get_memes', { method: "GET" });
		const json = await res.json();
		const randomUrl = json.data.memes[Math.floor(Math.random() * Math.floor(json.data.memes.length - 1))].url;
		opn(randomUrl);
	}
	catch (error) {
		console.error(error);
	}
};

randomMeme();
