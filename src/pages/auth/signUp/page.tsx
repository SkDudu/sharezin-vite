import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import PocketBase from 'pocketbase'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import logo from "@/assets/Logo-asset.png"
import { createUser } from "@/routes/user"

export default function signUp(){
    const navigate = useNavigate()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errors, setErrors] = useState({ name: '', email: '', password: '', passwordConfirm: ''})

    function handleNameChange(event: any) {
        const { value } = event.target;
        setName(value);
    }

    function handleEmailChange(event: any) {
        const { value } = event.target;
        setEmail(value);
    }

    function handlePasswordChange(event: any) {
        const { value } = event.target;
        setPassword(value);
    }

    function handlePassworConfirmChange(event: any) {
        const { value } = event.target;
        setPasswordConfirm(value);
    }

    function navSignIn(){
        navigate("/")
    }

    const validate = ()=>{
        let isValid = true
        const errors = { name: '', email: '' , password: '', passwordConfirm: ''}

        if(!name){
            errors.name = 'Campo de nome obrigatório.'
            isValid = false
        }else if(name.length < 3){
            errors.name = 'Campo de nome precisa ter mais de 3 caracteres.'
            isValid = false
        }
    
        if(!email){
            errors.email = 'Campo de e-mail obrigatório.'
            isValid = false
        }else if (!/\S+@\S+\.\S+/.test(email)){
            errors.email = 'Email inválido.'
            isValid = false
        }
    
        if(!password){
            errors.password = 'Campo de senha obrigatório.'
            isValid = false
        }else if (password.length < 6){
            errors.password = 'Senha precisa ter 6 caracteres.'
            isValid = false
        }
    
        if(!passwordConfirm){
            errors.passwordConfirm = 'Campo de senha obrigatório.'
            isValid = false
        }else if (passwordConfirm.length < 6){
            errors.passwordConfirm = 'Senha de confirmação precisa ter 6 caracteres.'
            isValid = false
        }else if(passwordConfirm != password){
            errors.passwordConfirm = 'Senhas não coincidem.'
            isValid = false
        }

        setErrors(errors)
        return isValid
    }

    async function actionSignUp(){
        const username = name
        const data={
            name, email, password, passwordConfirm, username
        }
        if(validate()){
            const response = await pb.collection('users').create(data)

            if(response != null){
                toast.success('Conta criada com sucesso!')
                navigate('/')
            }
        }else{
            toast.error('Formulário preenchido errado.')
        }
    }

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen justify-center">
            <Card>
                <div className="flex w-full h-[60px] my-4 justify-center">
                    <img src={logo} alt="Logo de Sharezin" />
                </div>
                <CardHeader>
                    <p className="font-medium">Criar conta</p>
                    <p className="font-light">Digite suas credenciais para criar uma conta no sistema.</p>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Nome</Label>
                            <Input type="text" value={name} onChange={handleNameChange}/>
                            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Email</Label>
                            <Input type="email" value={email} onChange={handleEmailChange}/>
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Senha</Label>
                            <Input type="password" value={password} onChange={handlePasswordChange}/>
                            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Confirme sua senha</Label>
                            <Input type="password" value={passwordConfirm} onChange={handlePassworConfirmChange}/>
                            {errors.passwordConfirm && <p style={{ color: 'red' }}>{errors.passwordConfirm}</p>}
                        </div>
                        <Button onClick={actionSignUp} variant={"default"} className="w-full">
                            <p className="font-normal">Criar conta</p>
                        </Button>
                        <Button onClick={navSignIn} variant={"ghost"} className="w-full p-0 hover:bg-transparent">
                            <p className="font-normal underline">Lembrei da minha conta</p>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}