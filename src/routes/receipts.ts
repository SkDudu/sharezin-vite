import axios from 'axios'

export interface ReceiptProps {
    receipts: any;
    users: any;
    HistoricOfValuesInReceipts: any,
    id: string,
    title: string,
    description: string,
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
    const receipt = await axios.get<ReceiptProps>(`${import.meta.env.VITE_API_URL}/receipt/${receiptIdParams}`);
    if(receipt != null || undefined){
        return await receipt.data.receipts
    }else{
        return null
    }
}

export async function createReceipt(title: string, description: string, restaurant_name: string, tax_cover: number, tax_service: number, code_invitation: string, userOwner: string, isClose: boolean){
    const response = await axios.post<ReceiptProps>(`${import.meta.env.VITE_API_URL}/createReceipt`, {
        title, description, restaurant_name, tax_cover, tax_service, code_invitation, userOwner, isClose
    });
    return response.data;
}

export async function updateReceipt(id: string, title: string, description: string, restaurant_name: string, tax_cover: number, tax_service: number){
    try {
        const response = await axios.patch<ReceiptProps>(`${import.meta.env.VITE_API_URL}/editReceipt`, {
            id, title, description, restaurant_name, tax_cover, tax_service
        });
        return response.data.receipts;
    } catch (error) {
        console.error(error);
    }
}