var express = require('express');
var bodyParser = require('body-parser');
var scraper = require('./lib/scraper');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/static/usage.html');
});

app.post('/scrape', function (request, response) {
  var d = require('domain').create();
  d.on('error', function(err){
    response.send('Error Parsing JSON');
  });

  d.run(function() {
    scraper.scrape(request.body.args.url, function(title){
      console.log('title: ' + title);
      response.send(title);
    })
  });
});

app.use(express.static('static'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});
