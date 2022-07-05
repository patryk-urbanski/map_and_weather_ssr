import React, { FC } from 'react';

import { IWeatherData } from '../../../types';
interface IWeatherProps {
  weatherData?: IWeatherData;
}

const Weather: FC<IWeatherProps> = ({ weatherData }) => {
  console.log('Weather');

  if (!weatherData) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <h1>Weather</h1>
      <h2>
        {weatherData.location.name}, {weatherData.location.country}{' '}
      </h2>
    </>
  );
};

export default Weather;
