import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function resumeReceipt(){

    function exitReceipt(){
        toast.success('Conta encerrada com sucesso.')
    }

    return(
        <div className="flex flex-col w-screen h-screen">
            <HeaderWithBack path={'/receiptDetails/1'} title={'Resumo do seu recibo'}/>
            <div className="flex flex-col p-4 justify-between h-full">
                <div className="flex flex-col bg-stone-100 rounded p-2">
                    <p className="text-xl text-black font-semibold">Nome do recibo</p>
                    <p className="text-base text-black font-light">Restaurante: Nome do restaurante</p>
                    
                    <Separator orientation="horizontal" decorative className="bg-stone-300 my-2"/>

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-base text-black font-normal">Custo total</p>
                        <p className="text-2xl text-black font-semibold">R$ 240,43</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <p className="text-base text-stone-500 font-normal">Nome do produto</p>
                            <p className="text-base text-black font-normal">Valor</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Link to={'/receiptDetails/1'}>
                        <Button variant={"default"} onClick={exitReceipt} className="w-full bg-red-500 hover:bg-red-400">Encerrar recibo</Button>
                    </Link>
                    <Link to={'/receiptDetails/1'}>
                        <Button variant={"secondary"} className="w-full">Voltar</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}