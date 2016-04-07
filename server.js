var express = require('express');
var app = express();

var mongoose = require('mongoose');		
var database = require('./config/database');

var morgan = require('morgan');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8081;


mongoose.connect(database.localUrl);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json());


require('./app/routes.js')(app);

app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

app.listen(port);
console.log("App listening on port " + port);