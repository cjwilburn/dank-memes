const fetch = require("node-fetch");
const open = require("open");
const consoleReader = require("./utils/console-reader");

/**
 * Get input strings from console.
 * @returns {object}
 */
const getInputStrings = async () => {
  let topText = "Me explaining something";
  let bottomText = "My mom";

  const response1 = await consoleReader.question("What are we explaining? ");
  topText = response1 !== "" ? response1 : topText;

  const response2 = await consoleReader.question(
    "Who are we explaining it to? "
  );
  bottomText = response2 !== "" ? response2 : bottomText;

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
  const apiUrl = "https://api.imgflip.com/caption_image?template_id=188911494";
  const memeUrl = `${apiUrl}&text0=${encodeURI(topText)}&text1=${encodeURI(
    bottomText
  )}&username=${process.env.IMGFLIP_USER}&password=${
    process.env.IMGFLIP_PASSWORD
  }`;

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
const runExplainMeme = async () => {
  console.log("Make your own 'Me explaining to my mom' meme...\n");
  const memeText = await getInputStrings();
  generateMeme(memeText);
};

runExplainMeme();

module.exports = {
  getInputStrings,
  generateMeme
};
