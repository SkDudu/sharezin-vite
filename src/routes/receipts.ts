import axios from 'axios'

export interface ReceiptProps {
    id: string,
    title: string,
    description?: string,
    restaurant_name: string,
    tax_cover: number,
    tax_service: number,
    code_invitation: string
}

export async function getReceiptsAll() {
    const response = await axios.get<ReceiptProps[]>(`${import.meta.env.VITE_API_URL}/receipts`);
    return response.data;
}

export async function getOneReceipt(){
    const receipts = await axios.get(`${process.env.API_URL}/receipts/96e073f8-af07-482c-bdc8-c38a13a6d789`);
    return receipts
}

export async function createReceipt(){
    try {
        const receipts = await axios.post(`${process.env.API_URL}/createReceipts`);
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
}

export async function updateReceipt(){
    try {
        const receipts = await axios.patch(`${process.env.API_URL}/createReceipts`);
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
}