import React, { useState } from 'react';

import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';

import { fetchLocations, fetchWeatherAndLocation } from '../api/api';
import LocationInput from '../components/molecules/location-input/location-input';
import LocationList, { ILocation } from '../components/molecules/location-list/location-list';
import SelectedTemplate from '../components/templates/selectedTemplate/selectedTemplate';
import { SUBDIRECTORY_ID } from '../constants';
import { ILocationData, IWeatherData } from '../types';

interface IHomePageProps {
  locations: ILocation[];
  initialWeatherData: IWeatherData;
  initialLocationData: ILocationData;
}

const Home: NextPage<IHomePageProps> = (context) => {
  const [currentLocation, setCurrentLocation] = useState<string>();

  return (
    <>
      <h1>Homepage</h1>
      <LocationInput setCurrentLocation={setCurrentLocation} />
      <LocationList
        initialLocations={context.locations}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
      />
      <SelectedTemplate
        initialLocationData={context.initialLocationData}
        initialWeatherData={context.initialWeatherData}
        currentLocation={currentLocation}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  if (cookies[SUBDIRECTORY_ID]) {
    const locations = await fetchLocations(cookies[SUBDIRECTORY_ID]);

    const recentLocation = locations[locations.length - 1];
    const initialWeatherData = await fetchWeatherAndLocation(recentLocation.name);

    if (initialWeatherData.error) {
      return {
        props: {
          locations: locations || [],
        },
      };
    }

    const initialLocationData = initialWeatherData.location || null;

    return {
      props: {
        locations: locations || [],
        initialWeatherData,
        initialLocationData,
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
