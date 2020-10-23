const fetch = require("node-fetch");
const open = require("open");
const querystring = require("querystring");
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
  const apiUrl = "https://api.imgflip.com/caption_image?";
  // const memeUrl = `${apiUrl}&text0=${encodeURI(topText)}&text1=${encodeURI(bottomText)}&text2=${encodeURI('real life')}&username=${username}&password=${password}`;
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
        "x": 10,
        "y": 225,
        "width": 548,
        "height": 100,
        "color": "#ffffff",
        "outline_color": "#000000"
    }
  ];

  const textBoxData = boxes.map(({text}, index) => `boxes[${index}][text]=${encodeURI(text)}`).join('&');
  console.log(textBoxData);

  const memeUrl = apiUrl + new URLSearchParams({
    template_id: 137635600,
    username,
    password,
  }) + '&' + textBoxData;

  console.log(memeUrl);

  try {
    const response = await fetch(memeUrl, {
      method: "POST",
    });
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
