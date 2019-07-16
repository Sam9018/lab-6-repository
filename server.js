'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/location', (request, response) => {
  try {
    if ( request.query.data !== 'Lynnwood' ){
      throw { status:500, errorMsg: 'No data on search query.' };
    }
    const geoData = require('./data/geo.json');
    const location = new Location(request.query.data, geoData);
    response.send(location);
  } catch (error) {
    response.status(error.status).send(error);
  }
})

function Location(query, geoData) {
  this.locationQuery = query;
  this.formatPlace = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

app.get('/weather', (request, response) => {
  try {
    if ( request.query.data !== 'LosAngeles' ){
      throw { status:500, errorMsg: 'No data on search query.'};
    }
    const weatherData = require('./data/darksky.json');
    let weatherArr =[];
    for(var i=0; i < weatherData.daily.data.length; i++) {
      weatherArr.push(
        new Weather(request.query.data, weatherData.daily.data[i].time, weatherData.daily.data[i].summary)
      );
    }
    response.send(weatherArr);
  } catch (error) {
    response.status(error.status).send(error);
  }
})

function Weather(query, time, summary) {
  this.weatherQuery = query;
  this.time = time;
  this.summary = summary;
}

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));
