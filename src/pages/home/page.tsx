import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PocketBase, { ListResult, RecordModel } from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import EmptyState from "@/components/emptyState"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Receipt } from "@phosphor-icons/react"

import imgUrl from '../../assets/nodata.svg'

export default function Home() {
    const [receipts, setReceipts] = useState<ListResult<RecordModel> | null>(null)
    const [closeReceipts, setCloseReceipts] = useState<ListResult<RecordModel> | null>(null)
    const [loading, setLoading] = useState(true)

    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)

    async function responseGetAllReceipts(){
        const receiptsOpen = await pb.collection('receipts').getList(1, 25, {
            filter: `user = "${userId}" && isClosed = false`
        })

        const receiptsClosed = await pb.collection('receipts').getList(1, 25, {
            filter: `user = "${userId}" && isClosed = true`
        })

        if(receiptsOpen.items.length == 0){
            setReceipts(null)
            setLoading(false)
        }

        if(receiptsClosed.items.length == 0){
            setCloseReceipts(null)
            setLoading(false)
        }

        if(receiptsOpen.items && receiptsClosed.items != null){
            setReceipts(receiptsOpen)
            setCloseReceipts(receiptsClosed)
            setLoading(false)
        }
    }

    useEffect(()=>{
        responseGetAllReceipts()
    },[userId])

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header title={userId} isProfile={false}/>
            <Tabs defaultValue="meusRecibos">
                <TabsList className="w-full">
                    <TabsTrigger value="meusRecibos" className="w-full">Meus recibos</TabsTrigger>
                    <TabsTrigger value="RecibosFechados" className="w-full">Meus recibos fechados</TabsTrigger>
                </TabsList>
                <TabsContent value="meusRecibos">
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
                ) : receipts?.totalItems == 0 ? (
                    <EmptyState path={imgUrl} title={'Sem recibos abertos'} description={'Clique no botão de mais abaixo para adicionar um recibo.'}/>
                ) : (
                    receipts?.items.map((receipt)=>(
                        <Link key={receipt.id} to={`/receiptDetails/${receipt.id}`}>
                            <Card className="mb-2">
                                <CardHeader className="flex flex-row p-2 justify-between">
                                    <div className="flex flex-row justify-center items-center w-12 h-12 rounded-md bg-blue-100">
                                        <Receipt color="#3b82f6" weight="fill" size={32} />
                                    </div>
                                    {receipt.isClosed == false ? <Badge variant={"default"} className="h-6 bg-green-500">Aberta</Badge> : <Badge variant={"default"} className="h-6 bg-stone-500">Fechada</Badge>}
                                </CardHeader>
                                <CardContent className="flex flex-col px-2 pb-2 gap-2">
                                    <p className="font-semibold">{receipt.title}</p>
                                    <p>{receipt.description}</p>
                                    <p className="font-thin">Restaurante: {receipt.place}</p>
                                    <div className="flex flex-row mt-2">
                                        {receipt.user === userId ? 
                                            <Badge variant={"default"} className="bg-blue-500">
                                                <p className="text-blue-100">Dono</p>
                                            </Badge>
                                        :
                                            <Badge variant={"default"} className="bg-blue-100">
                                                <p className="text-blue-500">Convidado</p>
                                            </Badge> 
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
                </TabsContent>
                <TabsContent value="RecibosFechados">
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
                ) : closeReceipts?.totalItems == 0 ? (
                    <EmptyState path={imgUrl} title={'Sem recibos'} description={'Clique no botão de mais abaixo para adicionar um recibo.'}/>
                ) : (
                    closeReceipts?.items.map((receipt)=>(
                        <Link key={receipt.id} to={`/receiptDetails/${receipt.id}`}>
                            <Card className="mb-2">
                                <CardHeader className="flex flex-row p-2 justify-between">
                                    <div className="flex flex-row justify-center items-center w-12 h-12 rounded-md bg-slate-100">
                                        <Receipt color="#64748b" weight="fill" size={32} />
                                    </div>
                                    {receipt.isClosed == false ? <Badge variant={"default"} className="h-6 bg-green-500">Aberta</Badge> : <Badge variant={"default"} className="h-6 bg-stone-500">Fechada</Badge>}
                                </CardHeader>
                                <CardContent className="flex flex-col px-2 pb-2 gap-2">
                                    <p className="font-semibold">{receipt.title}</p>
                                    <p>{receipt.description}</p>
                                    <p className="font-thin">Restaurante: {receipt.place}</p>
                                    <Badge variant={"default"} className="bg-slate-300 max-w-[190px]">
                                        <p className="text-slate-500">Fechado em: {new Date(receipt.updated).toLocaleDateString('pt-BR')}, {new Date(receipt.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
                </TabsContent>
            </Tabs>
            <Dock screen={"home"}/>
        </div>
    )
}
