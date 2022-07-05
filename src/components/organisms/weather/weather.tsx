import React, { FC, useEffect, useState } from 'react';

import { fetchWeather } from '../../../api/api';

interface IWeatherData {
  location: {
    name: string;
    country: string;
  };
}

interface Props {
  currentLocation?: string;
  prerenderedWeatherData: IWeatherData;
}

const Weather: FC<Props> = ({ currentLocation, prerenderedWeatherData }) => {
  const [weatherData, setWeatherData] = useState<IWeatherData>(prerenderedWeatherData);
  console.log('Weather');

  useEffect(() => {
    if (currentLocation) {
      fetchWeather('wroclaw').then((result) => setWeatherData(result));
    }
  }, [currentLocation]);

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
