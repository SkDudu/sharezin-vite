import axios from 'axios'

export interface UserProps {
    name: string
    email: string
    accessToken: string
}

export interface UserLoginProps {
    userId: any;
    acessToken: any;
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
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/logout`)
    if(response.data.message == 'Logout successful'){
        return true
    }else{
        return false
    }
}