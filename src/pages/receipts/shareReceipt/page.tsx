import { useLocation } from "react-router-dom";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Copy } from "@phosphor-icons/react";

export default function shareReceipt(){
    const location = useLocation()
    const { data } = location.state || {}

    return(
        <div className="w-screen h-screen flex flex-col">
            <HeaderWithBack path={`/receiptDetails/${data.id}`} title={'Compartilhar recibo'}/>
            <div className="flex flex-col h-full justify-between p-4">
                <div className="flex flex-col gap-2">
                    <p className="font-normal text-sm">Copie o código gerado e passe para o seu amigo!</p>
                    <div className="flex flex-col gap-4 justify-center items-center bg-stone-50 rounded p-4">
                        <p>Código de acesso para compartilhar</p>
                        <p className="font-bold text-2xl">{data.code}</p>
                        <Button variant={"default"} className="w-full bg-blue-950 text-white gap-1 hover:bg-blue-800">
                            <Copy color="#fff" weight="regular" size={18} />
                            Copiar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}