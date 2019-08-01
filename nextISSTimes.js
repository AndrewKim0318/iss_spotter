/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const request = require('request');

const nextISSTimesForMyLocation = function(callback) {

  const URLForCoord = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  
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

module.exports = nextISSTimesForMyLocation;