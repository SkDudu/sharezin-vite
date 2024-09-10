import HeaderWithBack from "@/components/headerWithBack";
import { Input } from "@/components/ui/input";

export default function searchReceipts(){

    return(
        <div className="w-screen h-screen flex flex-col">
            <HeaderWithBack path={'/'} title={'Pesquisar pelo código'}/>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-normal text-sm">Para encontrar algum recibo de seus amigos, insira o código que um de seus amigos compartilhou com você!</p>
                <Input placeholder="Pesquisar" />
            </div>
        </div>
    )
}