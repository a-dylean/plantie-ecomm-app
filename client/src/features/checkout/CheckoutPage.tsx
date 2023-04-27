import { Button } from "@mui/material"
import { useDeleteProductOrderMutation, useGetUserCartQuery, useGetUserOrderQuery, usePayMutation } from "../api/apiSlice"
import { Layout } from "../../app/layout";
export const CheckoutPage = () => {
    const {data: order} = useGetUserOrderQuery();
    const {data: productOrderInfo} = useGetUserCartQuery();
    const [deleteItem] = useDeleteProductOrderMutation();
    
    const [pay] = usePayMutation()
    const handleClick = () => {
        pay(order!.id);
        (productOrderInfo?.map(item => item.id).forEach(id => deleteItem(id)));
    }
    return (
        <Layout>
        <Button variant="contained" onClick={handleClick}>PAY</Button>
        </Layout>
    )
}