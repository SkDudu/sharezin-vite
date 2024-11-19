import React from "react"
import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import PocketBase from 'pocketbase'

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Calendar} from "@/components/ui/calendar.tsx"
import {LoadingButton} from "@/components/button.tsx"

import generateRandomCode from "@/lib/randomCodeGenerator"
import { addDays, format } from "date-fns"

export default function createEvents(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()

    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)

    const [titleField, setTitleField] = useState('')
    const [descriptionField, setDescriptionField] = useState('')
    const [restaurantField, setRestaurantField] = useState('')
    const [coverField, setCoverField] = useState<number>(0)
    const [serviceField, setServiceField] = useState<number>(0)
    const [date, setDate] = React.useState<Date>()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const title = titleField
    const description = descriptionField
    const place = restaurantField
    const tax_cover = coverField
    const tax_service = serviceField
    const code_invitation: string = generateRandomCode(8)
    const user = userId as string
    const eventTo = date

    const dataReceipt = {
        title, description, place, tax_cover, tax_service, code_invitation, user, eventTo
    }

    async function actionCreateEvent(){
        if (!titleField || !descriptionField || !restaurantField || coverField === 0 || serviceField === 0) {
            toast.error('Por favor, preencha todos os campos obrigatórios.')
            return
        }

        setLoading(true)

        try{
            const response = await pb.collection('receipts').create(dataReceipt)
            
            if(response != null){
                const data={
                    user: userId,
                    totalCost: 0,
                    receiptId: response.id
                }
                const responseParticipant = await pb.collection('participants').create(data)
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

    function selectDate(){
        setOpen(false)
    }

    function selectDateSelect(){
        setOpenSelect(false)
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

    // @ts-ignore
    return(
        <div className="gap-2">
            <HeaderWithBack path={"/home"} title={'Criar evento'}/>
            <div className="flex flex-col p-4 gap-4">
                <p className="font-normal text-base">Para criar um evento compartilhado, insira as informações
                    abaixo.</p>
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
                <div className="flex flex-col gap-1">
                    <Label htmlFor="cover">Data do evento</Label>
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger>
                            <Button variant={"outline"} className={'w-full justify-start gap-2'}>
                                {date ? format(date, "PPP") : <span>Selecione</span>}
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader className={"justify-items-start"}>
                                <DrawerTitle>Data do evento</DrawerTitle>
                                <DrawerDescription className={"text-start"}>Escolha a data do evento abaixo.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter className={"mb-8"}>
                                <Select
                                    onValueChange={(value) =>
                                        setDate(addDays(new Date(), parseInt(value)))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="0">Hoje</SelectItem>
                                        <SelectItem value="1">Amanhã</SelectItem>
                                        <SelectItem value="3">Em 3 dias</SelectItem>
                                        <SelectItem value="7">Em 1 semana</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                                <DrawerClose>
                                    <Button className={"w-full mt-2"}>
                                        Confirmar data
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
                <div className="flex flex-col gap-2">
                    <Dialog>
                        <DialogTrigger>
                            <Button variant={"default"} className="w-full bg-blue-950">Criar</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[70%] rounded">
                            <DialogHeader>
                                <DialogTitle className="flex justify-start">Criando evento</DialogTitle>
                                <DialogDescription className="text-start">
                                    Você deseja criar esse evento? Depois você pode adicionar participantes no recibo.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-row gap-2 w-full justify-between">
                                <Button variant={"secondary"} className="w-full">Não</Button>
                                <LoadingButton onClick={actionCreateEvent} variant={"default"} loading={loading}
                                               className="w-full">
                                    Criar
                                </LoadingButton>
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
