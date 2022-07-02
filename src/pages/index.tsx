import React from 'react';

import Button from '@mui/material/Button';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <Button variant="contained">Hello World</Button>;
    </>
  );
};

export default Home;
