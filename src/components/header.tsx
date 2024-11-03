import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { House, List, MagnifyingGlass, SignOut, X } from "@phosphor-icons/react";

import { logout } from "@/routes/user";

export default function Header() {
    const navigate = useNavigate()

    async function logoff(){
        try{
            const response = await logout()
            if(response == true){
                const [, , removeCookie] = useCookies(['accessToken'])
                removeCookie('accessToken', { path: '/' })
            }

            console.log(response)
        }catch(error){
            toast.error('Erro efetuar o logout, tente novamente.')
        }
        
    }

    return(
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
                <div className="w-12 h-12 rounded-full overflow-clip">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-light text-stone-600">Bem vindo!</p>
                    <p className="text-base font-semibold text-stone-950">Eduardo Santos</p>
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <Link to={'/searchReceipts'}>
                    <MagnifyingGlass size={24} />
                </Link>
                
                <Sheet>
                    <SheetTrigger>
                        <List size={24} />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="flex justify-start">
                                <div className="flex flex-row w-full justify-between items-center">
                                    Menu
                                    <SheetClose>
                                        <X size={24} />
                                    </SheetClose>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <SheetDescription className="flex flex-col gap-4">
                            <div>
                                <Button variant={"default"} onClick={()=>{navigate('/')}} className="w-full justify-start bg-white text-stone-950 gap-3 hover:bg-stone-100">
                                    <House color="#0c0a09" weight="regular" size={18} />
                                    Home
                                </Button>
                            </div>
                            <Button variant={"default"} onClick={logoff} className="w-full justify-start bg-red-500 text-stone-100 gap-3 hover:bg-red-600">
                                <SignOut size={18} weight="bold"/>
                                Sair
                            </Button>
                        </SheetDescription>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}