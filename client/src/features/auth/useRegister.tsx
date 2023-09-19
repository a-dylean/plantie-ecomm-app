import { api } from "../../helpers/refreshToken";
import { useMutation } from "@tanstack/react-query";


export const createNewUser = useMutation({
    mutationFn: () => {
        return api.post('session/start');
    },
    onSuccess(data, variables, context) {
        return data;
    },
})