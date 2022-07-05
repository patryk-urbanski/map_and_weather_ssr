import React, { FC, useState } from 'react';

import { TextField, Button, Box } from '@mui/material';

import { updateLocations } from '../../../api/api';
import { removeDiactrics } from '../../../utils/utils';

interface ILocationInputProps {
  setCurrentLocation: (location: string) => void;
}

const LocationInput: FC<ILocationInputProps> = ({ setCurrentLocation }) => {
  const [location, setLocation] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanLocation = removeDiactrics(location);
    setCurrentLocation(cleanLocation);
    updateLocations(cleanLocation);
  };

  const handleSetLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.currentTarget.value);
  };

  return (
    <Box
      component={'form'}
      onSubmit={handleOnSubmit}
      padding={{ xs: 1, sm: 10 }}
      textAlign="center"
    >
      <TextField required label="Location" value={location} onChange={handleSetLocation} />
      <Button
        type="submit"
        variant="contained"
        sx={{
          height: '56px',
        }}
      >
        SEND!
      </Button>
    </Box>
  );
};

export default LocationInput;
