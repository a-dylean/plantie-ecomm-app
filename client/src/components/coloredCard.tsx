import { styled, Card } from "@mui/material";
import { lightViolet } from "./theme";

export const ColoredCard = styled(Card)(({ theme }) => ({
    backgroundColor: lightViolet,
    width: '175%',
  }));