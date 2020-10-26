const fetch = require("node-fetch");
const open = require("open");
const { username, password } = require("../config.json");
const consoleReader = require("../utils/console-reader");

/**
 * Get input strings from console.
 *
 * @returns {object}
 */
const getInputStrings = async () => {
  let textOne = "TEACHERS";
  let textTwo = "A Global Pandemic";
  let textThree = "Is this a reason for more homework?";

  const response1 = await consoleReader.question("Text above guy's head: ");
  textOne = response1 !== "" ? response1 : textOne;

  const response2 = await consoleReader.question("Text below butterfly: ");
  textTwo = response2 !== "" ? response2 : textTwo;

  const response3 = await consoleReader.question("Bottom text: ");
  textThree = response3 !== "" ? response3 : textThree;

  return { textOne, textTwo, textThree };
};

/**
 * Generate meme from api repsonse.
 *
 * @param {Object} Text for meme
 * @param {Object.textOne} Guy text for meme
 * @param {Object.textTwo} Butterfly text for meme
 * @param {Object.textThree} Bottom text for meme
 */
const generateMeme = async ({ textOne, textTwo, textThree }) => {
  const boxes = [
    {
      text: textOne,
      x: 40,
      y: 110,
      width: 500,
      height: 103,
    },
    {
      text: textTwo,
      x: 750,
      y: 300,
      width: 300,
      height: 200,
    },
    {
      text: textThree,
      x: 30,
      y: 975,
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
  console.log(
    "Make your own 'Butterly Man' meme...(Press enter for defaults)\n"
  );
  const memeText = await getInputStrings();
  generateMeme(memeText);
};

module.exports = {
  getInputStrings,
  generateMeme,
  getMeme,
};
