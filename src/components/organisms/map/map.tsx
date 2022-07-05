import React, { FC } from 'react';

import { Map as PigeonMap, Marker } from 'pigeon-maps';

import { ILocationData } from '../../../types';

interface Props {
  locationData?: ILocationData;
}

const Map: FC<Props> = ({ locationData }) => {
  console.log('map');

  if (!locationData) {
    return <h1>no locaiton</h1>;
  }

  const coordinates = [locationData.lat, locationData.lon] as [number, number];

  return (
    <>
      <PigeonMap height={300} center={coordinates} defaultZoom={11}>
        <Marker width={50} anchor={coordinates} />
      </PigeonMap>
    </>
  );
};

export default Map;
