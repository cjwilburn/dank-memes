const fetch = require("node-fetch");
const open = require("open");
const { username, password } = require('../config.json');
const consoleReader = require("../utils/console-reader");

/**
 * Get input strings from console.
 * @returns {object}
 */
const getInputStrings = async () => {
  let topText = "Something in my daughter's hand";
  let bottomText = "Is this food?";

  // const response1 = await consoleReader.question("What are we explaining? ");
  // topText = response1 !== "" ? response1 : topText;

  // const response2 = await consoleReader.question(
  //   "Who are we explaining it to? "
  // );
  // bottomText = response2 !== "" ? response2 : bottomText;

  return { topText, bottomText };
};

/**
 * Generate meme from api repsonse.
 *
 * @param {Object} Text for meme
 * @param {Object.topText} topText for meme
 * @param {Object.bottomText} bottomText for meme
 */
const generateMeme = async ({ topText, bottomText }) => {
  const boxes = [
    {
        "text": "Can we make it say anything",
        "x": 10,
        "y": 10,
        "width": 548,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    },
    {
        "text": "We sure can",
        "x": 200,
        "y": 0,
        "width": 100,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    },
    {
      "text": "What is this?",
      "x": 0,
      "y": 200,
      "width": 200,
      "height": 100,
      "color": "#ffffff",
      "outline_color": "#000000"
  }
  ];

const textBoxData = boxes.map((box, boxIndex) =>
  Object.entries(box).map(
    boxData => [`boxes[${boxIndex}][${boxData[0]}]`, encodeURIComponent(boxData[1])].join('=')
  ).join('&')
).join('&');

  const creds = new URLSearchParams({
    template_id: 137635600,
    username,
    password,
  });

  const memeUrl = `https://api.imgflip.com/caption_image?${creds}&${textBoxData}`;

  try {
    const response = await fetch(memeUrl, { method: "POST" });
    const json = await response.json();
    console.log(json);
    if (json.data.url) open(json.data.url);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

/**
 * Build the meme.
 */
const getMeme = async () => {
  console.log("Make your own 'Me explaining to my mom' meme...\n");
  const memeText = await getInputStrings();
  generateMeme(memeText);
};

module.exports = {
  getInputStrings,
  generateMeme,
  getMeme
};
