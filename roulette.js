const readline = require("readline");
const fetch = require("node-fetch");
const opn = require("opn");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const memeRoulette = () => {
  rl.question("Please provide a caption (1 of 2):", caption1 => {
    if (caption1.length) {
      rl.question(
        "Please provide a caption (2 of 2, optional):",
        (caption2 = "") => {
          generateRandomlyCaptionedMeme(caption1, caption2);
          rl.close();
          //eslint-disable-next-line
          console.log("Spinning the wheel of memes...");
        }
      );
    } else {
      rl.close();
      goodbye();
    }
  });
};

const generateRandomlyCaptionedMeme = (caption1, caption2) => {
  fetch("https://api.imgflip.com/get_memes", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(r => {
      return r.data.memes[
        Math.floor(Math.random() * Math.floor(r.data.memes.length - 1))
      ].id;
    })
    .then(id => {
      fetch(
        `https://api.imgflip.com/caption_image?template_id=${id}&text0=${caption1}&text1=${caption2}&username=dankestofmemes2000&password=bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W`,
        {
          method: "POST"
        }
      )
        .then(res => {
          return res.json();
        })
        .then(r => {
          return r.data.url;
        })
        .then(url => opn(url))
        .then(() => process.exit())
        //eslint-disable-next-line
        .catch(console.error);
    });
};

const goodbye = () => {
  //eslint-disable-next-line
  console.log("Ya done messed up!");
};

memeRoulette();
