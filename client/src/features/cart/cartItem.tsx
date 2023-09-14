// import { Typography, Box, IconButton, ListItem, Divider } from '@mui/material';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import { Price } from '../../components/price';
// import React from 'react';
// import { CartItemProps } from '../../app/interfaces';
// import { useWindowSize } from '../../hooks/useWindowSize';

// export const CartItemComponent: React.FC<CartItemProps> = ({ ...cartItem }) => {
//   const { data: productInfo } = useGetProductQuery(cartItem.productId);
//   const { data: productOrderInfo } = useGetProductOrderByProductIdQuery(
//     cartItem.productId,
//   );
//   const totalPerItem = cartItem.quantity * Number(productInfo?.price);
//   const [update] = useUpdateQuantityMutation();
//   const updateQuantity = (newQuantity: number) => {
//     return update({ id: productOrderInfo?.id, quantity: newQuantity });
//   };
//   const [deleteItem] = useDeleteProductOrderMutation();
//   const removeEntirely = () => {
//     deleteItem(productOrderInfo?.id);
//   };
//   const size = useWindowSize();
//   return (
//     <>
//       {productInfo && productOrderInfo && (
//         <>
//           <ListItem dense>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexWrap: 'nowrap',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}
//             >
//               <Typography
//                 component="div"
//                 sx={{ width: `${size.width > 500 ? '200px' : '130%'}` }}
//               >
//                 {productInfo.name} <br />
//                 <Price price={productInfo.price} />
//               </Typography>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}
//               >
//                 <IconButton
//                   color="secondary"
//                   onClick={() => {
//                     updateQuantity(--cartItem.quantity);
//                   }}
//                   disabled={cartItem.quantity <= 0}
//                 >
//                   <RemoveCircleOutlineIcon />
//                 </IconButton>
//                 {productOrderInfo.quantity}
//                 <IconButton
//                   color="secondary"
//                   onClick={() => updateQuantity(++cartItem.quantity)}
//                 >
//                   <AddCircleOutlineIcon />
//                 </IconButton>
//               </Box>
//               <Typography component="div">
//                 <Price price={totalPerItem} />
//               </Typography>
//               <IconButton onClick={removeEntirely}>
//                 <HighlightOffIcon color="secondary" />
//               </IconButton>
//             </Box>
//           </ListItem>
//           <Divider />
//         </>
//       )}
//     </>
//   );
// };
export {}
