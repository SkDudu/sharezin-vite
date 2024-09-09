import HeaderWithBack from "@/components/headerWithBack";

export default function resumeReceipt(){
    return(
        <div className="flex flex-col w-screen h-screen">
            <HeaderWithBack path={'/receiptDetails/1'} title={'Resumo do seu recibo'}/>
            <div className="flex flex-col p-4">
                <div className="w-max h-max bg-stone-400 rounded">
                    <h1>aow</h1>
                </div>
            </div>
        </div>
    )
}