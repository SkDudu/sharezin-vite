import { Link } from "react-router-dom";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Copy } from "@phosphor-icons/react";

export default function shareReceipt(){

    return(
        <div className="w-screen h-screen flex flex-col">
            <HeaderWithBack path={'/'} title={'Compartilhar recibo'}/>
            <div className="flex flex-col h-full justify-between p-4">
                <div className="flex flex-col gap-2">
                    <p className="font-normal text-sm">Copie o código gerado e passe para o seu amigo!</p>
                    <div className="flex flex-col gap-4 justify-center items-center bg-stone-50 rounded p-4">
                        <p>Código de acesso para compartilhar</p>
                        <p className="font-bold text-2xl">ASDH123</p>
                        <Button variant={"default"} className="w-full bg-blue-950 text-white gap-1 hover:bg-blue-800">
                            <Copy color="#fff" weight="regular" size={18} />
                            Copiar
                        </Button>
                    </div>
                </div>
                <Link to={'/receiptDetails'}>
                    <Button variant={"secondary"} className="w-full mb-2">
                        Voltar
                    </Button>
                </Link>
            </div>
        </div>
    )
}