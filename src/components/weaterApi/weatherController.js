'use strict';
const axios = require('axios');
const config = require('config');

exports.getWeatherData = async function (city) {
    try{
        /* get api key config*/
        const API_KEY = config.get('WEATHER_API_KEY');
        /* get url base config*/
        const URL_BASE_WEATHER = config.get('URL_BASE_WEATHER');
        /* create url to send to api*/
        const URL = `${URL_BASE_WEATHER}?q=${city}&APPID=${API_KEY}&units=metric&lang=es`;
        /* send request */
        const response = await axios.get(URL);
        /* return data */
        return response.status === 200 ? response.data : response;
    }catch (e) {
        throw e;
    }
};

exports.getForecastData = async function (city) {
    try{
        /* get api key config*/
        const API_KEY = config.get('WEATHER_API_KEY');
        /* get url base config*/
        const URL_BASE_FORECAST = config.get('URL_BASE_FORECAST');
        /* create url to send to api*/
        const URL = `${URL_BASE_FORECAST}?q=${city}&APPID=${API_KEY}&units=metric&lang=es`;
        /* send request */
        const response = await axios.get(URL);
        /* return data */
        return response.status === 200 ? response.data : response;
    }catch (e) {
        throw e;
    }
};