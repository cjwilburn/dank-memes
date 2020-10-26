const fetch = require("node-fetch");
const open = require("open");
const { username, password } = require("../config.json");
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
      text: "TEACHERS",
      x: 40,
      y: 110,
      width: 500,
      height: 103,
    },
    {
      text: "A Global Pandemic",
      x: 750,
      y: 250,
      width: 300,
      height: 200,
    },
    {
      text: "Is this a reason for more homework?",
      x: 30,
      y: 980,
      width: 1000,
      height: 70,
    },
  ];

  const textBoxData = boxes
    .map((box, boxIndex) =>
      Object.entries(box)
        .map((boxData) =>
          [
            `boxes[${boxIndex}][${boxData[0]}]`,
            encodeURIComponent(boxData[1]),
          ].join("=")
        )
        .join("&")
    )
    .join("&");

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
  getMeme,
};
