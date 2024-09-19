import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddCostToReceipt(){
    function addCost(){
        toast.success('Valor adicionado com sucesso.')
    }

    return(
        <div className="flex flex-col h-screen">

            <HeaderWithBack path={'/receiptDetails/1'} title={'Adicionar custo'}/>
            <div className="flex flex-col p-4 h-full justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col w-full h-min bg-blue-100 p-2 rounded-lg gap-4">
                        <div className="flex flex-col items-center">
                            <p className="text-base text-black font-light">Sua parte do recibo compartilhado</p>
                            <p className="text-4xl text-black font-semibold">R$ 34,32</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="cover">Nome do prato ou bebida</Label>
                        <Input type="text" className=""/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="cover">Custo</Label>
                        <Input type="text"/>
                    </div>
                </div>

                <div className="flex flex-col gap-3 pb-2">
                    <Link to={'/receiptDetails'}>
                        <Button variant={"default"} onClick={addCost} className="w-full">Adicionar custo</Button>
                    </Link>
                    <Link to={'/receiptDetails'}>
                        <Button variant={"secondary"} className="w-full">Cancelar</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}