import { Container, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks"

export const ProfilePage = () => {

    const user = useAppSelector((state) => state.users.userInfo)
    return (
        <>
        <Container sx={{mt: 8}}>
        <Typography variant="h1" >Hello, {user.name}!</Typography>
        <Typography>User info:</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography sx={{wordBreak: "break-all"}}>Token: {user.token}</Typography>
        </Container>
        </>
    )
}