import { styled, Card } from "@mui/material";
import { lightViolet } from "./theme";

export const ColoredCard = styled(Card)(() => ({
    backgroundColor: lightViolet,
    width: '100%',
  }));