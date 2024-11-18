import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import PocketBase from 'pocketbase'

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import generateRandomCode from "@/lib/randomCodeGenerator"

export default function createReceitp(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()

    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)

    const [titleField, setTitleField] = useState('')
    const [descriptionField, setDescriptionField] = useState('')
    const [restaurantField, setRestaurantField] = useState('')
    const [coverField, setCoverField] = useState<number>(0)
    const [serviceField, setServiceField] = useState<number>(0)

    const title = titleField
    const description = descriptionField
    const place = restaurantField
    const tax_cover = coverField
    const tax_service = serviceField
    const code_invitation: string = generateRandomCode(8)
    const user = userId as string

    const dataReceipt = {
        title, description, place, tax_cover, tax_service, code_invitation, user
    }

    async function actionCreateReceitp(){
        try{
            const response = await pb.collection('receipts').create(dataReceipt)
            
            if(response != null){
                const data={
                    user: userId,
                    totalCost: 0,
                    receiptId: response.id
                }
                const responseParticipant = await pb.collection('participants').create(data)
                console.log(responseParticipant)
                if(responseParticipant != null){
                    const dataParticipant = {
                        participants: [
                            responseParticipant.id
                        ],
                    }
                    await pb.collection('receipts').update(`${response.id}`, dataParticipant)
                }
                toast.success('Recibo criado com sucesso.')
                navigate('/home')
            }
        }catch(error){
            toast.error('Erro ao criar esse recibo, tente novamente.')
            console.log(error)
        }
    }

    function handleTitleChange(event: any) {
        const { value } = event.target;
        setTitleField(value);
    }

    function handleDescriptionChange(event: any) {
        const { value } = event.target;
        setDescriptionField(value);
    }

    function handleRestaurantChange(event: any) {
        const { value } = event.target;
        setRestaurantField(value);
    }


    function handlecoverChange(event: any) {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            const valuerNumber = parseFloat(value)
            setCoverField(valuerNumber);
        }
    }

    function handleserviceChange(event: any) {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            const valuerNumber = parseFloat(value)
            setServiceField(valuerNumber);
        }
    }

    return(
        <div className="gap-2">
            <HeaderWithBack path={"/home"} title={'Criar recibo'}/>
            <div className="flex flex-col p-4 gap-4">
                <p className="font-normal text-base">Para criar o recibo compartilhado, insira as informações abaixo.</p>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="title">Título</Label>
                    <Input type="text" value={titleField} onChange={handleTitleChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="description">Descrição</Label>
                    <Input type="text" value={descriptionField} onChange={handleDescriptionChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="restaurant">Local</Label>
                    <Input type="text" value={restaurantField} onChange={handleRestaurantChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="service">Taxa de serviço</Label>
                    <Input type="text" value={serviceField} onChange={handleserviceChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="cover">Cover</Label>
                    <Input type="text" value={coverField} onChange={handlecoverChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Dialog >
                        <DialogTrigger>
                            <Button variant={"default"} className="w-full bg-blue-950">Criar</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[70%] rounded">
                            <DialogHeader>
                            <DialogTitle className="flex justify-start">Criando recibo</DialogTitle>
                            <DialogDescription className="text-start">
                                Você deseja criar esse recibo? Depois você pode adicionar participantes no recibo.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-row gap-2 w-full justify-between">
                                <Button variant={"secondary"} className="w-full">Não</Button>
                                <Button variant={"default"} onClick={actionCreateReceitp} className="w-full">Criar</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Link to={'/home'}>
                        <Button variant={"secondary"} className="w-full">Cancelar</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
