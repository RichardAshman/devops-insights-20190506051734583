var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

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
}



ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

        $http({
            method: "GET",
            url: '/api/v1/getWeather?name=' + data
        }).then( function(response) {
            if(which === 1) {
                $scope.zip1Weather = response.data.weather;
            } else if(which === 2) {
                $scope.zip2Weather = response.data.weather;
            } else if(which === 3) {
                $scope.zip3Weather = response.data.weather;
            } else if(which === 4) {
                $scope.zip4Weather = response.data.weather;
            } 
			setMarker(which, response.data.lat, response.data.lon, $scope.map1m);            
        });
    };
}]);