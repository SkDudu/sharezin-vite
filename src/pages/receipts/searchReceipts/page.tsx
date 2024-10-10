import { useState } from "react";

import toast from "react-hot-toast";
import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getOneReceiptByCode, ReceiptProps } from "@/routes/receipts";

export default function searchReceipts(){
    const [codeField, setCodeField] = useState('');
    const [receipt, setReceipt] = useState<ReceiptProps[] | null>()

    async function getReceiptByCode(){
        const response = await getOneReceiptByCode(codeField)
        
        if(response != null){
            setReceipt(response)
            console.log(receipt)
        }else{
            toast.error('Não existe recibos com esse código.')
        }
    }

    function handleCodeChange(event: any) {
        const { value } = event.target;
        setCodeField(value);
    }

    return(
        <div className="w-screen h-screen flex flex-col">
            <HeaderWithBack path={'/'} title={'Pesquisar pelo código'}/>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-normal text-sm">Para encontrar algum recibo de seus amigos, insira o código que um de seus amigos compartilhou com você!</p>
                <Input placeholder="Código de convite" value={codeField} onChange={handleCodeChange}/>
                <Button variant={"default"} className="w-full" onClick={getReceiptByCode}>Pesquisar</Button>
            </div>
        </div>
    )
}