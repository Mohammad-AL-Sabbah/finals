
import React from 'react';
import { Button } from '@mui/material';

function BasswordReset(props) {
  return (
    <Button type="submit" variant="contained" size="large">
      {props.name}
    </Button>
  );
}

export default BasswordReset;
