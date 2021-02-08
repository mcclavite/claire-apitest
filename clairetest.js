var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var localhost = 'http://localhost:51544';
var helper = require('./helper.js');
var payload = {};

describe('Lalamove API Tests', function() {
  describe('POST', function() {
      it('should get 201 OK after POST immediate order', async function() {
        payload.stops = helper.generateRandomPoints();
        console.log(payload);
        var req = {
            method: 'post',
            body: payload,
            json: true,
            url: localhost + '/v1/orders'
          }
          await request(req, function (err, res, body) {
            if (err) {
              console.error('error: ', err)
              throw err
            }
            var statusCode = res.statusCode
            console.log('response body: ', body)
            expect(statusCode).to.equal(201);
            // done();
          })
      });
      it('should get 201 OK after POST scheduled order', async function() {
        payload.stops = helper.generateRandomPoints();
        payload.orderAt = helper.getRandTimewithin30Days();;
        var req = {
            method: 'post',
            body: payload,
            json: true,
            url: localhost + '/v1/orders'
          }
          await request(req, function (err, res, body) {
            if (err) {
              console.error('error: ', err)
              throw err
            }
            var statusCode = res.statusCode
            console.log('response body: ', body)
            expect(statusCode).to.equal(201);
          })
      });
  });
    describe('GET', function() {
    it('should get 200 OK after fetching existing order id', async function() {
    var req = {
        method: 'get',
        body: '',
        json: true,
        url: localhost + '/v1/orders/1'
      }
      await request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(200);
        // done();
      })
    });
    it('should get 400 after fetching non existing order id', async function() {
        var req = {
            method: 'get',
            body: '',
            json: true,
            url: localhost + '/v1/orders/35'
        }
        await request(req, function (err, res, body) {
            if (err) {
              console.error('error: ', err)
              throw err
            }
            var statusCode = res.statusCode
            console.log('response body: ', body)
            expect(statusCode).to.equal(404);
            // done();
        })
    });
  });
  describe('PUT - Take Orders', function() {
    it('should return 200 after driver takes the order', async function() {
      var req = {
        method: 'put',
        body: '',
        json: true,
        url: localhost + '/v1/orders/1/take'
      }
      await request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(200);
        // done();
      })
    });
    it('should return 404 after driver takes non existing order id', async function() {
      var req = {
        method: 'put',
        body: '',
        json: true,
        url: localhost + '/v1/orders/99/take'
      }
      await request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(404);
      })
    });
    it('should return 422 after driver takes the order again', async function() {
      var req = {
        method: 'put',
        body: '',
        json: true,
        url: localhost + '/v1/orders/1/take'
      }
      await request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(422);
      })
    });
  });
  describe.skip('PUT - Complete Orders', function(){
    it('should get 200 after driver completes an existing order', async function() {

    });
    it('should get 404 after driver completes non existing order', async function() {

    });
    it('should get 422 after driver completes an order again', async function() {

    });
  });
  describe.skip('PUT - Cancel Orders', function(){
    it('should get 200 after cancelling an existing order', async function() {

    });
    it('should get 404 after cancelling non existing order', async function() {

    });
    it('should get 422 after cancelling an order again', async function() {
      
    });
  });
});