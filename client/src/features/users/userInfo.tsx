import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BalconyIcon from '@mui/icons-material/Balcony';
import React from 'react';
import { User } from '../../app/interfaces';

export const UserInfo: React.FC<Partial<User>> = ({
  name,
  surname,
  email,
  phone,
  address,
}) => {
  return (
    <List>
      <ColoredCard>
        <List dense>
          <ListItem sx={{ fontWeight: 'bold' }}>
            {name} {surname}
          </ListItem>
          <Divider />
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <Typography>{email}</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            {phone}
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <BalconyIcon />
            </ListItemIcon>
            {address}
          </ListItem>
        </List>
      </ColoredCard>
    </List>
  );
};
