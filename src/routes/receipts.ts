import axios from 'axios'

export interface ReceiptProps {
    id: string,
    title: string,
    description?: string,
    restaurant_name: string,
    tax_cover: number,
    tax_service: number,
    code_invitation: string,
    isClose: boolean,
    userOwner: string
}

export async function getReceiptsAll() {
    const receipts = await axios.get<ReceiptProps[]>(`${import.meta.env.VITE_API_URL}/receipts`);
    return receipts.data;
}

export async function getOneReceipt(receiptIdParams: String){
    const receipt = await axios.get<ReceiptProps[]>(`${process.env.API_URL}/receipt/${receiptIdParams}`);
    return receipt.data
}

export async function createReceipt(){
    try {
        const receipts = await axios.post<ReceiptProps[]>(`${process.env.API_URL}/createReceipts`);
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
}

export async function updateReceipt(){
    try {
        const receipts = await axios.patch<ReceiptProps[]>(`${process.env.API_URL}/createReceipts`);
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
}