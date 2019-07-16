'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/locations', (request, response) => {
  const geoData = require('./data/geo.json');
  const location = new Location(request.query.data, geoData);
  response.send(location);
})

function Location(query, geoData) {
  this.locationQuery = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

app.get('/weather', (request, response) => {
  console.log('in weather')
  const weatherData = require('./data/darksky.json');
  const weather = new Weather(request.query.data, weatherData);
  response.send(weather);
})

function Weather(query, weatherData) {
  this.weatherQuery = query;
  this.time = weatherData.daily.data[0].time;
  this.forecast = weatherData.daily.data[0].summary;
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

