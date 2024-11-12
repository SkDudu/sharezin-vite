import { useLocation } from "react-router-dom"

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function resumeReceipt(){
    const location = useLocation()
    const { data } = location.state || {}

    const historicsASC = data.historics.sort((a: any, b: any) => new Date(a.created).getTime() - new Date(b.created).getTime())

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
                        <p className="text-2xl text-black font-semibold">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(data.total)}</p>
                    </div>

                    <div className="flex flex-col">
                        {
                            historicsASC?.map((historic: any) => (
                                <div className="flex flex-row justify-between">
                                    <p className="text-base text-stone-500 font-normal">{historic.name}</p>
                                    <p className="text-base text-black font-normal">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(historic.cost)}</p>
                                </div>
                            ))
                        }

                        <Separator orientation="horizontal" decorative className="bg-stone-300 my-2"/>

                        <div className="flex flex-row justify-between">
                            <p className="text-base text-stone-500 font-normal">Cover</p>
                            <p className="text-base text-black font-normal">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(data.cover)}</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <p className="text-base text-stone-500 font-normal">Serviço</p>
                            <p className="text-base text-black font-normal">{data.service}%</p>
                        </div>
                        <div className="flex flex-row justify-between mt-2">
                            <p className="text-base text-stone-500 font-normal">Total</p>
                            <p className="text-lg text-black font-medium">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(data.total)}</p>
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