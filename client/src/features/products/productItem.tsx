import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Product } from '../../app/interfaces';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { selectProduct } from './productSlice';
import { routes } from '../../helpers/routes';
import { useCreateNewOrder } from '../../helpers/cartFunctions';

export const ProductItem = (product: Product) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addToCart = useCreateNewOrder(product);

  return (
    <Card sx={{ width: 345, height: 670 }}>
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
            height="400"
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
              height={'8rem'}
              sx={{ wordBreak: 'break-word' }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Button
            sx={{ width: '100%' }}
            variant="outlined"
            size="small"
            color="secondary"
            disableElevation
            onClick={() => addToCart()}
          >
            Add to cart
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
