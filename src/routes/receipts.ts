import axios from 'axios'

export async function getReceiptsAll(){
    try {
        const receipts = await axios.get(`${process.env.API_URL}/receipts`);
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
}

export async function getOneReceipt(){
    try {
        const receipts = await axios.get(`${process.env.API_URL}/receipts/96e073f8-af07-482c-bdc8-c38a13a6d789`);
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
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