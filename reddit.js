const https = require("https");
const open = require("open");
const get = require("lodash/get");
const isEmpty = require("lodash/isEmpty");

const createMemeList = (body, numberOfMemes = 5, filterNSFW = false) => {
  if (isEmpty(body.data.children)) {
   return false;
  }

  for (let i = 0; i < numberOfMemes; i++) {
    const sourceUrl = get(body, `data.children[${i}].data.preview.images[0].source.url`);
    const isOver18 = get(body, `data.children[${i}].data.over_18`);

    if (sourceUrl) {
      // Basically doesn't display the image only if the filter is turned on AND the post is nsfw
      if (filterNSFW == false && isOver18 == false) {
        let url = sourceUrl;
        url = url ? url.replace('&amp;', '&') : null;
        open(url);
      }
    }
  }
  console.log("Pulling up some dank reddit memes...");
  return true;
};

const getList = () => {
  https.get("https://www.reddit.com/r/dankmemes/new.json?sort=new", res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      createMemeList(body);
    });
  });

  return true;
}

getList();

module.exports = {
  getList,
  createMemeList
};
