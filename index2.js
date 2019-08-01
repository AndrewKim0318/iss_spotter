const nextISSTimesForMyLocation  = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (let passTime of passTimes) {
    let date = new Date(passTime.risetime * 1000);
    console.log(`Next pass at ${date} for ${passTime.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });