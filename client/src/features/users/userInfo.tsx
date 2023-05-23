import {
  List,
  ListItem,
  Divider,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BalconyIcon from '@mui/icons-material/Balcony';
export const UserInfo = ({
  userName,
  userSurname,
  userEmail,
  userPhone,
  userAddress,
}: any) => {
  return (
    <List>
      <ColoredCard>
        <List dense>
          <ListItem sx={{ fontWeight: 'bold' }}>
            {userName} {userSurname}
          </ListItem>
          <Divider />
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <Typography>{userEmail}</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            {userPhone}
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon>
              <BalconyIcon />
            </ListItemIcon>
            {userAddress}
          </ListItem>
        </List>
      </ColoredCard>
    </List>
  );
};
