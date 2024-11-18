import { useEffect, useState } from "react"
import HeaderWithBack from "@/components/headerWithBack.tsx"
import {useParams} from "react-router-dom"
import toast from "react-hot-toast"
import PocketBase, {RecordModel} from "pocketbase"

import EmptyStateParticipants from "@/components/emptyStateParticipants"
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Button} from "@/components/ui/button.tsx";

import {UserMinus} from "@phosphor-icons/react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {format} from "date-fns"

export default function manageParticipants(){
    const {receiptIdParams} = useParams<{ receiptIdParams: string }>()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const [participants, setParticipants] = useState<RecordModel[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [participantId, setParticipantId] = useState()

    async function getParticipantsByReceiptId(){
        const resultList = await pb.collection('participants').getFullList({
            filter: `receiptId = "${receiptIdParams}"`,
            expand: 'user'
        })

        if (resultList == null || resultList.length === 0) {
            toast.error('Sem participantes.')
        } else {
            setParticipants(resultList)
            setLoading(false)
        }
    }

    const now = new Date()
    const currentDate = format(now, 'yyyy-MM-dd')
    const currentTime = format(now, 'HH:mm:ss')
    const datenow = `${currentDate} ${currentTime}`

    async function closedMyParticipant(){
        const data={
            isClosed: true,
            closedAt: datenow
        }

        const response = await pb.collection('participants').update(`${participantId}`, data)

        if(response){
            toast.success('Seu recibo foi fechado com sucesso.')
        }else{
            toast.error('Erro ao tentar fechar o seu recibo, tente novamente.')
        }
    }

    useEffect(()=>{
        getParticipantsByReceiptId()
    },[receiptIdParams])

    return(
        <>
            <HeaderWithBack path={`/receiptDetails/${receiptIdParams}`} title={"Gerenciar participantes"}/>
            <div className={"p-4"}>
                {
                    loading ? (
                        <Card className="mt-2">
                            <CardContent className="flex flex-row p-2 items-center justify-between">
                                <div className="flex flex-col p-2 justify-between gap-2">
                                    <Skeleton className="w-[60px] h-[20px] rounded-full" />
                                    <div className="flex flex-row items-center justify-between gap-2">
                                        <Skeleton className="w-[20px] h-[20px] rounded-full" />
                                        <Skeleton className="w-[60px] h-[10px] rounded-full" />
                                    </div>
                                </div>
                                <Skeleton className="w-[60px] h-[20px] rounded-full" />
                            </CardContent>
                        </Card>
                    ) : participants?.length === 0 ? (
                        <EmptyStateParticipants title={"Participantes"} description={"Nenhum participante adicionou um histórico."}/>
                    ) : (participants?.map((participant) => (
                        <div className="flex flex-row justify-between items-center w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                            <div className={"flex flex-col gap-1"}>
                                <p className="text-base text-black font-normal">{participant.expand.user.name}</p>
                                <p className="text-xs text-slate-500 font-normal">{new Date(participant.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                            </div>
                            <Dialog>
                                <DialogTrigger>
                                    <Button className={"bg-red-200 hover:bg-red-200"} onClick={()=>setParticipantId(participant.id)}>
                                        <UserMinus size={18} color={"#991b1b"}/>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[70%] rounded">
                                    <DialogHeader>
                                        <DialogTitle className="flex justify-start">Encerrar participação</DialogTitle>
                                        <DialogDescription className="text-start">
                                            Você deseja encerrar completamente a participação desse usuário no recibo?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-row gap-2 w-full justify-between">
                                        <DialogClose className="w-full">
                                            <Button variant={"secondary"} className="w-full">Não</Button>
                                        </DialogClose>
                                        <Button onClick={closedMyParticipant} variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Sim</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )))
                }
            </div>
        </>
    )
}