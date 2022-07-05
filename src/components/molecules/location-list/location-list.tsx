import React, { FC } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

export interface ILocation {
  _id: string;
  name: string;
}

interface LocationListProps {
  locations: ILocation[];
}

const LocationList: FC<LocationListProps> = ({ locations }) => {
  const handleOnClick = (name: string) => () => {
    console.log('name', name);
  };

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
