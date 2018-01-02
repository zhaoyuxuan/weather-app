var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var getData = require('./getData');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(upload.array());

var citydata;




app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendfile('index.html');
});

app.post('/weatherdata', function(request, response) {
    var cityId = request.body.userInput;
    console.log(cityId);
    url = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&APPID=27fe580edf919569d85245294e9ae834&cnt=5";

    getData.getWeatherData(url, function(res) {
        response.send(res);
        console.log(res);
    });
});





app.post('/citydata', function(req, res) {
    var output = [];

    fs.readFile('citydata.json', 'utf8', function(err, data) {
        if (err) throw err;
        citydata = JSON.parse(data);
    });

    res.send(citydata);

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))