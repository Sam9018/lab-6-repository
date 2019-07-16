'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/location', (request, response) => {
  const geoData = require('./data/geo.json');
  const location = new Location(request.query.data, geoData);
  response.send(location);
})

function Location(query, geoData) {
  this.locationQuery = query;
  this.formatPlace = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

app.get('/weather', (request, response) => {
  console.log('in weather')
  const weatherData = require('./data/darksky.json');
  let weatherArr =[];
  for(var i=0; i < weatherData.daily.data.length; i++) {
    weatherArr.push(
      new Weather(request.query.data, weatherData.daily.data[i].time, weatherData.daily.data[i].summary)
    );

  }
  response.send(weatherArr);
})

function Weather(query, time, summary) {
  this.weatherQuery = query;
  this.time = time;
  this.summary = summary;
  // this.time = weatherData.daily.data[i].time;
  // this.forecast = weatherData.daily.data[].summary;
}





app.listen(PORT,() => console.log(`Listening on port ${PORT}`));




// app.use(express.static('./public'));

// app.get('/hello', (request, response) => {
//   response.status(200).send('Hello');
// });

// app.get('/data', (request, response) => {
//   let airplanes = {
//     departure: Date.now(),
//     canFly: true,
//     pilot: 'Well Trained'
//   }
//   response.status(200).json(airplanes);
// });

// app.use('*', (request, response) => response.send('Sorry, that route does not exist.'))

