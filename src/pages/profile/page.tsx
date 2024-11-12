import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import PocketBase from "pocketbase";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export default function profile(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    async function logoff(){
        pb.authStore.clear()
        localStorage.clear()
        toast.success('Logout efetuado com sucesso.')
        navigate('/')
    }
    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header title={"Perfil"} />
            <p>Profile</p>
            <Button onClick={logoff} className={"bg-red-700"}>
                Sair
            </Button>
            <Dock />
        </div>
    )
}