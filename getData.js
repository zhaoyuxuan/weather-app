const https = require('http');
var weather = require('openweather-apis');
var url = "http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=27fe580edf919569d85245294e9ae834";

https.get(url, (res) => {
  let body ='';

  res.on('data', (d) => {
    body += d;
  });
  res.on('end',() =>{
  	body = JSON.parse(body);
  	console.log(body);
  });

}).on('error', (e) => {
  console.error(e);
});

// weather.setAPPID("27fe580edf919569d85245294e9ae834");
// weather.setCity("Edmonton");
//  weather.setLang('en');


//  weather.getWeatherForecastForDays(1, function(err, obj){
//         console.log(obj);
//     });

 



