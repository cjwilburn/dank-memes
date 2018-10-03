const https = require("https");
const opn = require('opn');

let numberOfMemes = 5;

getList();

function createMemeList(body) {
  for (let i = 0; i < numberOfMemes; i++) {
    if (body.data.children[i].data.preview.images[0].source.url) {
      opn(body.data.children[i].data.preview.images[0].source.url);
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