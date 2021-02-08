/**
* https://gist.github.com/mkhatib/5641004
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
function generateRandomPoints(center, radius, count) {
    center = {'lat': 22.3,'lng': 114.1 }; // Kwun Tong
    radius = 25000;                 // setting radius within 25km
    count = getRandomInt(21);   // generate random latlong within 20 stops
    var points = [];
    for (var i=0; i<count; i++) {
      points.push(generateRandomPoint(center, radius));
    }
    return points;
  }
  
  
  /**
  * Generates number of random geolocation points given a center and a radius.
  * Reference URL: http://goo.gl/KWcPE.
  * @param  {Object} center A JS object with lat and lng attributes.
  * @param  {number} radius Radius in meters.
  * @return {Object} The generated random points as JS object with lat and lng attributes.
  */
  function generateRandomPoint(center, radius) {
    var x0 = center.lng;
    var y0 = center.lat;

    // Convert Radius from meters to degrees.
    var rd = radius/111300;
  
    var u = Math.random();
    var v = Math.random();
  
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);
  
    var xp = x/Math.cos(y0);
    var lat = y + y0;               
    var lng = xp + x0; 
    lat =  Math.round(lat * 1e6) / 1e6; //updated to have round at 6 decimal places
    lng =  Math.round(lng * 1e6) / 1e6;
  
    // Resulting point.    
    return {'lat': lat, 'lng': lng}; 
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  function getRandTimewithin30Days(){
    // 30 days is 2592000000 ms
    var currentTimeStamp = new Date();
    var randomMiliSecondsWithin30days = getRandomInt(2592000000);
    var futureTime = currentTimeStamp.getTime() + randomMiliSecondsWithin30days;
    
    return new Date(futureTime).toISOString();
  }
  module.exports = { generateRandomPoints,getRandTimewithin30Days}