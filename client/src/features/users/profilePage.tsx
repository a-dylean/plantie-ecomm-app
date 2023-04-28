import { Typography, Box, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { Layout } from "../../app/layout";
import Grid from "@mui/material/Unstable_Grid2";
import { Image } from "mui-image";
import { ProfileInfo } from "./profileInfo";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { OrdersInfo } from "../orders/ordersInfo";
import { useGetCurrentUserDetailsQuery } from "./usersApi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserDetailsQuery();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      {user && (
        <Paper sx={{ maxHeight: 800 }}>
          <Grid container>
            <Grid xs={6}>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: "100%",
                }}
              >
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    overflow: "visible",
                  }}
                >
                  <Tab label="Profile" {...a11yProps(0)} />
                  <Tab label="Orders" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Typography variant="h5">Profile information</Typography>
                  <ProfileInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Typography variant="h5">Orders information</Typography>
                  <Box sx={{ maxHeight: 620, overflow: "auto" }}>
                    <OrdersInfo />
                  </Box>
                </TabPanel>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Typography
                sx={{ position: "absolute", zIndex: 5, ml: 2, mt: 3 }}
                variant="h5"
                color="white"
              >
                Welcome,
                <br /> planties lover {user.name}!
              </Typography>
              <Image
                src="https://images.unsplash.com/photo-1680677463262-4e2b0ffc7f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80"
                fit="contain"
                height="100%"
                duration={50}
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </Layout>
  );
};
