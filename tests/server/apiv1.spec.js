
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
        coord: {
			lon:175.28,
			lat:-37.79
		}
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), '1 Unexpected response: ' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].name === 'hamilton', '2 Unexpected response: ' + resMock.send.lastCall.args[0].name);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 78 C', '3 Unexpected response: ' + resMock.send.lastCall.args[0].weather);
    });
  });
}());
