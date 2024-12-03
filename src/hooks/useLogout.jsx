import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        // Remove from local storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
    }
    return {logout}
}