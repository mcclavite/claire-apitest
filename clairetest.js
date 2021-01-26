var request = require('request');
var chai = require('chai');
var expect = chai.expect;
var localhost = 'http://localhost:51544';
var payload = { "stops": [
    {
        "lat": 22.344674, "lng": 114.124651
    },
    {
        "lat": 22.375384, "lng": 114.182446
    },
    {
        "lat": 22.385669, "lng": 114.186962
    }
]};


describe('Lalamove API Tests', function() {
  describe.skip('POST', function() {
      it('should get 201 OK after POST immediate order', function(done) {
        var req = {
            method: 'post',
            body: payload,
            json: true,
            url: localhost + '/v1/orders'
          }
          request(req, function (err, res, body) {
            if (err) {
              console.error('error: ', err)
              throw err
            }
            var statusCode = res.statusCode
            console.log('response body: ', body)
            expect(statusCode).to.equal(201);
            done();
          })
      });
      it('should get 201 OK afte POST scheduled order', function(done) {
        
        payload.orderAt = "2021-01-26T13:00:00.000Z";
        var req = {
            method: 'post',
            body: payload,
            json: true,
            url: localhost + '/v1/orders'
          }
          request(req, function (err, res, body) {
            if (err) {
              console.error('error: ', err)
              throw err
            }
            var statusCode = res.statusCode
            console.log('response body: ', body)
            expect(statusCode).to.equal(201);
            done();
          })
      });
  });
    describe.skip('GET', function() {
    it('should get 200 OK after fetching existing order id', function(done) {
    var req = {
        method: 'get',
        body: '',
        json: true,
        url: localhost + '/v1/orders/1'
      }
      request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(200);
        done();
      })
    });
    it('should get 400 after fetching non existing order id', function(done) {
        var req = {
            method: 'get',
            body: '',
            json: true,
            url: localhost + '/v1/orders/35'
        }
        request(req, function (err, res, body) {
            if (err) {
              console.error('error: ', err)
              throw err
            }
            var statusCode = res.statusCode
            console.log('response body: ', body)
            expect(statusCode).to.equal(404);
            done();
        })
    });
  });
  describe('PUT - Take Orders', function() {
    it.skip('should return 200 after driver takes the order', function(done) {
      var req = {
        method: 'put',
        body: '',
        json: true,
        url: localhost + '/v1/orders/1/take'
      }
      request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(200);
        done();
      })
    });
    it('should return 404 after driver takes non existing order id', function(done) {
      var req = {
        method: 'put',
        body: '',
        json: true,
        url: localhost + '/v1/orders/99/take'
      }
      request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(404);
        done();
      })
    });
    it('should return 422 after driver takes the order again', function(done) {
      var req = {
        method: 'put',
        body: '',
        json: true,
        url: localhost + '/v1/orders/1/take'
      }
      request(req, function (err, res, body) {
        if (err) {
          console.error('error: ', err)
          throw err
        }
        var statusCode = res.statusCode
        console.log('response body: ', body)
        expect(statusCode).to.equal(422);
        done();
      })
    });
  });
  describe('PUT - Complete Orders', function(){
    it('should get 200 after driver completes an existing order', function(done) {

    });
    it('should get 404 after driver completes non existing order', function(done) {

    });
    it('should get 422 after driver completes an order again', function(done) {

    });
  });
  describe('PUT - Cancel Orders', function(){
    it('should get 200 after cancelling an existing order', function(done) {

    });
    it('should get 404 after cancelling non existing order', function(done) {

    });
    it('should get 422 after cancelling an order again', function(done) {
      
    });
  });
});