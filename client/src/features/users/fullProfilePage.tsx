import { Typography, Box, Paper, List } from '@mui/material';
import { Layout } from '../../app/layout';
import { Image } from 'mui-image';
import { UserInfo } from './userInfo';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import { OrdersInfo } from '../orders/ordersInfo';
import { User } from '../../app/interfaces';
import { useWindowSize } from '../../hooks/useWindowSize';

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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const FullProfilePage: React.FC<Partial<User>> = (user) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // const image =
  //   'https://images.unsplash.com/photo-1680677463262-4e2b0ffc7f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80';
  const size = useWindowSize();
  return (
    <Layout>
      <Paper>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            height: '100%',
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Profile menu"
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              overflow: 'visible',
            }}
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography variant="h5">Profile information</Typography>
            <Box sx={{ display: 'flex' }}>
              <List>
                <UserInfo
                  name={user.name}
                  email={user.email}
                  surname={user.surname}
                  address={user.address}
                  phone={user.phone}
                />
              </List>
              {/* {size.width > 700 && (
                <Image src={image} width="40%" duration={50} />
              )} */}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h5">Orders information</Typography>
            {/* <OrdersInfo userId={user.id} /> */}
          </TabPanel>
        </Box>
      </Paper>
    </Layout>
  );
};
