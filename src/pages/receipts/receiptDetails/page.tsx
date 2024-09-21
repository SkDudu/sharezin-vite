import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Clock, DotsThreeVertical, MicrophoneStage, PencilSimple, Percent, Plus, Receipt, ShareNetwork, X } from "@phosphor-icons/react";

import { getOneReceipt, ReceiptProps } from "@/routes/receipts";

export default function ReceiptDetails(){
    const navigate = useNavigate()
    const {receiptIdParams} = useParams<{ receiptIdParams: string }>()

    const [receipt, setReceipt] = useState<ReceiptProps | null>()

    async function responseGetOneReceipt(){
        const response = await getOneReceipt(receiptIdParams as string)

        if(response != null){
            setReceipt(response)
        }else{
            toast.error('Esse recibo não existe.')
        }
    }

    function navigateToEditReceipt(){
        navigate('/editReceipt', {
            state: {
                data: {
                    id: receipt?.id,
                    title: receipt?.title,
                    description: receipt?.description,
                    restaurant_name: receipt?.restaurant_name,
                    tax_service: Number(receipt?.tax_service),
                    tax_cover: Number(receipt?.tax_cover)
                }
            }
        })
    }

    function navigateToAddCostInReceipt(){
        navigate('/addValueInReceipt', {
            state: {
                data: {
                    userId: 'c692360d-2716-428e-99fc-12f67045736c',
                    receiptId: receiptIdParams
                }
            }
        })
    }

    useEffect(()=>{
        responseGetOneReceipt()
    },[receiptIdParams])

    return(
        <>
            <HeaderWithBack path={'/'} title={'Detalhes do recibo'} />
            <div className="flex flex-col pt-4 pl-4 pr-4 gap-4">
                <div className="flex flex-col w-full h-min bg-blue-100 p-2 rounded-lg gap-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-xl text-black font-semibold">{receipt?.title}</p>
                            <p className="text-base text-black font-light">Responsável: {receipt?.users.name}</p>
                        </div>
                        <Sheet>
                            <SheetTrigger>
                                <Button className="w-10 h-10 p-0 bg-blue-100 rounded-full hover:bg-blue-100">
                                    <DotsThreeVertical size={24} color="#172554"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={"bottom"} className="rounded-t-md">
                                <SheetHeader className="flex items-start">
                                    <SheetTitle>Opções</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col mt-2 gap-2">
                                    <Button variant={"default"} onClick={navigateToEditReceipt} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                        <PencilSimple color="#0c0a09" weight="regular" size={18} />
                                        Editar informações do recibo
                                    </Button>
                                    <Link to={'/shareReceipt'}>
                                        <Button variant={"default"} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                            <ShareNetwork color="#0c0a09" weight="regular" size={18} />
                                            Compartilhar recibo
                                        </Button>
                                    </Link>
                                    <Link to={'/resumeReceipt'}>
                                        <Button variant={"default"} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                            <Receipt color="#0c0a09" weight="regular" size={18} />
                                            Resumo da seu recibo
                                        </Button>
                                    </Link>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant={"default"} className="w-full justify-start bg-white text-red-500 gap-1 hover:bg-stone-100">
                                                <X color="#ef4444" weight="regular" size={18} />
                                                Encerrar seu recibo compartilhado
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-[70%] rounded">
                                            <DialogHeader>
                                            <DialogTitle className="flex justify-start">Encerrar seu recibo?</DialogTitle>
                                            <DialogDescription className="text-start">
                                                Você deseja encerrar sua participação nesse recibo? Você não poderá retornar a ele.
                                            </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-row gap-2 w-full justify-between">
                                                <DialogClose className="w-full">
                                                    <Button variant={"secondary"} className="w-full">Não</Button>
                                                </DialogClose>
                                                <Link to={'/'} className="w-full">
                                                    <Button variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Encerrar</Button>
                                                </Link>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant={"default"} className="w-full justify-start bg-white text-red-500 gap-1 hover:bg-stone-100">
                                                <X color="#ef4444" weight="regular" size={18} />
                                                Encerrar recibo compartilhado
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-[70%] rounded">
                                            <DialogHeader>
                                            <DialogTitle className="flex justify-start">Encerrar seu recibo?</DialogTitle>
                                            <DialogDescription className="text-start">
                                                Você deseja encerrar sua participação nesse recibo? Você não poderá retornar a ele.
                                            </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-row gap-2 w-full justify-between">
                                                <DialogClose className="w-full">
                                                    <Button variant={"secondary"} className="w-full">Não</Button>
                                                </DialogClose>
                                                <Link to={'/'} className="w-full">
                                                    <Button variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Encerrar</Button>
                                                </Link>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-base text-black font-light">Seu consumo total</p>
                        <p className="text-4xl text-black font-semibold">R$ 34,32</p>
                    </div>

                    <Button onClick={navigateToAddCostInReceipt}>
                        <Plus size={18} weight="bold"/>
                        <p className="text-base text-white font-light pl-2">Adicionar valor</p>
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xl text-black font-semibold">Informações gerais do recibo</p>
                    <div className="flex flex-col w-full h-min bg-stone-50 p-2 rounded-lg gap-1 items-center border">
                        <p className="text-base text-black font-light">Custo total do recibo compartilhado</p>
                        <p className="text-4xl text-black font-medium">R$ 34,32</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                            <div className="flex flex-row items-center gap-1">
                                <Percent />
                                <p className="text-base text-black font-light">Taxa do garçom</p>
                            </div>
                            <p className="text-xl text-black font-medium">{receipt?.tax_service}%</p>
                        </div>
                        <div className="flex flex-col w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                            <div className="flex flex-row items-center gap-1">
                                <MicrophoneStage />
                                <p className="text-base text-black font-light">Taxa do cover</p>
                            </div>
                            <p className="text-xl text-black font-medium">R$ {receipt?.tax_cover},00</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xl text-black font-semibold">Histórico</p>
                    <div className="flex flex-row justify-between items-center w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                        <div className="flex flex-col gap-1">
                            <p className="text-base text-black font-normal">Barbara</p>
                            <div className="flex flex-row items-center gap-1">
                                <Clock />
                                <p className="text-base text-black font-light">21:32</p>
                            </div>
                        </div>
                        <p className="text-lg text-black font-semibold">R$ 34,36</p>
                    </div>
                </div>
            </div>
        </>
    )
}