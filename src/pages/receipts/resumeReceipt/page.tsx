import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { getOneReceipt, ReceiptProps } from "@/routes/receipts";
import { HistoricProps } from "@/routes/historics";

export default function resumeReceipt(){
    const location = useLocation()
    const { data } = location.state || {}
    const [loading, setLoading] = useState(true)
    const [receipt, setReceipt] = useState<ReceiptProps | null>()
    const [historics, setHistorics] = useState<HistoricProps[]>([])

    async function GetOneReceipt(){
        const response = await getOneReceipt(data.id as string)
        if(response != null){
            setReceipt(response)
            setHistorics(response.HistoricOfValuesInReceipts)
        }else{
            toast.error('Erro ao carregar as informações desse recibo, tente novamente.')
        }
        setLoading(false)
    }

    useEffect(()=>{
        GetOneReceipt()
    }, [data.id])

    return(
        <div className="flex flex-col w-screen h-screen">
            <HeaderWithBack path={`/receiptDetails/${data.id}`} title={'Resumo do seu recibo'}/>
            <div className="flex flex-col p-4 justify-between h-full">
                {loading ? (
                    <div className="flex flex-col bg-stone-100 rounded p-2">
                        <Skeleton className="w-[60px] h-[20px] rounded-full bg-gray-300 mb-2" />
                        <Skeleton className="w-[100px] h-[15px] rounded-full bg-gray-300" />
                        
                        <Separator orientation="horizontal" decorative className="bg-stone-300 my-2"/>

                        <div className="flex flex-col items-center gap-1">
                            <p className="text-base text-black font-normal">Custo total</p>
                            <Skeleton className="w-[80px] h-[25px] rounded-full bg-gray-300" />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <Skeleton className="w-[60px] h-[15px] rounded-full bg-gray-300" />
                                <Skeleton className="w-[60px] h-[15px] rounded-full bg-gray-300" />
                            </div>
                        </div>
                    </div>
                ) : receipt ? (
                    <div className="flex flex-col bg-stone-100 rounded p-2">
                        <p className="text-xl text-black font-semibold">{receipt?.title}</p>
                        <p className="text-base text-black font-light">Restaurante: {receipt?.restaurant_name}</p>
                        
                        <Separator orientation="horizontal" decorative className="bg-stone-300 my-2"/>

                        <div className="flex flex-col items-center gap-1">
                            <p className="text-base text-black font-normal">Custo total</p>
                            <p className="text-2xl text-black font-semibold">R$ 240,43</p>
                        </div>

                        <div className="flex flex-col">
                        {historics.map((historic) => (
                            <div key={historic.id} className="flex flex-row justify-between">
                                <p className="text-base text-stone-500 font-normal">{historic.nameProduct}</p>
                                <p className="text-base text-black font-normal">R$ {historic.valueProduct}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-red-500">Recibo não encontrado</div>
                )}
                <div className="flex flex-col gap-2">
                    <Button variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Encerrar recibo</Button>
                </div>
            </div>
        </div>
    )
}