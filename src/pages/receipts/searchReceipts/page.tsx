import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Receipt } from "@phosphor-icons/react";

import { getOneReceiptByCode, ReceiptProps } from "@/routes/receipts";

export default function searchReceipts(){
    const [codeField, setCodeField] = useState('');
    const [receipts, setReceipts] = useState<ReceiptProps[] | undefined>([])
    const [loading, setLoading] = useState(false)

    async function getReceiptByCode(){
        setLoading(true);
        const response = await getOneReceiptByCode(codeField)

        if(response != null){
            setReceipts([response])
        } else {
            toast.error('Não existe recibos com esse código, digite um código válido.');
            setReceipts(undefined)
        }
        setLoading(false)
    }

    function handleCodeChange(event: any) {
        const { value } = event.target;
        setCodeField(value);
    }

    return(
        <div className="w-screen h-screen flex flex-col">
            <HeaderWithBack path={'/home'} title={'Pesquisar pelo código'}/>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-normal text-sm">Para encontrar algum recibo de seus amigos, insira o código que um de seus amigos compartilhou com você!</p>
                <Input placeholder="Código de convite" value={codeField} onChange={handleCodeChange}/>
                <Button variant={"default"} className="w-full" onClick={getReceiptByCode}>Pesquisar</Button>
                {loading ? (
                    <Card className="mt-2">
                        <CardHeader className="flex flex-row p-2 justify-between">
                            <Skeleton className="w-12 h-12 rounded-md" />
                            <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        </CardHeader>
                        <CardContent className="flex flex-col px-2 pb-2 gap-2">
                            <Skeleton className="w-[130px] h-[20px] rounded-full" />
                            <Skeleton className="w-[250px] h-[10px] rounded-full" />
                            <Skeleton className="w-[100px] h-[10px] rounded-full" />
                            <div className="flex flex-row mt-2">
                                <Skeleton className="w-[60px] h-[20px] rounded-full" />
                            </div>
                        </CardContent>
                    </Card>
                ) : (receipts?.map((receipt: ReceiptProps) => (
                        <Link key={receipt.id} to={`/receiptDetails/${receipt.id}`}>
                            <Card className="mb-2">
                                <CardHeader className="flex flex-row p-2 justify-between">
                                    <div className="flex flex-row justify-center items-center w-12 h-12 rounded-md bg-blue-100">
                                        <Receipt color="#3b82f6" weight="fill" size={32} />
                                    </div>
                                    {receipt.isClose == false ? <Badge variant={"default"} className="h-6 bg-green-500">Aberta</Badge> : <Badge variant={"default"} className="h-6 bg-stone-500">Fechada</Badge>}
                                </CardHeader>
                                <CardContent className="flex flex-col px-2 pb-2 gap-2">
                                    <p className="font-semibold">{receipt.title}</p>
                                    <p>{receipt.description}</p>
                                    <p className="font-thin">Restaurante: {receipt.restaurant_name}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}