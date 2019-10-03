const readline = require('readline');
const fetch = require('node-fetch');
const open = require('open');

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
       
                generateMeme(captions);
                rl.close();
            });
        });
    });
}

const generateMeme = ({ one, two, three }) => {

    let topText = `Yo dawg, we heard you like ${one}`;
    let bottomText = `So we put a ${two[0]} in your ${two[1]} so you can ${three[0]} while you ${three[1]}`

    let url = 'https://api.imgflip.com/caption_image?template_id=101716'
    + '&text0=' + encodeURI(topText)
    + '&text1=' + encodeURI(bottomText)
    + '&username=dankestofmemes2000'
    + '&password=bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W';
    
	fetch( url, {
        method: "POST"
	})
	.then(res => { 
        return res.json(); })
	.then(r => {
		return r.data.url;
	})
	.then(url => {
        open(url);
        process.exit();
    })
    .catch(console.error);  
};

pimpMyMeme();