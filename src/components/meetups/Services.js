'use strict';

const weatherController = require('./../weaterApi/weatherController');
const appError = require('./../../Exceptions/AppError');
const moment = require('moment');


exports.weaterInfo = async function (city,date,time) {
    try{
        /* get weather data of the city */
        const data = await weatherController.getForecastData(city);
        /* filter data */
        const result = await getWeatherInfo(data.list, date, time);
        /* return data */
        if (!result.length) throw new appError('the date of the meetup exceeds the future 5 days');
        return result[0].main.temp;
    }catch (e) {
        throw e;
    }
};

exports.getMeeupInfo = function (guests, temp) {

    /* consumption rate according to temperature */
    const indice =  temp < 20 ? 0.75 :
                    temp >= 20 && temp <= 24 ? 1 : 3;
    /* amount of beer for the meetup */
    const consumption = indice * guests;
    /* group in packs of 6 */
    let beerPacks = Math.trunc( consumption / 6);
    const rem = consumption % 6;
    beerPacks = rem > 0 ? beerPacks +1 : beerPacks;

    return {beerPacks,consumption,indice,temp};
};

const getWeatherInfo = (data, date, time) => {
  const result = data.filter( item => {

      const itemTimeMin = moment(item.dt_txt).subtract(1, 'hours').format('HH:mm');
      const itemTimeMax = moment(item.dt_txt).add(1, 'hours').format('HH:mm');
      const itemDate = moment(item.dt_txt).format('DD/MM/YYYY');

      return itemDate === date && time >= itemTimeMin && time <= itemTimeMax;

  });
  return result;
};




