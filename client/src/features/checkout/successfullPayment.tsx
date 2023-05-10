import { Typography } from "@mui/material"
import { Layout } from "../../app/layout"

export const SuccessfullPayment = () => {
    return (
        <Layout>
        <Typography variant="h3" component="div" sx={{alignContent: "center"}}>
            YOUR PAYMENT HAS BEEN SUCCESSFULLY PROCESSED!
            </Typography>
        </Layout>
    )
}