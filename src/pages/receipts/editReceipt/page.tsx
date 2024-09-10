import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function editReceitp(){
    function editConfirm(){
        toast.success('Recibo editado com sucesso.')
    }

    return(
        <div className="gap-2">
            <HeaderWithBack path={"/"} title={'Editar recibo'}/>
            <div className="flex flex-col p-4 gap-4">
                <p className="font-normal text-base">Para editar o recibo compartilhado, troque as informações abaixo.</p>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="title">Título</Label>
                    <Input type="text"/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="description">Descrição</Label>
                    <Input type="text"/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="restaurant">Restaurante</Label>
                    <Input type="text"/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="service">Taxa de serviço</Label>
                    <Input type="text"/>
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="cover">Cover</Label>
                    <Input type="text"/>
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
                                <Link to={''} className="w-full">
                                    <Button variant={"secondary"} className="w-full">Não</Button>
                                </Link>
                                <Link to={'/receiptDetails/1'} className="w-full">
                                    <Button variant={"default"} className="w-full" onClick={editConfirm}>Sim</Button>
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
