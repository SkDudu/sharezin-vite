import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

import generateRandomCode from "@/lib/randomCodeGenerator";

import { createReceipt } from "@/routes/receipts";

export default function createReceitp(){
    const navigate = useNavigate();
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [restaurantField, setRestaurantField] = useState('');
    const [coverField, setCoverField] = useState<number>(0);
    const [serviceField, setServiceField] = useState<number>(0);

    const userOwner = 'c692360d-2716-428e-99fc-12f67045736c'
    const isClose = false

    async function actionCreateReceitp(){
        try{
            const response = await createReceipt(
                titleField,
                descriptionField,
                restaurantField,
                coverField,
                serviceField,
                code_invitation,
                userOwner,
                isClose
            )
            
            if(response != null){
                toast.success('Recibo criado com sucesso.')
                navigate('/')
            }
        }catch(error){
            toast.error('Erro ao criar esse recibo, tente novamente.')
            console.log(error)
        }
    }

    const code_invitation: string = generateRandomCode(8);

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
            <HeaderWithBack path={"/"} title={'Criar recibo'}/>
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
                                <Link to={''} className="w-full">
                                    <Button variant={"secondary"} className="w-full">Não</Button>
                                </Link>
                                <Link to={'/'} className="w-full">
                                    <Button variant={"default"} onClick={actionCreateReceitp} className="w-full">Criar</Button>
                                </Link>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Link to={'/'}>
                        <Button variant={"secondary"} className="w-full">Cancelar</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
