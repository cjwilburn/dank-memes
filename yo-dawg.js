const readline = require('readline');
const fetch = require('node-fetch');
const opn = require('opn');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const pimpMyMeme = () => {
    console.log('\nXzibit needs some details...\n');

    // Set some defaults.
    let captions = {
        one: 'cars',
        two: ['car','car'],
        three: ['drive','drive']
    };

    rl.question('Yo dawg, we heard you like _____ : ', caption1 => {
        if(caption1 !== '') {
            captions.one = caption1;
        }

        rl.question('So we put a ____ in your ____ : (e.g. - first, second) ', caption2 => {
            if(caption2 !== '') {
                captions.two = caption2.split(',');
            }

            rl.question('so you can ____ while you ____ : (e.g. - first, second) ', caption3 => {
                if(caption3 !== '') {
                    captions.three = caption3.split(',');
                }

                rl.close();
            });
        });
    });
}

pimpMyMeme();