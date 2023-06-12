import { Box, Card, Typography } from '@mui/material';

export const NothingFound = () => {
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Typography variant="h6" align="center">
          Oopsie daisy! We couldn't find any plants that match your filtering
          parameters.
        </Typography>
        <br />
        <Typography align="center">
          Check out our other plant varieties. <br />
          Happy browsing! 🌿🌸🌱
        </Typography>
      </Box>
    </>
  );
};
