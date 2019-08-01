// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  
  const URLForIP = `https://api.ipify.org?format=json`;
  return request(URLForIP);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const URLForCoord = `https://ipvigilante.com/json/${ip}`;
  return request(URLForCoord);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((data) => {
      console.log(`ip address: ${data}`);
      return fetchCoordsByIP(data);
    })
    .then((data) => {
      console.log(`location information: ${data}`);
      return fetchISSFlyOverTimes(data);
    })
    .then((data) => {
      const timesForMyLocation = JSON.parse(data);
      timesForMyLocation.response;
      return timesForMyLocation.response;
    });
};

module.exports = nextISSTimesForMyLocation;