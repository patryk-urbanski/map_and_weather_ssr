import React, { useState, useMemo, useEffect, FC } from 'react';

import { fetchWeatherAndLocation } from '../../../api/api';
import { ILocationData, IWeatherData } from '../../../types';
import Navigation from '../../molecules/navigation/navigation';
import type { TTemplate } from '../../molecules/navigation/navigation';
import Map from '../../organisms/map/map';
import Weather from '../../organisms/weather/weather';

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

  useEffect(() => {
    if (currentLocation) {
      fetchWeatherAndLocation(currentLocation).then((result) => {
        setWeatherData(result);
        setLocationData(result.location);
      });
    }
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
    <>
      <Navigation template={template} setTemplate={setTemaplte} />
      {view}
    </>
  );
};

export default SelectedTemplate;
