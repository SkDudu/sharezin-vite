import { useEffect, useState } from "react";
import HeaderWithBack from "@/components/headerWithBack.tsx";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";
import PocketBase, {RecordModel} from "pocketbase";

export default function manageParticipants(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {receiptIdParams} = useParams<{ receiptIdParams: string }>()
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [participants, setParticipants] = useState<RecordModel[] | null>(null)

    async function getParticipantsByReceiptId(){
        try {
            const response = await pb.collection('participants').getFullList({
                filter: `receiptId = "${receiptIdParams}"`
            })

            if (response){
                setParticipants(response)
                console.log(participants)
            } else {
                toast.error('Sem participantes.')
            }
        } catch{
            toast.error('Ocorreu um erro ao buscar participantes.')
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        getParticipantsByReceiptId()
    },[receiptIdParams])

    return(
        <>
            <HeaderWithBack path={`/receiptDetails/${receiptIdParams}`} title={"Gerenciar participantes"}/>
            <p>Gerenciar participantes</p>
        </>
    )
}