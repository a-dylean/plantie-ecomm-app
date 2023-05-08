import { LoginForm } from "../auth/loginPage"
import { RegistrationForm } from "../auth/registrationPage"
import { FullProfilePage } from "./fullProfilePage"
import { useGetCurrentUserDetailsQuery } from "./usersApi"

export const ProfilePage = () => {
    const { data: user } = useGetCurrentUserDetailsQuery()
    let content;
    if (!user) {
        content = <LoginForm/>
    } else if (user.fullProfile === false) {
        content = <RegistrationForm/>
    } else if (user.fullProfile === true) {
        content = <FullProfilePage userId={user?.id} userName={user?.name} userSurname={user?.surname} userAddress={user?.address} userEmail={user?.email} userPhone={user?.phone}/>
    }
    return (
        <>
        {content}
        </>
    )
}