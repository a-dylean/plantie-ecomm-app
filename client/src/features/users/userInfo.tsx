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
import { User } from '../../models/api';

export const UserInfo= (user: User) => {
  return (
    <ColoredCard>
      <List dense>
        <ListItem sx={{ fontWeight: 'bold' }}>
          {user.name} {user.surname}
        </ListItem>
        <Divider />
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <Typography>{user.email}</Typography>
        </ListItem>
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          {user.phone}
        </ListItem>
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <BalconyIcon />
          </ListItemIcon>
          {user.address}
        </ListItem>
      </List>
    </ColoredCard>
  );
};
