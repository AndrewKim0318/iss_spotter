
const nextISSTimesForMyLocation = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  

  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let i = 0; i < passTimes.length; i++) {
    let date = new Date(passTimes[i].risetime * 1000);
    console.log(`Next pass at ${date} for ${passTimes[i].duration} seconds!`);
  }
});

