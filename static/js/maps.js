//var mapLoc = [{lat: -38.789, lng: 175.317},{},{},{},{}];
var markers = [{},{},{},{}];     
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: -38.789, lng: 175.317}, // nz
	zoom: 5
	});
}

function setMarker(which, lat, lng){
	markers[which].setMap(null);
	markers[which] = new google.maps.Marker({
  		position: [lat, lng],
  		map: map
	});
}