import React, { useState } from 'react';

import { Paper, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';

import { fetchLocations, fetchWeatherAndLocation } from '../api/api';
import LocationInput from '../components/molecules/location-input/location-input';
import LocationList from '../components/molecules/location-list/location-list';
import SelectedTemplate from '../components/templates/selectedTemplate/selectedTemplate';
import { SUBDIRECTORY_ID } from '../constants';
import { ILocation, ILocationData, IWeatherData } from '../types';

interface IHomePageProps {
  locations: ILocation[];
  initialWeatherData: IWeatherData;
  initialLocationData: ILocationData;
  error: unknown;
}

const Home: NextPage<IHomePageProps> = (context) => {
  const [currentLocation, setCurrentLocation] = useState<string>();

  return (
    <Paper>
      <Typography variant="h2" align="center">
        Check your weather and location
      </Typography>
      <LocationInput setCurrentLocation={setCurrentLocation} />
      <Stack
        direction={{ xs: 'column', sm: 'row-reverse' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        padding={{ xs: 1, sm: 10 }}
      >
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
      </Stack>
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /* Of course, cookies should be handled on the backend side and based on them, 
  the user should have access to his unique search database. This workaround is
  designed to allow an effective SSR for dev who didn't have enough time or willingness
  to build some simple serverless CRUD.
  */
  const cookies = context.req.cookies;
  if (!cookies[SUBDIRECTORY_ID]) {
    const randomEnoughNumber = Math.floor(Math.random() * 99999999);
    context.res.setHeader('set-cookie', `${SUBDIRECTORY_ID}=${randomEnoughNumber}`);

    return {
      props: {
        locations: [],
      },
    };
  }

  const locations = await fetchLocations(cookies[SUBDIRECTORY_ID]);
  const recentLocation = locations?.length > 0 ? locations[locations.length - 1] : null;
  const initialWeatherData = recentLocation && (await fetchWeatherAndLocation(recentLocation.name));

  if (!initialWeatherData || initialWeatherData.error) {
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
};

export default Home;
