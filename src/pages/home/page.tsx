import {useEffect, useState} from "react"
import {getYear} from "date-fns"
import PocketBase, {RecordModel} from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {Bank, MoneyWavy} from "@phosphor-icons/react"
import toast from "react-hot-toast";

export default function Home() {
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)
    const username = JSON.parse(localStorage.getItem("username") as string)

    const currentDate = new Date()
    const year = getYear(currentDate)

    const [data, setData] = useState<RecordModel[] | null>(null)

    async function getDataToGraphics(){
        try {
            const record = await pb.collection('dataPerUser').getFirstListItem(`id="${userId}"`, {
                filter: `year="${year}"`
            })

            if(record == null || record == undefined){
                toast.error('Sem dados.')
            }else{
                setData(record)
                console.log('data', data)
            }
        }catch{
            toast.error('Sem dados.')
        }
    }

    const chartData = [
        { month: "Janeiro", cost: 13 },
        { month: "Fevereiro", cost: 12 },
        { month: "Março", cost: 12 },
        { month: "Abril", cost: 12 },
        { month: "Maio", cost: 12 },
        { month: "Junho", cost: 12 },
        { month: "Julho", cost: 12 },
        { month: "Agosto", cost: 12 },
        { month: "Setembro", cost: 12 },
        { month: "outubro", cost: 12 },
        { month: "Novembro", cost: 12 },
        { month: "Dezembro", cost: 12 },
    ]

    const chartConfig = {
        cost: {
            label: "Custo",
            color: "#1e3a8a",
        },
    } satisfies ChartConfig

    useEffect(()=>{
        getDataToGraphics()
    }, [userId])

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header name={username} isProfile={false}/>

            <div className={"w-full bg-gray-50 rounded"}>
                <p className={"font-medium p-2"}>Gastos anuais</p>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} horizontal={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="cost" fill="var(--color-cost)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </div>

            <div className={"flex grid-rows-3 gap-2"}>
                <div className={"flex flex-row w-full h-16 p-2 gap-2 bg-slate-50 rounded items-center"}>
                    <div className={"flex w-10 h-10 rounded-full bg-blue-100 items-center justify-center"}>
                        <MoneyWavy size={22} color={"#1e3a8a"}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <p className={"font-normal text-sm text-gray-600"}>Consumo mensal</p>
                        <p className={"font-medium text-gray-800"}>asdasd</p>
                    </div>
                </div>
                <div className={"flex flex-row w-full h-16 p-2 gap-2 bg-slate-50 rounded items-center"}>
                    <div className={"flex w-10 h-10 rounded-full bg-blue-100 items-center justify-center"}>
                        <Bank size={22} color={"#1e3a8a"}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <p className={"font-normal text-sm text-gray-600"}>Consumo total</p>
                        <p className={"font-medium text-gray-800"}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(data?.costAnnually)}</p>
                    </div>
                </div>
            </div>

            <Dock screen={"home"}/>
        </div>
    )
}
