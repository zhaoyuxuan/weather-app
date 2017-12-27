var http = require('http');
var app = require('express')();


app.get('/', function(request, response){
    response.sendfile('index.html');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
