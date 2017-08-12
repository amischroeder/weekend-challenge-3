var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 5000;
var tasks = require('./routes/tasks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/tasks', tasks);

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});