
(function () {

  'use strict';

	var requireHelper = require('./requireHelper');
  var apiv1 = requireHelper.require('tests/coverage/instrumented/routes/apiv1');
  var assert = require('chai').assert;
  var sinon = require('sinon');



  // create mock request and response
  var reqMock = {};

  var resMock = {};
  resMock.status = function() {
    return this;
  };
  resMock.send = function() {
    return this;
  };
  resMock.end = function() {
    return this;
  };
  sinon.spy(resMock, "status");
  sinon.spy(resMock, "send");


  describe('Get Weather', function() {
	// Test Case 1
    it('apiv1 test case 1. without city name', function() {
      reqMock = {
        query: {

        }
      };

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), '1 Unexpected status code: ' + resMock.status.lastCall.args);
    });
	// Test Case 2
    it('apiv1 test case 2. with valid city name and error from request call', function() {
      reqMock = {
        query: {
          name: "hamilton"
        }
      };

      var request = function( obj, callback ){
        callback("error", null, null);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), '1 Unexpected response: ' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.calledWith('Failed to get the data'), '2 Unexpected response: ' + resMock.send.lastCall.args);
    });
    
	// Test Case 3
    it('apiv1 test case 3. with incomplete city name', function() {
      reqMock = {
        query: {
          name: "hamil"
        }
      };

      var request = function( obj, callback ){
        callback(null, null, {});
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), '1 Unexpected response: ' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].msg === 'Failed', '2 Unexpected response: ' + resMock.send.lastCall.args);
    });

	// Test Case 4
    it('apiv1 test case 4. with valid city name', function() {
      reqMock = {
        query: {
          name: 'hamilton'
        }
      };

      var body = {
        cod: 200,
        name: 'hamilton',
        weather: [
          {
            main: 'cold'
          }
        ],
        main: {
          temp: 78
        }
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), '1 Unexpected response: ' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].name === 'hamilton', '2 Unexpected response: ' + resMock.send.lastCall.args[0].city);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 78 F', '3 Unexpected response: ' + resMock.send.lastCall.args[0].weather);
    });
  });

  /*
  describe('Get Weather 2', function() {

    it('with without zip code', function() {
      reqMock = {
        query: {

        }
      };

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
    });

    it('with valid zip code and error from request call', function() {
      reqMock = {
        query: {
          zip: 79968
        }
      };

      var request = function( obj, callback ){
        callback("error", null, null);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with incomplete zip code', function() {
      reqMock = {
        query: {
          zip: 79968
        }
      };

      var request = function( obj, callback ){
        callback(null, null, {});
      };

      apiv1.__set__("request", request);

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with valid zip code', function() {
      reqMock = {
        query: {
          zip: 79968
        }
      };

      var body = {
        cod: 200,
        name: 'El Paso',
        weather: [
          {
            main: 'cold'
          }
        ],
        main: {
          temp: 78
        }
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather2(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].city === 'El Paso', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 78 F', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
    });
  });
  */
}());
