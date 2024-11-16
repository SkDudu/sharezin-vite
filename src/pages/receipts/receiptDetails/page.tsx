import {replace, useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import PocketBase, { RecordModel } from 'pocketbase'
import {format} from "date-fns";

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    Clock,
    DotsThreeVertical,
    MicrophoneStage,
    PencilSimple,
    Percent,
    Plus,
    Receipt,
    ShareNetwork, UserGear,
    UsersThree,
    X,
} from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import EmptyStateParticipants from "@/components/emptyStateParticipants"

export default function ReceiptDetails(){
    const navigate = useNavigate()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)
    const {receiptIdParams} = useParams<{ receiptIdParams: string }>()
    const userId = JSON.parse(localStorage.getItem("userId") as string)

    const [receipt, setReceipt] = useState<RecordModel | null>()
    const [historics, setHistorics] = useState<RecordModel[] | null>(null)
    const [participant, setParticipant] = useState<RecordModel[] | null>()
    const [loading, setLoading] = useState(true)
    const [cancelReceipt, setCancelReceipt] = useState(false)
    const [valueTotal, setValueTotal] = useState(0)

    const [isClosedParticipant, setIsClosedParticipant] = useState(false)

    async function responseGetOneReceipt(){
        const response = await pb.collection('receipts').getOne(`${receiptIdParams}`, {
            expand: 'user, participants, costs'
        })

        if(response.participants != null){
            const matchingParticipant = response.expand?.participants.find(
                (participant) => participant.user === userId
            )
            setParticipant(matchingParticipant)
            setIsClosedParticipant(matchingParticipant.isClosed)
        }else{
            setParticipant(null)
        }

        if (response.expand?.costs && Array.isArray(response.expand?.costs)) {
            const costsFrom = response.expand.costs
                .map((cost) => ({
                    ...cost,
                    created: new Date(cost.created),
                }))
                .sort((a, b) => a.created.getTime() - b.created.getTime())
            setHistorics(costsFrom)

            const totalCost = costsFrom.reduce((sum, item) => {
                return sum + parseFloat(item.cost || 0)
            }, 0)
            setValueTotal(totalCost)
        } else {
            setHistorics(null)
        }

        if(response != null){
            setReceipt(response)
        }else{
            toast.error('Esse recibo não existe.')
        }

        if(response != null){
            setLoading(false)
            if(response.user == userId){
                setCancelReceipt(true)
            }
        }else{
            toast.error('Sem histótico.')
        }
    }

    console.log('Page details', historics)

    const now = new Date()
    const currentDate = format(now, 'yyyy-MM-dd')
    const currentTime = format(now, 'HH:mm:ss')
    const datenow = `${currentDate} ${currentTime}`

    async function closedMyParticipant(){

        const data={
            isClosed: true
        }

        const response = await pb.collection('participants').update(`${participant?.user}`, data)

        if(response){
            navigate(`/receiptDetails/${receiptIdParams}`)
            toast.success('Seu recibo foi fechado com sucesso.')
        }else{
            toast.error('Erro ao tentar fechar o seu recibo, tente novamente.')
        }
    }

    const myValue = participant?.totalCost + ((receipt?.tax_service / 100) * valueTotal) + receipt?.tax_cover
    const myValueReceipt = valueTotal + ((receipt?.tax_service / 100) * valueTotal) + receipt?.tax_cover

    async function closedMyRecipt(){
        const data={
            isClosed: true,
            closedAt: datenow
        }
        const responseReceipt = await pb.collection('receipts').update(`${receiptIdParams}`, data)

        if(responseReceipt){
            replace(`/receiptDetails/${receiptIdParams}`)
            toast.success('Recibo fechado com sucesso.')
        }else{
            toast.error('Erro ao tentar fechar o recibo, tente novamente.')
        }
    }

    function navigateToManageParticipants(){
        navigate(`/receiptDetails/managementParticipants/${receiptIdParams}`)
    }

    function navigateToEditReceipt(){
        navigate('/editReceipt', {
            state: {
                data: {
                    id: receipt?.id,
                    title: receipt?.title,
                    description: receipt?.description,
                    place: receipt?.place,
                    tax_service: Number(receipt?.tax_service),
                    tax_cover: Number(receipt?.tax_cover)
                }
            }
        })
    }

    function navigateToShareReceipt(){
        navigate('/shareReceipt', {
            state: {
                data: {
                    id: receipt?.id,
                    code: receipt?.code_invitation
                }
            }
        })
    }

    function navigateToAddCostInReceipt(){
        const costsIds = historics?.map(item => item.id)
        navigate('/addValueInReceipt', {
            state: {
                data: {
                    receiptId: receiptIdParams,
                    participantId: participant?.id,
                    TotalCost: participant?.totalCost,
                    historics: costsIds
                }
            }
        })
    }

    function navigateToResumeReceipt(){
        navigate('/resumeReceipt', {
            state: {
                data: {
                    id: receipt?.id,
                    title: receipt?.title,
                    place: receipt?.place,
                    cover: receipt?.tax_cover,
                    service: receipt?.tax_service,
                    total: myValueReceipt,
                    historics: historics
                }
            }
        })
    }

    useEffect(()=>{
        responseGetOneReceipt()
    },[receiptIdParams])

    return(
        <>
            <HeaderWithBack path={'/home'} title={'Detalhes do recibo'} />
            <div className="flex flex-col pt-4 pl-4 pr-4 gap-4">
                <div className="flex flex-col w-full h-min bg-blue-100 p-2 rounded-lg gap-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-col">
                            {loading ? (
                                <Skeleton className="w-[60px] h-[25px] rounded-full mb-2" />
                            ) : (
                                <p className="text-xl text-black font-semibold">{receipt?.title}</p>
                            )}
                            {loading ? (
                                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                            ) : (
                                <p className="text-base text-black font-light">Responsável: {receipt?.expand?.user.name}</p>
                            )}
                        </div>
                        <Sheet>
                            <SheetTrigger>
                                {isClosedParticipant == false && receipt?.isClosed == false ? (
                                    <Button className="w-10 h-10 p-0 bg-blue-100 rounded-full hover:bg-blue-100">
                                        <DotsThreeVertical size={24} color="#172554"/>
                                    </Button>
                                ):(
                                    <></>
                                )}
                            </SheetTrigger>
                            <SheetContent side={"bottom"} className="rounded-t-md">
                                <SheetHeader className="flex items-start">
                                    <SheetTitle>Opções</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col mt-2 gap-2">
                                    {receipt?.user != userId ?
                                        <Button variant={"default"} onClick={()=>{}} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                            <UsersThree color="#0c0a09" weight="regular" size={18} />
                                            Visualizar participantes
                                        </Button>
                                        :
                                        <></>
                                    }
                                    {receipt?.user == userId ?
                                        <Button variant={"default"} onClick={navigateToManageParticipants} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                            <UserGear color="#0c0a09" weight="regular" size={18} />
                                            Gerenciar participantes
                                        </Button>
                                        :
                                        <></>
                                    }
                                    {receipt?.user == userId ?
                                        <Button variant={"default"} onClick={navigateToEditReceipt} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                            <PencilSimple color="#0c0a09" weight="regular" size={18} />
                                            Editar informações do recibo
                                        </Button>
                                    :
                                        <></>
                                    }
                                    {receipt?.user == userId ?
                                        <Button variant={"default"} onClick={navigateToShareReceipt} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                            <ShareNetwork color="#0c0a09" weight="regular" size={18} />
                                            Compartilhar recibo
                                        </Button>
                                        :
                                        <></>
                                    }
                                    <Button variant={"default"} onClick={navigateToResumeReceipt} className="w-full justify-start bg-white text-stone-950 gap-1 hover:bg-stone-100">
                                        <Receipt color="#0c0a09" weight="regular" size={18} />
                                        Resumo da seu recibo
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button variant={"default"} className="w-full justify-start bg-white text-red-500 gap-1 hover:bg-stone-100">
                                                <X color="#ef4444" weight="regular" size={18} />
                                                Encerrar sua parte do recibo compartilhado
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
                                                <Button onClick={closedMyParticipant} variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Encerrar</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    {cancelReceipt ? (
                                        <Dialog>
                                        <DialogTrigger>
                                            <Button variant={"default"} className="w-full justify-start bg-white text-red-500 gap-1 hover:bg-stone-100">
                                                <X color="#ef4444" weight="regular" size={18} />
                                                Fechar todo o recibo compartilhado
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-[70%] rounded">
                                            <DialogHeader>
                                            <DialogTitle className="flex justify-start">Encerrar seu recibo?</DialogTitle>
                                            <DialogDescription className="text-start">
                                                Você deseja encerrar completamente o recibo?
                                            </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-row gap-2 w-full justify-between">
                                                <DialogClose className="w-full">
                                                    <Button variant={"secondary"} className="w-full">Não</Button>
                                                </DialogClose>
                                                <Button onClick={closedMyRecipt} variant={"default"} className="w-full bg-red-500 hover:bg-red-400">Encerrar</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    ):(<></>)}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="flex flex-col items-center mb-2">
                        <p className="text-base text-black font-light">Seu consumo total</p>
                        {loading ? (
                            <Skeleton className="w-[100px] h-[40px] rounded-full" />
                        ) : (
                            <p className="text-4xl text-black font-semibold">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(myValue)}</p>
                        )}
                    </div>

                    {!isClosedParticipant && receipt?.isClosed == false ? (
                        <Button onClick={navigateToAddCostInReceipt}>
                            <Plus size={18} weight="bold"/>
                            <p className="text-base text-white font-light pl-2">Adicionar valor</p>
                        </Button>
                    ):(
                        <></>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xl text-black font-semibold">Informações gerais do recibo</p>
                    <div className="flex flex-col w-full h-min bg-stone-50 p-2 rounded-lg gap-1 items-center border">
                        <p className="text-base text-black font-light">Custo total do recibo compartilhado</p>
                        {loading ? (
                            <Skeleton className="w-[100px] h-[40px] rounded-full" />
                        ) : (
                            <p className="text-4xl text-black font-medium">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(myValueReceipt)}</p>
                        )}
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                            <div className="flex flex-row items-center gap-1">
                                <Percent />
                                <p className="text-base text-black font-light">Taxa do garçom</p>
                            </div>
                            {loading ? (
                                <Skeleton className="w-[100px] h-[26px] rounded-full" />
                            ) : (
                                <p className="text-xl text-black font-medium">{receipt?.tax_service}%</p>
                            )}
                        </div>
                        <div className="flex flex-col w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                            <div className="flex flex-row items-center gap-1">
                                <MicrophoneStage />
                                <p className="text-base text-black font-light">Taxa do cover</p>
                            </div>
                            {loading ? (
                                <Skeleton className="w-[100px] h-[26px] rounded-full" />
                            ) : (
                                <p className="text-xl text-black font-medium">R$ {receipt?.tax_cover},00</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <p className="text-xl text-black font-semibold">Histórico</p>
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
                        ) : historics?.length == null ? (
                            <EmptyStateParticipants title={"Participantes"} description={"Nenhum participante adicionou um histórico."}/>
                        ) : (historics?.map((historic) => (
                            <div className="flex flex-row justify-between items-center w-full h-min bg-stone-50 p-2 rounded-lg gap-1 border">
                                <div className="flex flex-col gap-1">
                                    <p className="text-base text-black font-normal">{historic.name}</p>
                                    <div className="flex flex-row items-center gap-1">
                                        <Clock />
                                        <p className="text-base text-black font-light">{new Date(historic.created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg text-black font-semibold">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(historic.cost)}</p>
                            </div>
                        )))
                    }
                </div>
            </div>
        </>
    )
}