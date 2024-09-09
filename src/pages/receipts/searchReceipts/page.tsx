import { useParams } from "react-router-dom";

export default function searchReceipts(){
    const { name } = useParams();

    return(
        <h1>{name}</h1>
    )
}