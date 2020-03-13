const getSubtitles = require('youtube-captions-scraper').getSubtitles;
const http = require('http');
const url = require('url');

http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject, "queryObject");

  if(queryObject && queryObject.videoId && queryObject.lang) {
    getSubtitles({
      videoID: queryObject.videoId, 
      lang: queryObject.lang
    })
    .then(function(captions) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(captions));
    })
    .catch(function(e) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(e));
    })
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('videoId and lang are required in url');
  }
  
}).listen(8080);
