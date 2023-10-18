import { Typography, Box, Paper, List } from '@mui/material';
import { UserInfo } from './userInfo';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { User } from '../../models/api';
import { TabPanelProps } from '../../app/interfaces';
import { OrdersInfo } from '../orders/ordersInfo';

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

export const FullProfilePage = (user: User) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
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
              <UserInfo {...user} />
            </List>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h5">Orders information</Typography>
          <OrdersInfo {...user} />
        </TabPanel>
      </Box>
    </Paper>
  );
};
