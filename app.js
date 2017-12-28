var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(upload.array()); 

var citydata;




app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    response.sendfile('index.html');
});

app.post('/citydata',function(req, res){
	var output = [];

	fs.readFile('citydata.json', 'utf8', function (err, data) {
  		if (err) throw err;
  		citydata = JSON.parse(data);
	});

	// var userinput = req.body.userInput;
	for (each in citydata){
  		output.push(citydata[each]);
 	}

  res.send(output); //replace with your data here
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
