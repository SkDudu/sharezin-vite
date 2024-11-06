import axios from 'axios'
import { useCookies } from 'react-cookie';

export interface UserProps {
    name: string
    email: string
    accessToken: string
}

export interface UserLoginProps {
    userId: string;
    acessToken: string;
}

export async function createUser(name: string, email: string, password: string){
    const response = await axios.post<UserProps>(`${import.meta.env.VITE_API_URL}/signUp`, {
        name, email, password
    })

    return response
}

export async function login(email: string, password: string){
    const response = await axios.post<UserLoginProps>(`${import.meta.env.VITE_API_URL}/signIn`, {
        email, password
    })

    return response
}

export async function logout(){
    const [cookies] = useCookies(['acessToken'])
    const token = cookies.acessToken

    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/logout`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(response.data.message == 'Logout successful'){
        return true
    }else{
        return false
    }
}