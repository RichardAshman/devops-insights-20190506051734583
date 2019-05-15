
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";

// allowed open weather calls
// http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&q=hamilton,nz
// https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=6b7b471967dd0851d0010cdecf28f829&units=metric

exports.getWeather = function(req, res) {
	var name = req.query.name;
	var lat = req.query.lat;
	var lon = req.query.lon;
	if( (name === null || typeof(name) === 'undefined')
		&& (lat === null || typeof(lat) === 'undefined')
		&& (lon === null || typeof(lon) === 'undefined')) {
		return res.status(400).send('City Name missing');
	}
	var aurl;
	if( (name === null) || (typeof(name) === 'undefined')){
		aurl = OPENWEATHERURL + '&q=' + name + ',nz';
	} else {
		aurl = OPENWEATHERURL + '&lat=' + lat + '&lon=' + lon;
	}

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {name: body.name, weather: weath, lat: body.coord.lat, lon: body.coord.lon};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);

exports.router = router;
