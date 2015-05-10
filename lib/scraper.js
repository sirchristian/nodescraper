var request = require("request");
var cheerio = require("cheerio");

var title = '';

exports.scrape=function(url, action) {
  console.log('Scraping: ' + url);
  request({
    uri: url,
  }, 
  function(error, response, body) {
    var $ = cheerio.load(body);
    title = $("title").text();
    action(title);
  });
}

