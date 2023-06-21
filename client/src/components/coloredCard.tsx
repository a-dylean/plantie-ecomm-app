import { styled, Card } from '@mui/material';
import { lightViolet } from './theme';

export const ColoredCard = styled(Card)(({ theme }) => ({
  backgroundColor: lightViolet,
  width: '100%',
  padding: theme.spacing(1.5),
}));
