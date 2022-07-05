import React, { FC, useState, useEffect } from 'react';

import { Box, CircularProgress, List, ListItemButton } from '@mui/material';

import { fetchLocations } from '../../../api/api';
import { ILocation } from '../../../types';

interface LocationListProps {
  initialLocations: ILocation[];
  currentLocation?: string;
  setCurrentLocation: (location: string) => void;
}

const LocationList: FC<LocationListProps> = ({
  initialLocations,
  currentLocation,
  setCurrentLocation,
}) => {
  const [locations, setLocations] = useState(initialLocations);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentLocation) {
      return;
    }

    setIsLoading(true);

    fetchLocations().then((result) => {
      setLocations(result);
      setIsLoading(false);
    });
  }, [currentLocation]);

  const handleOnClick = (name: string) => () => {
    setCurrentLocation(name);
  };

  if (!locations) {
    return null;
  }

  const clearedLocations = locations.filter(
    (location, index, self) => index === self.findIndex((item) => item.name === location.name),
  );

  return (
    <Box
      sx={{
        height: 300,
        width: 300,
        overflow: 'auto',
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {clearedLocations.reverse().map((location: ILocation) => (
            <ListItemButton
              onClick={handleOnClick(location.name)}
              key={location._id}
              selected={currentLocation === location.name}
              divider
            >
              {location.name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
};

export default LocationList;
