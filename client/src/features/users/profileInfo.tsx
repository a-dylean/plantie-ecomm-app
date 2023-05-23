import { List, ListItem, Divider } from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';
export const ProfileInfo = ({
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
          <ListItem>📧: {userEmail}</ListItem>
          <ListItem>📞: {userPhone}</ListItem>
          <ListItem>🏠: {userAddress}</ListItem>
        </List>
      </ColoredCard>
    </List>
  );
};
