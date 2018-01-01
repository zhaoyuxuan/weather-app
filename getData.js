const https = require('http');
var weather = require('openweather-apis');

module.exports = {
  getWeatherData: function getWeatherData(url, callback) {
    https.get(url, (res) => {
        let body = '';
        let resultForm = [];

        res.on('data', (d) => {
            body += d;
        });
        res.on('end', () => {
            body = JSON.parse(body).list;
            console.log(body);
           
            return callback(body);
        });
    }).on('error', (e) => {
        console.error(e);
        return false;
    });
}
};

