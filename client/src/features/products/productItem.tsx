import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  styled,
} from '@mui/material';
import { Product } from '../../app/interfaces';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reactReduxHooks';
import { selectProduct } from './productSlice';
import { routes } from '../../helpers/routes';
import { AddToCartButton } from '../../components/addToCardButton';

export const ProductItem = (product: Product) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ProductItemCard = styled(Card)(() => ({
    width: 345,
    height: 650,
  }));
  return (
    <ProductItemCard>
      <Box onClick={(): Product => dispatch(selectProduct(product))}>
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
            image={product.picture}
          />
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="h6" component="div">
                €{product.price}
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
          <AddToCartButton product={product}/>
        </CardActions>
      </Box>
    </ProductItemCard>
  );
};
