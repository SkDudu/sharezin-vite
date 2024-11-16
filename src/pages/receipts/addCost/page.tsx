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

    const [nameProductField, setNameProduct] = useState('')
    const [valueProductField, setValueProduct] = useState('')

    console.log('page addCost', data.historics)

    async function actionAddCostInReceitp() {
        try {
            const dataToCost = {
                name: nameProductField,
                cost: valueProductField.includes('.') ? valueProductField : valueProductField.replace(',', '.'),
                receiptId: receiptId,
                userId: userId
            }
    
            const costValue = parseFloat(valueProductField.replace(',', '.'))
    
            if (isNaN(costValue)) {
                toast.error('Por favor, insira valores válidos.')
                return
            }
    
            const sum = costValue + data.TotalCost
    
            const dataToParticipant = {
                totalCost: sum
            }

            if(data.historics == null){
                const response = await pb.collection('costs').create(dataToCost)
                const responseSumTotal = await pb.collection('participants').update(`${data.participantId}`, dataToParticipant)

                const dataHistoric = {
                    costs: response.id
                }
                const responseHistoricInReceipt = await pb.collection('receipts').update(`${receiptId}`, dataHistoric)

                if (response != null && responseSumTotal != null && responseHistoricInReceipt != null) {
                    toast.success('Valor adicionado com sucesso.')
                    navigate(`/receiptDetails/${data.receiptId}`)
                } else {
                    toast.error('Erro ao adicionar o valor a esse recibo, tente novamente.')
                }
            }else{
                const response = await pb.collection('costs').create(dataToCost)

                const currentHistorics = data.historics
                const updatedHistorics=[...currentHistorics, response.id]
                const dataHistoric = {
                    costs: updatedHistorics
                }
                const responseHistoricInReceipt = await pb.collection('receipts').update(`${receiptId}`, dataHistoric)

                const responseSumTotal = await pb.collection('participants').update(`${data.participantId}`, dataToParticipant)

                if (response != null && responseSumTotal != null && responseHistoricInReceipt != null) {
                    toast.success('Valor adicionado com sucesso.')
                    navigate(`/receiptDetails/${data.receiptId}`)
                } else {
                    toast.error('Erro ao adicionar o valor a esse recibo, tente novamente.')
                }
            }
        } catch (error) {
            console.error('Error adding cost:', error)
            toast.error('Ocorreu um erro inesperado. Tente novamente.')
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

            <HeaderWithBack path={`/receiptDetails/${data.receiptId}`} title={'Adicionar custo'}/>
            <div className="flex flex-col p-4 h-full justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col w-full h-min bg-blue-100 p-2 rounded-lg gap-4">
                        <div className="flex flex-col items-center">
                            <p className="text-base text-black font-light">Sua parte do recibo compartilhado</p>
                            <p className="text-4xl text-black font-semibold">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(data.TotalCost)}</p>
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