import React, { useMemo, useState } from 'react';

import { Button } from '@mui/material';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';

import { fetchWeather } from '../api/api';
import LocationInput from '../components/molecules/location-input/location-input';
import LocationList, { ILocation } from '../components/molecules/location-list/location-list';
import Map from '../components/organisms/map/map';
import Weather from '../components/organisms/weather/weather';
import { SUBDIRECTORY_ID } from '../constants';

interface IHomePageProps {
  locations: ILocation[];
  prerenderedWeatherData: {
    location: {
      name: string;
      country: string;
    };
  };
}

const templateItems = ['weather', 'map'] as const;
type TTemplate = typeof templateItems[number];

const Home: NextPage<IHomePageProps> = (context) => {
  const [template, setTemplate] = useState<TTemplate>('weather');

  const view = useMemo(() => {
    switch (template) {
      case 'weather':
        return <Weather {...context} />;
      case 'map':
        return <Map {...context} />;
    }
  }, [context, template]);

  const handleSetTemplate = (template: TTemplate) => () => {
    setTemplate(template);
  };

  return (
    <>
      <h1>Homepage</h1>
      <LocationInput />
      <LocationList locations={context.locations} />
      {templateItems.map((item, idx) => (
        <Button
          onClick={handleSetTemplate(item)}
          variant={template === item ? 'outlined' : 'text'}
          key={`${item}_${idx}`}
        >
          {item}
        </Button>
      ))}
      {view}
    </>
  );
};

const mockedLocations = [
  {
    id: 'dasdadada',
    name: 'wroclaw',
  },
  {
    id: 'dasda2312312343434dada',
    name: 'wroclaw123',
  },
  {
    id: 'dasda4343dada',
    name: 'wroclaw456',
  },
];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  if (cookies[SUBDIRECTORY_ID]) {
    // const response = await API.get(cookies[SUBDIRECTORY_ID]);
    // console.log('reponse', response);

    const prerenderedWeatherData = await fetchWeather('poznan');
    console.log('pre', prerenderedWeatherData);
    return {
      props: {
        locations: mockedLocations || [],
        prerenderedWeatherData,
      },
    };
  }

  const randomEnoughNumber = Math.floor(Math.random() * 99999999);
  context.res.setHeader('set-cookie', `${SUBDIRECTORY_ID}=${randomEnoughNumber}`);

  return {
    props: {
      locations: [],
    },
  };
};

export default Home;
