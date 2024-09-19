import axios from 'axios'

export interface HistoricProps {
    id: string,
    nameProduct: string,
    valueProduct: number,
    userId: string,
    receiptId: number
}

export async function getAllHistoric(){
    const response = await axios.get<HistoricProps[]>(`${import.meta.env.VITE_API_URL}/histoticsAllReceipts`);
    return response.data;
}

export async function getHistoricByReceiptId(receiptIdParams: String) {
    const response = await axios.get<HistoricProps[]>(`${import.meta.env.VITE_API_URL}/histoticsAllReceipts/${receiptIdParams}`)
    return response.data;
}