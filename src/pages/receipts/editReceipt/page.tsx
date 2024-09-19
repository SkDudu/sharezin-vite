import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { updateReceipt } from "@/routes/receipts";

export default function editReceitp(){
    const navigate = useNavigate();
    const location = useLocation()
    const { data } = location.state || {}

    const [form, setForm] = useState({
        title: '',
        description: '',
        restaurant_name: '',
        tax_service: 0,
        tax_cover: 0
    });

    console.log(data)

    async function actionEditReceipt(){
        try{
            const response = await updateReceipt(
                form.title,
                form.description,
                form.restaurant_name,
                form.tax_cover,
                form.tax_service
            )
            
            if(response != null){
                toast.success('Recibo editado com sucesso.')
                navigate(`/receitpDetails/${data.id}`)
            }
        }catch(error){
            toast.error('Erro ao criar esse recibo, tente novamente.')
            console.log(error)
        }
    }

    useEffect(() => {
        if(data){
            setForm(data)
        }
    }, [data])

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangeService = (event: any) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            const valuerNumber = parseFloat(value)
            setForm(prev => ({
                ...prev,
                tax_service: valuerNumber
            }));
        }
    }

    const handleChangeCover = (event: any) => {
        const { value } = event.target;
        if (/^\d*\.?\d*$/.test(value)) {
            const valuerNumber = parseFloat(value)
            setForm(prev => ({
                ...prev,
                tax_cover: valuerNumber
            }));
        }
    }

    return(
        <div className="gap-2">
            <HeaderWithBack path={"/"} title={'Editar recibo'}/>
            <div className="flex flex-col p-4 gap-4">
                <p className="font-normal text-base">Para editar o recibo compartilhado, troque as informações abaixo.</p>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="title">Título</Label>
                    <Input type="text" name="title" value={form.title} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="description">Descrição</Label>
                    <Input type="text" name="description" value={form.description} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="restaurant">Restaurante</Label>
                    <Input type="text" name="restaurant_name" value={form.restaurant_name} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="service">Taxa de serviço</Label>
                    <Input type="text" name="tax_service" value={form.tax_service} onChange={handleChangeService}/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="cover">Cover</Label>
                    <Input type="text" name="tax_cover" value={form.tax_cover} onChange={handleChangeCover}/>
                </div>
                <div className="flex flex-col gap-2">
                    <Dialog >
                        <DialogTrigger>
                            <Button variant={"default"} className="w-full bg-blue-950">Editar</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[70%] rounded">
                            <DialogHeader>
                            <DialogTitle className="flex justify-start">Editando recibo</DialogTitle>
                            <DialogDescription className="text-start">
                                Você deseja editar esse recibo?
                            </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-row gap-2 w-full justify-between">
                                <DialogClose className="w-full">
                                    <Button variant={"secondary"} className="w-full">Não</Button>
                                </DialogClose>
                                <Link to={'/receiptDetails/1'} className="w-full">
                                    <Button variant={"default"} onClick={actionEditReceipt} className="w-full">Sim</Button>
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
