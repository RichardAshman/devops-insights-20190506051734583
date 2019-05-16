var markers = [];  
var nextMarker = 0;
var map;
var zipScope;
        
function setMarker(which, loc) {
	if(nextMarker == 'undefined' || nextMarker == null){
    	nextMarker = 0;
    	markers = [];
    }
	var index = which-1;
	if (index < 0) {
		index = nextMarker;
		nextMarker++;
		if (nextMarker > 3) {
			nextMarker = 0;
		}
	} else {
		var temp = index + 1;
		if (temp > 3) {
			temp = 0;
		}
		nextMarker = temp;
	}
		if(markers[index] != 'undefined' && markers[index] != null){
			markers[index].setMap(null);
    	}
	
	markers[index] = new google.maps.Marker({
		position: loc,
		map: map
	});
	
	var url = 'https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&lat=' + loc.lat() + '&lon=' + loc.lng();
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var jObj = JSON.parse(xmlHttp.responseText);
    		var z = "zip" + (index+1);
    		var c = "zip" + (index+1) + "city";
    		var w = "zip" + (index+1) + "weather";
    		var weath = "Conditions are " + jObj.weather[0].main + " and temperature is " + jObj.main.temp + ' C';

    		if(index === 1) {
                zipScope.zip1City = jObj.name;
                zipScope.zip1Weather = weath;
            } else if(index === 2) {
                zipScope.zip2City = jObj.name;
                zipScope.zip2Weather = weath;
            } else if(index === 3) {
                zipScope.zip3City = jObj.name;
                zipScope.zip3Weather = weath;
            } else if(index === 4) {
                zipScope.zip4City = jObj.name;
                zipScope.zip4Weather = weath;
            } 
		}
    };
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -38.789, lng: 175.317}, // nz
		zoom: 5
	});
	map.addListener('click', function(event) {
		setMarker(-1, event.latLng);
	});
}