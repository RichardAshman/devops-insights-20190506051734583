var markers = [];  
var nextMarker = 0;
var map;
        
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
		
		if(markers[index] != 'undefined' && markers[index] != null){
			markers[index].setMap(null);
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
	
	var url = 'https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&lat=' + loc.lat() + '&lon=' + loc.lng();
	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var jObj = JSON.parse(xmlHttp.responseText);
    		var z = "zip" + index;
    		var c = "zip" + index + "city";
    		var w = "zip" + index + "weather";
    		var weath = "Conditions are " + jObj.weather[0].main + " and temperature is " + jObj.main.temp + ' C';
    		document.getElementById(z).innerHTML(jObj.name);
    		document.getElementById(c).innerHTML(jObj.name);
    		document.getElementById(w).innerHTML(weath);
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