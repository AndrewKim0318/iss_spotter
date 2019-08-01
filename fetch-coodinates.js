const request = require('request');

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

module.exports = fetchCoordsByIP;