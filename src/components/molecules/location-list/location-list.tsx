import React, { FC, useState, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { fetchLocations } from '../../../api/api';

export interface ILocation {
  _id: string;
  name: string;
}

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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!locations) {
    return null;
  }

  return (
    <List>
      {locations.map((location: ILocation) => (
        <ListItemButton onClick={handleOnClick(location.name)} key={location._id}>
          {location.name}
        </ListItemButton>
      ))}
    </List>
  );
};

export default LocationList;
