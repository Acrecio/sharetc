var express = require('express');
var app = express();

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
