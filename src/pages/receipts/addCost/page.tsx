import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import HeaderWithBack from "@/components/headerWithBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addValueInReceipt } from "@/routes/historics";

export default function AddCostToReceipt(){
    const location = useLocation()
    const { data } = location.state || {}

    const navigate = useNavigate();

    const [nameProductField, setNameProduct] = useState('');
    const [valueProductField, setValueProduct] = useState('');

    async function actionAddCostInReceitp(){
        try{
            const response = await addValueInReceipt(
                nameProductField,
                valueProductField,
                data.userId,
                data.receiptId
            )
            
            if(response != null){
                toast.success('Valor adicionado com sucesso.')
                navigate(`/receiptDetails/${data.receiptId}`)
            }
        }catch(error){
            toast.error('Erro ao adicionar o valor a esse recibo, tente novamente.')
            console.log(error)
        }
    }

    function handlenameProductChange(event: any) {
        const { value } = event.target;
        setNameProduct(value);
    }

    function handlecostChange(event: any) {
        const { value } = event.target;
        if (/^\d*([.,]?\d*)$/.test(value)) {
            setValueProduct(value);
        }
    }

    return(
        <div className="flex flex-col h-screen">

            <HeaderWithBack path={'/receiptDetails/1'} title={'Adicionar custo'}/>
            <div className="flex flex-col p-4 h-full justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col w-full h-min bg-blue-100 p-2 rounded-lg gap-4">
                        <div className="flex flex-col items-center">
                            <p className="text-base text-black font-light">Sua parte do recibo compartilhado</p>
                            <p className="text-4xl text-black font-semibold">R$ 34,32</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="cover">Nome do prato ou bebida</Label>
                        <Input type="text" value={nameProductField} onChange={handlenameProductChange}/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="cover">Custo</Label>
                        <Input type="text" value={valueProductField} onChange={handlecostChange}/>
                    </div>
                </div>

                <div className="flex flex-col gap-3 pb-2">
                    <Button variant={"default"} onClick={actionAddCostInReceitp} className="w-full">Adicionar custo</Button>
                    <Link to={`/receiptDetails/${data.receiptId}`}>
                        <Button variant={"secondary"} className="w-full">Cancelar</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}