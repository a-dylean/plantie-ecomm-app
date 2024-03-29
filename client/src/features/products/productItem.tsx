import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../helpers/routes';
import { AddToCartButton } from '../../components/addToCardButton';
import { Price } from '../../components/price';
import { Product } from '../../models/api';

export const ProductItem = (product: Product) => {
  const navigate = useNavigate();
  const ProductItemCard = styled(Card)(() => ({
    width: 345,
    height: 650,
  }));
  return (
    <ProductItemCard>
      <Box>
        <Box
          onClick={() => {
            navigate(`${routes.PRODUCTS}/${product.id}`);
          }}
          sx={{ cursor: 'pointer' }}
        >
          <CardMedia
            component="img"
            alt="product img"
            height="400px"
            image={product.picture || ""}
          />
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="h6" component="div">
                <Price price={product.price}/>
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              height={'7rem'}
              sx={{ wordBreak: 'break-word', textAlign: 'justify' }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <AddToCartButton {...product} />
        </CardActions>
      </Box>
    </ProductItemCard>
  );
};
