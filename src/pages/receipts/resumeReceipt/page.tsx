import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function resumeReceipt(){
    const location = useLocation()
    const { data } = location.state || {}
    //const [loading, setLoading] = useState(false)
    //const [receipt, setReceipt] = useState<ReceiptProps | null>()
    //const [historics, setHistorics] = useState<HistoricProps[]>([])

    async function GetOneReceipt(){
        
    }

    useEffect(()=>{
        GetOneReceipt()
    }, [])

    return(
        <div className="flex flex-col w-screen h-screen">
            <HeaderWithBack path={`/receiptDetails/${data.id}`} title={'Resumo do seu recibo'}/>
            <div className="flex flex-col p-4 justify-between h-full">
                <div className="flex flex-col bg-stone-100 rounded p-2">
                    <p className="text-xl text-black font-semibold">{data?.title}</p>
                    <p className="text-base text-black font-light">Restaurante: {data?.place}</p>
                    
                    <Separator orientation="horizontal" decorative className="bg-stone-300 my-2"/>

                    <div className="flex flex-col items-center gap-1">
                        <p className="text-base text-black font-normal">Custo total</p>
                        <p className="text-2xl text-black font-semibold">R$ 240,43</p>
                    </div>

                    <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="text-base text-stone-500 font-normal">productName</p>
                        <p className="text-base text-black font-normal">value</p>
                    </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Encerrar recibo</Button>
                </div>
            </div>
        </div>
    )
}