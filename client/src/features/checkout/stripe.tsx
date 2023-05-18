// import { Layout } from "../../app/layout";
// import { useDeleteProductOrderMutation, useGetUserCartQuery, useGetUserOrderQuery } from "../orders/ordersApi";
// import axios from "axios";
// import { Cart } from "../cart/cart";
// import { Button } from "@mui/material";

// export const StripeForm = () => {
//   const { data: OrderItems = [] } = useGetUserCartQuery();
//   const [deleteItem] = useDeleteProductOrderMutation();
//   const handleCheckout = async () => {
//     const response = await axios.post(
//       "http://localhost:4001/create-checkout-session",
//       {OrderItems}
//     );
//     OrderItems.map((item) => item.id).forEach((id) => deleteItem(id));
//     window.location.href = response.data.url;
//   };

//   return (
//     <Layout>
//       <Cart visible = {false}/>
//       <Button variant="contained" onClick={handleCheckout} sx={{m: "0 1.5rem", p: "1rem 3rem"}}>
//         PAY
//       </Button>
//     </Layout>
//   );
// };
export {}