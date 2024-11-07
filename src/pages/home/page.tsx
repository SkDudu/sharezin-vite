import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import PocketBase, { ListResult, RecordModel } from 'pocketbase'

import Header from "@/components/header"
import EmptyState from "@/components/emptyState"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Receipt } from "@phosphor-icons/react"

import imgUrl from '../../assets/nodata.svg'

export default function Home() {
    const navigate = useNavigate()
    const location = useLocation()
    const { data } = location.state || {}

    const [receipts, setReceipts] = useState<ListResult<RecordModel> | null>(null)
    const [closeReceipts, setCloseReceipts] = useState<ListResult<RecordModel> | null>(null)
    const [loading, setLoading] = useState(true)

    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    async function responseGetAllReceipts(){
        const response = await pb.collection('receipts').getList(1, 25, {
            filter: `ownerId = "${data.userId}"`
        })

        if(response != null){
            const receiptsOpens = {
                page: response.page,
                perPage: response.perPage,
                totalItems: response.totalItems,
                totalPages: response.totalPages,
                items: response.items.filter((receipt) => receipt.isClosed === false)
            }
            setReceipts(receiptsOpens)
            setLoading(false)
        }

        if (receipts != null) {
            const receiptsCloseds = {
                page: receipts.page,
                perPage: receipts.perPage,
                totalItems: receipts.totalItems,
                totalPages: receipts.totalPages,
                items: receipts.items.filter((receipt) => receipt.isClosed === true)
            }
            setCloseReceipts(receiptsCloseds)
            setLoading(false)
        } else {
            return null
        }
    }

    function createReceipt(){
        navigate('/createReceipt', {
            state: {
                data
            }
        })
    }

    useEffect(()=>{
        responseGetAllReceipts()
    },[])

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header />
            <Tabs defaultValue="meusRecibos">
                <TabsList className="w-full">
                    <TabsTrigger value="meusRecibos" className="w-full">Meus recibos</TabsTrigger>
                    <TabsTrigger value="RecibosFechados" className="w-full">Recibos fechados</TabsTrigger>
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
                ) : receipts == null ? (
                    <EmptyState path={imgUrl} title={'Sem recibos'} description={'Clique no botão de mais abaixo para adicionar um recibo.'}/>
                ) : (
                    receipts.items.map((receipt)=>(
                        <Link key={receipt.id} to={`/receiptDetails/${data.userId}`}>
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
                                        {receipt.ownerId === data.userId ? 
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
                ) : closeReceipts == null ? (
                    <EmptyState path={imgUrl} title={'Sem recibos'} description={'Clique no botão de mais abaixo para adicionar um recibo.'}/>
                ) : (
                    closeReceipts.items.map((receipt)=>(
                        <Link key={receipt.id} to={`/receiptDetails/${data.userId}`}>
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
                                        {receipt.ownerId === data.userId ? 
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
            </Tabs>
            <Button onClick={createReceipt} className="fixed bg-blue-950 top-[85%] left-[80%] rounded-full w-15 h-15 p-3">
                <Plus size={32}/>
            </Button>
        </div>
    )
}
