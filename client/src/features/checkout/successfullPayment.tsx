import { Box, Typography } from "@mui/material";
import { Layout } from "../../app/layout";

export const SuccessfullPayment = () => {
  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          Your payment has been successfully processed! Thank you for your
          order!🙌
        </Typography>
      </Box>
    </Layout>
  );
};
