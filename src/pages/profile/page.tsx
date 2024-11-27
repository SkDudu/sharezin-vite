import Dock from "@/components/dock.tsx"
import PocketBase from "pocketbase";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import { IdentificationCard, Gear } from "@phosphor-icons/react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

export default function profile(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const username = JSON.parse(localStorage.getItem("username") as string)
    const useremail = JSON.parse(localStorage.getItem("useremail") as string)

    async function logoff(){
        pb.authStore.clear()
        localStorage.clear()
        toast.success('Logout efetuado com sucesso.')
        navigate('/')
    }
    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <div className={"flex flex-col items-center w-full h-28 rounded bg-slate-50 py-4"}>
                <img src="" alt="Foto de perfil"  />
                <p className={"font-medium text-base"}>{username}</p>
                <p className={"font-light text-xs text-slate-500"}>{useremail}</p>
            </div>
            <div className={"flex flex-col gap-2 h-full"}>
                <Button className={"bg-slate-50 hover:bg-slate-50 text-black font-normal w-full justify-start gap-2"}>
                    <IdentificationCard size={22} weight={"regular"} color={"#172554"}/>
                    Meus dados
                </Button>
                <Button className={"bg-slate-50 hover:bg-slate-50 text-black font-normal w-full justify-start gap-2"}>
                    <Gear  size={22} weight={"regular"} color={"#172554"}/>
                    Configurações
                </Button>
            </div>
            <Dialog >
                <DialogTrigger>
                    <Button className={"w-full bg-red-700 hover:bg-red-700 mb-20"}>
                        Sair
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[70%] rounded">
                    <DialogHeader>
                        <DialogTitle className="flex justify-start">Sair da conta</DialogTitle>
                        <DialogDescription className="text-start">
                            Você deseja sair da sua conta?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row gap-2 w-full justify-between">
                        <DialogClose className={"w-full"}>
                            <Button variant={"secondary"} className="w-full">Não</Button>
                        </DialogClose>
                        <Button variant={"default"} onClick={logoff} className="w-full bg-red-700">Sim</Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dock screen={"profile"}/>
        </div>
    )
}