const https = require("https");
const opn = require('opn');

let numberOfMemes = 5;
let filterNSFW = false;

getList();

function createMemeList(body) {
  for (let i = 0; i < numberOfMemes; i++) {
    if (body.data.children[i].data.preview.images[0].source.url) {
		// Basically doesn't display the image only if the filter is turned on AND the post is nsfw
		if (filterNSFW == false && body.data.children[i].data.over_18 == false) {
			opn(body.data.children[i].data.preview.images[0].source.url);
		}
    }
  }
}

function getList() {
  https.get('https://www.reddit.com/r/dankmemes/new.json?sort=new', res => {
    res.setEncoding("utf8")
    let body = ""
    res.on("data", data => {
      body += data
    })
    res.on("end", () => {
      body = JSON.parse(body);
      createMemeList(body);
    });
  });
}