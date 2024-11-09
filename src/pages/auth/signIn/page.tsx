import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import PocketBase from 'pocketbase'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/button"

import logo from "@/assets/Logo-asset.png"

export default function signIn(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    function handleEmailChange(event: any) {
        const { value } = event.target;
        setEmail(value);
    }

    function handlePasswordChange(event: any) {
        const { value } = event.target;
        setPassword(value);
    }

    function navSignUp(){
        navigate("/signUp")
    }

    function navForgotpass(){
        navigate("/forgotpass")
    }

    async function actionSignIn(){
        setLoading(true)
        const identity = email

        try {
            const response = await pb.collection('users').authWithPassword(identity, password)
    
            if (response != null) {
                localStorage.clear()
                localStorage.setItem("userId", JSON.stringify(response.record.id))
                setLoading(false)
                navigate('/home')
            } else {
                setLoading(false)
                toast.error('Erro ao tentar fazer o login.')
            }
        } catch (error) {
            setLoading(false)
            toast.error('Erro ao tentar fazer o login. Por favor, verifique suas credenciais e tente novamente.');
        }
    }

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen justify-center">
            <Card>
                <div className="flex w-full h-[60px] my-4 justify-center">
                    <img src={logo} alt="Logo de Sharezin" />
                </div>
                <CardHeader>
                    <p className="font-medium">Login</p>
                    <p className="font-light">Digite suas credenciais para entrar no sistema.</p>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Email</Label>
                            <Input type="email" value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Senha</Label>
                            <Input type="password" value={password} onChange={handlePasswordChange}/>
                        </div>
                        <Button onClick={navForgotpass} variant={"ghost"} className="w-full justify-start p-0 hover:bg-transparent">
                            <p className="font-normal underline">Esqueci minha senha</p>
                        </Button>
                        <LoadingButton onClick={actionSignIn} variant={"default"} loading={loading}>
                            Entrar
                        </LoadingButton>
                        <Button onClick={navSignUp} variant={"ghost"} className="w-full justify-start p-0 hover:bg-transparent">
                            <p className="font-normal underline">Criar uma conta</p>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}