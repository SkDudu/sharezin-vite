import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import logo from "@/assets/Logo-asset.png"

export default function forgotPass(){
    const navigate = useNavigate();

    function navSignIn(){
        navigate("/")
    }

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen justify-center">
            <Card>
                <div className="flex w-full h-[60px] my-4 justify-center">
                    <img src={logo} alt="Logo de Sharezin" />
                </div>
                <CardHeader>
                    <p className="font-medium">Redefinir senha</p>
                    <p className="font-light">Digite seu email para redefinir a sua senha.</p>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Email</Label>
                            <Input type="email" />
                        </div>
                        <Button variant={"default"} className="w-full">
                            <p className="font-normal">Enviar</p>
                        </Button>
                        <Button onClick={navSignIn} variant={"ghost"} className="w-full p-0 hover:bg-transparent">
                            <p className="font-normal underline">Lembrei da minha senha</p>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}