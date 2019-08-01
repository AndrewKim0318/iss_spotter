/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const request = require('request');

const fetchMyIP = function(callback) {
  
  const URLForIP = `https://api.ipify.org?format=json`;
  request(URLForIP, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    const ipAddress = data["ip"];
    callback(null, ipAddress);
    
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const URLForCoord = `https://ipvigilante.com/json/${ip}`;
  
  request(URLForCoord, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const info = JSON.parse(body);
    let coordinates = {};
    coordinates[`latitude`] = info.data.latitude;
    coordinates[`longitude`] = info.data.longitude;
    callback(null, coordinates);
    
    
  });
  
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  const URLForCoord = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  
  // use request to fetch IP address from JSON API
  request(URLForCoord, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Invalid longitude or latitude. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const info = JSON.parse(body);
    const ISSFlyOverTime = info.response;
    callback(null, ISSFlyOverTime);
    
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      const errorMessage = `It didn't work! ${error.hostname} not found!`;
      callback(errorMessage, null);
      return;
    }
    
    console.log('It worked! Returned IP:' , ip);
    
    fetchCoordsByIP(ip, (error, coordinates) => {
      
      if (error) {
        const errorMessage = `It didn't work! Error: ${error}`;
        callback(errorMessage, null);
        return;
      }

      const latitude = coordinates.latitude;
      const longitude = coordinates.longitude;
      console.log(`The coordinates corresponding to the IP address is: latitude: ${latitude}, longitude: ${longitude}`);
      
      fetchISSFlyOverTimes({ latitude: '51.12640', longitude: '-114.14190' }, (error, flyOverTime) => {
        if (error) {
          const errorMessage = `It didn't work! ${error}`;
          callback(errorMessage, null);
          return;
        }
        
        callback(null, flyOverTime);
      });
  
    });
  
  });

};


module.exports = nextISSTimesForMyLocation;