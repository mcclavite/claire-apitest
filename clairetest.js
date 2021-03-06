var request = require('supertest')('http://localhost:51544');
var chai = require('chai');
var expect = chai.expect;
var helper = require('./helper.js');
var payload = {};


describe('Lalamove API Tests', function () {
    let asapOrderId, scheduledOrderId, asapOrderResponse, scheduledOrderResponse, nonExistentId;
    before(async function () {
      payload.stops = helper.generateRandomPoints();
      await request
          .post('/v1/orders')
          .send(payload)
          .expect(function (response) {
              try {
                  expect(response.status).to.be.equal(201);
                  asapOrderId = response.body.id;
                  asapOrderResponse = response.statusCode;
                  console.log('response body: ', response.body);
              }
              catch(err) {
                  console.log("error: ", err)
              }
        });
        payload.stops = helper.generateRandomPoints();
        payload.orderAt = helper.getRandTimewithin30Days();
        await request
          .post('/v1/orders')
          .send(payload)
          .expect(function (response) {
              try {
                  expect(response.status).to.be.equal(201);
                  scheduledOrderId = response.body.id;
                  scheduledOrderResponse = response.statusCode;
                  console.log('response body: ', response.body);
              }
              catch(err){
                  console.log("error: ", err)
              }
        });
        console.log("asapOrderId", asapOrderId);
        console.log("asapOrderResponse", asapOrderResponse);
        console.log("scheduledOrderId", scheduledOrderId);
        console.log("scheduledOrderResponse", scheduledOrderResponse);
    });

  describe('POST', function () {
      it('should get 201 OK after POST immediate order', async function () {
        expect(asapOrderResponse).to.be.equal(201);
      });
      it('should get 201 OK after POST scheduled order', async function () {
        expect(scheduledOrderResponse).to.be.equal(201);
      });
  });
  describe('GET', function() {
    it('should get 200 OK after fetching existing asap order id', async function () {
      await request
          .get('/v1/orders/' + asapOrderId)
          .expect(function (response) {
              try{
                  expect(response.status).to.be.equal(200);
                  console.log('response body: ', response.body);
              }
              catch(err){
                  console.log("error:", err)
              }
        });
    });
    it('should get 200 OK after fetching existing scheduled order id', async function () {
        await request
            .get('/v1/orders/' + scheduledOrderId)
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(200);
                    console.log('response body: ', response.body);
                }
                catch(err){
                    console.log("error:", err)
                }
          });
      });
    it('should get 404 after fetching non existing order id', async function () {
        nonExistentId = asapOrderId + Math.floor(Math.random() * 100);
        await request
            .get('/v1/orders/' + nonExistentId)
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(404);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
  });
  describe('PUT - Take Orders', function() {
    it('should return 200 after driver takes asap order', async function() {
        await request
            .put('/v1/orders/' + asapOrderId + '/take')
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(200);
                    console.log('response body: ', response.body);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
    it('should return 404 after driver takes non existing order id', async function() {
        nonExistentId = asapOrderId + Math.floor(Math.random() * 100);
        await request
        .put('/v1/orders/' + nonExistentId + '/take')
        .expect(function (response) {
            try{
                expect(response.status).to.be.equal(404);
            }
            catch(err){
                console.log("error:", err)
            }
         });
    });
    it('should return 422 after driver takes asap order again', async function() {
        await request
        .put('/v1/orders/' + asapOrderId + '/take')
        .expect(function (response) {
            try{
                expect(response.status).to.be.equal(422);
            }
            catch(err){
                console.log("error:", err)
            }
        });
    });
    });
  describe('PUT - Complete Orders', function(){
    it('should get 200 after driver completes an existing asap order', async function() {
        await request
            .put('/v1/orders/' + asapOrderId + '/complete')
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(200);
                    console.log('response body: ', response.body);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
    it('should get 404 after driver completes non existing order', async function() {
        nonExistentId = asapOrderId + Math.floor(Math.random() * 100);
        await request
            .put('/v1/orders/' + nonExistentId + '/complete')
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(404);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
    it('should get 422 after driver completes asap order again', async function() {
        await request
            .put('/v1/orders/' + asapOrderId + '/complete')
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(422);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
  });
  describe('PUT - Cancel Orders', function(){
    it('should get 200 after cancelling an existing scheduled order', async function() {
        await request
            .put('/v1/orders/' + scheduledOrderId + '/cancel')
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(200);
                    console.log('response body: ', response.body);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
    it('should get 404 after cancelling non existing order', async function() {
        nonExistentId = scheduledOrderId + Math.floor(Math.random() * 100);
        await request
            .put('/v1/orders/' + nonExistentId + '/cancel')
            .expect(function (response) {
                try{
                    expect(response.status).to.be.equal(404);
                }
                catch(err){
                    console.log("error:", err)
                }
        });
    });
    // skipped 422 as it can still cancel an already cancelled order
    it.skip('should get 422 after cancelling a scheduled order again', async function() {
        await request
        .put('/v1/orders/' + scheduledOrderId + '/cancel')
        .expect(function (response) {
            try{
                expect(response.status).to.be.equal(422);
            }
            catch(err){
                console.log("error:", err)
            }
    });
    });
  });
});