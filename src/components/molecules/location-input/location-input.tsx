import React, { FC, useState } from 'react';

import { TextField, Button } from '@mui/material';

import { updateLocations } from '../../../api/api';

interface ILocationInputProps {
  setCurrentLocation: (location: string) => void;
}

const LocationInput: FC<ILocationInputProps> = ({ setCurrentLocation }) => {
  const [location, setLocation] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentLocation(location);
    updateLocations(location);
  };

  const handleSetLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.currentTarget.value);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <TextField required label="Location" value={location} onChange={handleSetLocation} />
        <Button type="submit" variant="contained">
          Go!
        </Button>
      </form>
    </>
  );
};

export default LocationInput;
