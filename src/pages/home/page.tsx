import { Link } from "react-router-dom";

import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Receipt } from "@phosphor-icons/react";

export default function Home() {
    return (
        <div className="flex flex-col p-4 gap-2">
            <Header />

            <Tabs defaultValue="meusRecibos">
                <TabsList className="w-full">
                    <TabsTrigger value="meusRecibos" className="w-full">Meus recibos</TabsTrigger>
                    <TabsTrigger value="convidado" className="w-full">Convidado</TabsTrigger>
                </TabsList>
                <TabsContent value="meusRecibos">
                    <Card className="mt-2">
                        <CardHeader className="flex flex-row p-2 justify-between">
                            <div className="flex flex-row justify-center items-center w-12 h-12 rounded-md bg-blue-100">
                                <Receipt color="#3b82f6" weight="fill" size={32} />
                            </div>
                            <Badge variant={"default"} className="h-6 bg-green-500">Aberta</Badge>
                        </CardHeader>
                        <CardContent className="flex flex-col px-2 pb-2 gap-2">
                            <p className="font-semibold">Nome do recibo em grupo</p>
                            <p>Descrição do recibo em grupo, pode ser festa, casamento, comemoração, despedida de solteiro... enfim</p>
                            <div className="flex flex-row mt-2">
                                <Badge variant={"default"} className="bg-blue-500">
                                    <p className="text-blue-100">Dono</p>
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="convidado">
                    <Card className="mt-2">
                        <CardHeader className="flex flex-row p-2 justify-between">
                            <div className="flex flex-row justify-center items-center w-12 h-12 rounded-md bg-blue-100">
                                <Receipt color="#3b82f6" weight="fill" size={32} />
                            </div>
                            <Badge variant={"default"} className="h-6 bg-green-500">Aberta</Badge>
                        </CardHeader>
                        <CardContent className="flex flex-col px-2 pb-2 gap-2">
                            <p className="font-semibold">Nome do recibo em grupo</p>
                            <p>Descrição do recibo em grupo, pode ser festa, casamento, comemoração, despedida de solteiro... enfim</p>
                            <div className="flex flex-row mt-2">
                                <Badge variant={"default"} className="bg-blue-100">
                                    <p className="text-blue-500">Convidado</p>
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <Link to='/createReceipt'>
                <Button className="absolute bg-blue-950 top-[90%] left-[85%] rounded-full w-15 h-15 p-3">
                    <Plus size={32}/>
                </Button>
            </Link>
        </div>
    )
}
