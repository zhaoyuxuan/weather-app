const https = require('https');
var weather = require('openweather-apis');
weather.setAPPID("27fe580edf919569d85245294e9ae834");
weather.setCity("London");



 weather.getAllWeather(function(err, JSONObj){
        console.log(JSONObj);
    });

 
// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
//   let data = '';
 
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });
 
//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });
 
// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });



