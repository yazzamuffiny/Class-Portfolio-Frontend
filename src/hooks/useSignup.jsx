import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const baseURL = import.meta.env.VITE_API_BASE_URL


    const signup = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {

            const response = await axios.post(`${baseURL}/api/user/signup`,
                {username, password},
                {headers: {'Content-Type': 'application/json'}}
            );

        
            if (response.status !== 200) {
                setIsLoading(false)
                setError(error.response.data.error)
            }

            if (response.status === 200) {
                // Save to local storage
                localStorage.setItem('user', JSON.stringify(response.data))
                // Update auth context state
                dispatch({type: 'LOGIN', payload: response.data})
                
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error.response.data.error);
            setError(error.response.data.error)
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}