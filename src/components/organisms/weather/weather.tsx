import React, { FC } from 'react';

import { Typography } from '@mui/material';

import { IWeatherData } from '../../../types';
interface IWeatherProps {
  weatherData?: IWeatherData;
}

const Weather: FC<IWeatherProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <>
      <Typography variant="h5">
        Weather in {weatherData.location.name}, {weatherData.location.country}{' '}
      </Typography>
      <Typography>Temp (celcius): {weatherData.current.temp_c} </Typography>
    </>
  );
};

export default Weather;
