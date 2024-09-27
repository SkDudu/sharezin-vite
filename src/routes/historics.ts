import axios from 'axios'

export interface HistoricProps {
    id: string
    nameProduct: string
    valueProduct: string
    userId: string
    created_at: string
    receiptId: string
}

interface HistoricResponse {
    historics: HistoricProps[];
}

export async function getAllHistoric(){
    const response = await axios.get<HistoricProps[]>(`${import.meta.env.VITE_API_URL}/histoticsAllReceipts`);
    return response.data
}

export async function getHistoricByReceiptId(receiptIdParams: string) {
    const response = await axios.get<HistoricResponse>(`${import.meta.env.VITE_API_URL}/historicOfReceipt/${receiptIdParams}`);
    return response.data.historics
}

export async function addValueInReceipt(nameProduct: string, valueProduct: string, userId: string, receiptId: string){
    const response = await axios.post<HistoricProps>(`${import.meta.env.VITE_API_URL}/addValueInReceipt`, {
        nameProduct, valueProduct, userId, receiptId
    })
    return response.data
}