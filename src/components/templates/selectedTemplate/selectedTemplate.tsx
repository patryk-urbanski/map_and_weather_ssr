import React, { useState, useMemo, useEffect, FC } from 'react';

import { Box, CircularProgress, Alert } from '@mui/material';

import { fetchWeatherAndLocation } from '../../../api/api';
import { ILocationData, IWeatherData } from '../../../types';
import Navigation from '../../molecules/navigation/navigation';
import type { TTemplate } from '../../molecules/navigation/navigation';
import Map from '../../organisms/map/map';
import Weather from '../../organisms/weather/weather';

interface IError {
  message: string;
}

interface ISelectedTemplate {
  initialWeatherData?: IWeatherData;
  initialLocationData?: ILocationData;
  currentLocation: string | undefined;
}

const SelectedTemplate: FC<ISelectedTemplate> = ({
  initialWeatherData,
  initialLocationData,
  currentLocation,
}) => {
  const [template, setTemaplte] = useState<TTemplate>('weather');
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [locationData, setLocationData] = useState(initialLocationData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    if (!currentLocation) {
      return;
    }
    setIsLoading(true);

    fetchWeatherAndLocation(currentLocation).then((result) => {
      if (result.error) {
        setError(result.error);
      } else {
        setWeatherData(result);
        setLocationData(result.location);
        setError(null);
      }

      setIsLoading(false);
    });
  }, [currentLocation]);

  const view = useMemo(() => {
    switch (template) {
      case 'weather':
        return <Weather weatherData={weatherData} />;
      case 'map':
        return <Map locationData={locationData} />;
    }
  }, [locationData, template, weatherData]);

  return (
    <Box width="70%" height={300}>
      <Navigation template={template} setTemplate={setTemaplte} />
      {error && <Alert severity="error">{error.message}</Alert>}
      {isLoading ? <CircularProgress /> : view}
    </Box>
  );
};

export default SelectedTemplate;
