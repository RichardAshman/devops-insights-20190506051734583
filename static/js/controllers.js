var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);
ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

	zipScope = $scope;
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
                $scope.zip1City = response.data.name;
                $scope.zip1Weather = response.data.weather;
            } else if(which === 2) {
                $scope.zip2City = response.data.name;
                $scope.zip2Weather = response.data.weather;
            } else if(which === 3) {
                $scope.zip3City = response.data.name;
                $scope.zip3Weather = response.data.weather;
            } else if(which === 4) {
                $scope.zip4City = response.data.name;
                $scope.zip4Weather = response.data.weather;
            } 
			setMarker(which, {lat:response.data.lat, lng:response.data.lon});            
        });
    };
}]);