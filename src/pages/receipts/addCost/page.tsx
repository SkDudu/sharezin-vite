import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import PocketBase from 'pocketbase'

import HeaderWithBack from "@/components/headerWithBack"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AddCostToReceipt(){
    const location = useLocation()
    const { data } = location.state || {}
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)
    const userId = JSON.parse(localStorage.getItem("userId") as string)

    const navigate = useNavigate()

    const receiptId = data.receiptId

    const [nameProductField, setNameProduct] = useState('');
    const [valueProductField, setValueProduct] = useState('');

    async function actionAddCostInReceitp(){
        const dataTo = {
            name: nameProductField,
            cost: valueProductField,
            receiptId: receiptId,
            userId: userId
        }

        const response = await pb.collection('costs').create(dataTo) 
        if(response != null){
            toast.success('Valor adicionado com sucesso.')
            navigate(`/receiptDetails/${data.receiptId}`)
        }else{
            toast.error('Erro ao adicionar o valor a esse recibo, tente novamente.')
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