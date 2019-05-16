
var REQUEST = require('request');
var request = REQUEST.defaults( {
    strictSSL: false
});

var markers = [];  
var nextMarker = 0;
var map;

function setMarker(which, loc) {
	var index = which-1;
	if (index < 0) {
		index = nextMarker;
		nextMarker++;
		if (nextMarker > 3) {
			nextMarker = 0;
		}
		if(markers[index] !== 'undefined' && markers[index] !== null){
			markers[index].setMap(null);
			markers[index] = null;
		}
	} else {
		var temp = index + 1;
		if (temp > 3) {
			temp = 0;
		}
		nextMarker = temp;
	}
	
	markers[index] = new google.maps.Marker({
		position: loc,
		map: map
	});
	
	var url = 'https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&lat=' + loc.lat + '&lon=' + loc.lon;
	request({
		method: 'GET',
        url: url,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the name from xy');
    	} else {
    		if(body.cod === 200) {
    			var w = "zip" + (index+1);
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			document.getElementById(w).innerHTML(body.name);
    			document.getElementById(w + "weather").innerHTML(weath);
    			var response = {name: body.name};
    			return res.status(200).send(response);
    		}
            return res.status(400).send({msg:'Failed to get name from xy. 400 error'});
    	}
    });

}
