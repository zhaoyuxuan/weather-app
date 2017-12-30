const https = require('http');
var weather = require('openweather-apis');
var url = "http://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=27fe580edf919569d85245294e9ae834";

function getWeatherData(url, callback){
https.get(url, (res) => {
  let body ='';
  let resultForm =[];

  res.on('data', (d) => {
    body += d;
  });
  res.on('end',() =>{
  	body = JSON.parse(body).list;
  	var date1 = Date.parse(body[0].dt_txt.split(" ")[0]);
  	for (index in body){
  		if(date1 != Date.parse(body[index].dt_txt.split(" ")[0]) ){
  			date1 = Date.parse(body[index].dt_txt.split(" ")[0])
  			resultForm.push(body[index])
  		}
  	}
  	return callback(resultForm);
  	
  });

}).on('error', (e) => {
  console.error(e);
  return false;
});
}

var resultData = getWeatherData(url, function(response){
	console.log(response);
});



// weather.setAPPID("27fe580edf919569d85245294e9ae834");
// weather.setCity("Edmonton");
//  weather.setLang('en');


//  weather.getWeatherForecastForDays(1, function(err, obj){
//         console.log(obj);
//     });

 



