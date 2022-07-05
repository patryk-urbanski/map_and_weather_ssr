import React, { FC } from 'react';

interface Props {
  currentLocation?: string;
}

const Map: FC<Props> = ({ currentLocation }) => {
  console.log('map');
  return (
    <>
      <h1>Map</h1>
    </>
  );
};

export default Map;
