const readline = require("readline");
const fetch = require("node-fetch");
const opn = require("opn");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const chooseMemeBase = () => {
  fetch("https://api.imgflip.com/get_memes", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      for (var i = 0; i < 20; i++) {
        //eslint-disable-next-line
        console.log(i + 1 + ". " + res.data.memes[i].name);
      }
      return res;
    })
    .then(res => {
      rl.question("Choose a meme(1-20):", answer => {
        if (isNaN(answer) || !res.data.memes[answer - 1]) {
          //eslint-disable-next-line
          console.log("Try again!");
        } else {
          captionMeme(res.data.memes[answer - 1]);
        }
      });
    });
};

const captionMeme = meme => {
  rl.question("Please provide a caption (1 of 2):", caption1 => {
    if (caption1.length) {
      rl.question(
        "Please provide a caption (2 of 2, optional):",
        (caption2 = "") => {
          generateMeme(meme, caption1, caption2);
          rl.close();
          //eslint-disable-next-line
          console.log("Creating your content...");
        }
      );
    } else {
      rl.close();
    }
  });
};

const generateMeme = (meme, caption1, caption2) => {
  fetch(
    `https://api.imgflip.com/caption_image?template_id=${
      meme.id
    }&text0=${caption1}&text1=${caption2}&username=dankestofmemes2000&password=bR[DVqvjPGd87rAUVR8XvBzkNK@viC8W`,
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
};

chooseMemeBase();
