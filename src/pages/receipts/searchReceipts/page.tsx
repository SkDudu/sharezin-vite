import { useState } from "react"
import toast from "react-hot-toast"
import PocketBase, { RecordModel } from 'pocketbase'
import { useNavigate } from "react-router-dom"

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Receipt } from "@phosphor-icons/react"

export default function searchReceipts(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)
    const userId = JSON.parse(localStorage.getItem("userId") as string)

    const [codeField, setCodeField] = useState('')
    const [receipts, setReceipts] = useState<RecordModel[]>([])
    const [participants, setParticipants] = useState<RecordModel[]>([])
    const [loading, setLoading] = useState(false)
    const [AlredyParticipant, setAlredyParticipant] = useState(false)
    const [receiptId, setReceiptid] = useState()
    const [owner, setOwner] = useState()

    async function getReceiptByCode(){
        setLoading(true)
        const response = await pb.collection('receipts').getFirstListItem(`code_invitation="${codeField}"`,{
            expand: 'participants.user',
        })
        if(response != null && response.isClosed == false){
            setReceipts([response])
            setParticipants(response.participants)
            setReceiptid(response.id)
            setOwner(response.user)

            const filteredParticipants = response?.expand?.participants?.filter(
                participant => participant.expand?.user?.id === userId
            )
            if(filteredParticipants.length > 0){
                setAlredyParticipant(true)
            }else{
                setAlredyParticipant(false)
            }

            console.log(filteredParticipants)
        } else {
            toast.error('Não existe recibos com esse código, digite um código válido.')
            setLoading(false)
        }
        setLoading(false)
    }



    async function getInsideOfReceipt(){
        if(owner == userId){
            toast.error('Já sou dono desse recibo.')
        }else if(AlredyParticipant){
            toast.error('Já está participando deste recibo.')
        }else{
            const data={
                user: userId,
                totalCost: 0,
                receiptId: receiptId
            }
            const responseParticipant = await pb.collection('participants').create(data)

            if(responseParticipant != null){
                const currentParticipants = participants || []
                const updatedParticipants = [...currentParticipants, responseParticipant.id]
                const dataReceipt={
                    participants: updatedParticipants
                }
                await pb.collection('receipts').update(`${receiptId}`, dataReceipt)
                toast.success('Entrada no recibo feita com sucesso!')
                navigate(`/receiptDetails/${receiptId}`)
            }else{
                toast.error('Erro ao entrar no recibo, tente novamente.')
            }

        }
    }

    function handleCodeChange(event: any) {
        const { value } = event.target
        setCodeField(value)
    }

    return(
        <div className="w-screen h-screen flex flex-col">
            <HeaderWithBack path={'/home'} title={'Pesquisar pelo código'}/>
            <div className="flex flex-col gap-2 p-4">
                <p className="font-normal text-sm">Para encontrar algum recibo de seus amigos, insira o código que um de seus amigos compartilhou com você!</p>
                <Input placeholder="Código de convite" value={codeField} onChange={handleCodeChange}/>
                <Button variant={"default"} className="w-full" onClick={getReceiptByCode}>Pesquisar</Button>
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
                ) : (receipts?.map((receipt) => (
                    <Card key={receipt.id} className="mb-2" onClick={getInsideOfReceipt}>
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
                        </CardContent>
                    </Card>
                    ))
                )}
            </div>
        </div>
    )
}