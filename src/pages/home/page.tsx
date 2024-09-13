import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Header from "@/components/header";
import EmptyState from "@/components/emptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Receipt } from "@phosphor-icons/react";

import { getReceiptsAll, ReceiptProps } from "@/routes/receipts";

import imgUrl from '../../assets/nodata.svg'

export default function Home() {
    const myUserId = "df4db3ff-2482-4fc0-b57b-311e849a0259"
    const [receipts, setReceipts] = useState<ReceiptProps[]>([])

    async function responseGetAllReceipts(){
        const response = await getReceiptsAll()

        //create error for empty receipts

        if(response != null){
            const responsefilterReceiptsForUserOwner = response.filter(receipt => receipt.userOwner === myUserId);
            const responsefilterReceiptsForIsClose = responsefilterReceiptsForUserOwner.filter(receipt => receipt.isClose === false)
            setReceipts(responsefilterReceiptsForIsClose)
        }else{
            toast.error('Response empty of receipts')
        }

        
    }

    useEffect(()=>{
        responseGetAllReceipts()
    },[])

    return (
        <div className="flex flex-col p-4 gap-2">
            <Header />
            <Tabs defaultValue="meusRecibos">
                <TabsList className="w-full">
                    <TabsTrigger value="meusRecibos" className="w-full">Meus recibos</TabsTrigger>
                    <TabsTrigger value="RecibosFechados" className="w-full">Recibos fechados</TabsTrigger>
                </TabsList>
                <TabsContent value="meusRecibos">
                    {receipts.length > 0 ? receipts.map((receipt: ReceiptProps) => (
                        <Link key={receipt.id} to={`/receiptDetails/${receipt.id}`}>
                            <Card className="mt-2">
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
                                    <div className="flex flex-row mt-2">
                                        {receipt.userOwner === myUserId ? 
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
                    : 
                    <EmptyState path={imgUrl} title={'Sem recibos'} description={'Clique no botão de mais abaixo para adicionar um recibo.'}/>
                    }
                </TabsContent>
                <TabsContent value="RecibosFechados">
                    {receipts.length < 0 ? receipts.map((receipt: ReceiptProps) => (
                        <Link to={`/receiptDetails/${receipt.id}`}>
                            <Card className="mt-2">
                                <CardHeader className="flex flex-row p-2 justify-between">
                                    <div className="flex flex-row justify-center items-center w-12 h-12 rounded-md bg-stone-100">
                                        <Receipt color="#6b7280" weight="fill" size={32} />
                                    </div>
                                    <Badge variant={"default"} className="h-6 bg-gray-300">Fechado</Badge>
                                </CardHeader>
                                <CardContent className="flex flex-col px-2 pb-2 gap-2">
                                    <p className="font-semibold">{receipt.title}</p>
                                    <p>{receipt.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    )) 
                    : 
                        <EmptyState path={imgUrl} title={'Sem recibos'} description={'Clique no botão de mais abaixo para adicionar um recibo.'}/>
                    }
                </TabsContent>
            </Tabs>
            <Link to='/createReceipt'>
                <Button className="absolute bg-blue-950 top-[85%] left-[80%] rounded-full w-15 h-15 p-3">
                    <Plus size={32}/>
                </Button>
            </Link>
        </div>
    )
}
