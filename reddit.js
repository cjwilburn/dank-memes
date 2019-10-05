const https = require('https');
const opn = require('opn');

const createMemeList = (body, numberOfMemes = 5, filterNSFW = false) => {
  // @TODO: Deep check that all the required properties exist.
  if (typeof body === 'undefined') {
    return false;
  }

  // @TODO: while loop for number or limit whichever comes first.
  for (let i = 0; i < numberOfMemes; i++) {
    if (body.data.children[i].data.preview.images[0].source.url) {
      // Basically doesn't display the image only if the filter is turned on AND the post is nsfw
      if (filterNSFW == false && body.data.children[i].data.over_18 == false) {
        let url = body.data.children[i].data.preview.images[0].source.url;
        url = url ? url.replace('&amp;', '&') : null;
        opn(url);
      }
    }
  }
  console.log('Pulling up some dank reddit memes...');
  return true;
};

const getList = () => {
  https.get('https://www.reddit.com/r/dankmemes/new.json?sort=new', (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (data) => {
      body += data;
    });
    res.on('end', () => {
      body = JSON.parse(body);
      createMemeList(body);
    });
  });

  return true;
};

getList();

module.exports = {
  getList,
  createMemeList
};
