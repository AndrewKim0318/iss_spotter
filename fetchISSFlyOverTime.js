/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const request = require('request');

const fetchISSFlyOverTimes = function(coords, callback) {
  
  const latitude = coords.latitude;
  const longitude = coords.longitude;
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

module.exports = fetchISSFlyOverTimes;