import React, {useEffect, useState} from "react"
import {getMonth, getYear, isSameDay, parseISO} from "date-fns"
import PocketBase, {ListResult, RecordModel} from 'pocketbase'
import toast from "react-hot-toast"

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Skeleton} from "@/components/ui/skeleton.tsx"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {Bank, MoneyWavy} from "@phosphor-icons/react"

export default function Home() {
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)
    const username = JSON.parse(localStorage.getItem("username") as string)

    const currentDate = new Date()
    const year = getYear(currentDate)
    const monthIndex = getMonth(currentDate)

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const monthName = months[monthIndex]

    const [data, setData] = useState<ListResult<RecordModel> | null>(null)
    const [monthValue, setMonthValue] = useState()
    const [loading, setLoading] = useState(true)

    const [januaryValue, setJanuaryValue] = useState(0)
    const [februaryValue, setFebruaryValue] = useState(0)
    const [marchValue, setMarchValue] = useState(0)
    const [aprilValue, setAprilValue] = useState(0)
    const [mayValue, setMayValue] = useState(0)
    const [juneValue, setJuneValue] = useState(0)
    const [julyValue, setJulyValue] = useState(0)
    const [augustValue, setAugustValue] = useState(0)
    const [septemberValue, setSeptemberValue] = useState(0)
    const [octoberValue, setOctoberValue] = useState(0)
    const [novemberValue, setNovemberValue] = useState(0)
    const [decemberValue, setDecemberValue] = useState(0)

    async function getDataToGraphics(){
        const resultList = await pb.collection('dataPerUser').getList(1, 50, {
            filter: `year >= "${year}" && id="${userId}"`,
        })

        if(resultList.items.length == 0){
            toast('Sem gastos por enquanto.', {
                icon: '👏',
            })
            setLoading(false)
        }else{
            setData(resultList)

            if(resultList){
                const monthData = resultList.items[0]
                const value = monthData[monthName]
                setMonthValue(value)
            }

            setLoading(false)
        }
    }

    const chartData = [
        { month: "Janeiro", cost: januaryValue },
        { month: "Fevereiro", cost: februaryValue },
        { month: "Março", cost: marchValue },
        { month: "Abril", cost: aprilValue },
        { month: "Maio", cost: mayValue },
        { month: "Junho", cost: juneValue },
        { month: "Julho", cost: julyValue },
        { month: "Agosto", cost: augustValue },
        { month: "Setembro", cost: septemberValue },
        { month: "outubro", cost: octoberValue },
        { month: "Novembro", cost: novemberValue },
        { month: "Dezembro", cost: decemberValue },
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

    useEffect(() => {
        if (data) {
            const monthData = data.items[0]
            const januaryValue = parseFloat(monthData['January'])
            const februaryValue = parseFloat(monthData['February'])
            const marchValue = parseFloat(monthData['March'])
            const aprilValue = parseFloat(monthData['April'])
            const mayValue = parseFloat(monthData['May'])
            const juneValue = parseFloat(monthData['June'])
            const julyValue = parseFloat(monthData['July'])
            const augustValue = parseFloat(monthData['August'])
            const septemberValue = parseFloat(monthData['September'])
            const octoberValue = parseFloat(monthData['October'])
            const novemberValue = parseFloat(monthData['November'])
            const decemberValue = parseFloat(monthData['December'])
            setJanuaryValue(januaryValue)
            setFebruaryValue(februaryValue)
            setMarchValue(marchValue)
            setAprilValue(aprilValue)
            setMayValue(mayValue)
            setJuneValue(juneValue)
            setJulyValue(julyValue)
            setAugustValue(augustValue)
            setSeptemberValue(septemberValue)
            setOctoberValue(octoberValue)
            setNovemberValue(novemberValue)
            setDecemberValue(decemberValue)
        }
    }, [data])

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header name={username} isProfile={false}/>

            <div className={"w-full bg-gray-50 rounded"}>
                <p className={"font-medium p-2"}>Gastos mensais</p>
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
                    <div className={"flex w-8 h-8 rounded-full bg-blue-100 items-center justify-center"}>
                        <MoneyWavy size={18} color={"#1e3a8a"}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <p className={"font-normal text-sm text-gray-600"}>Consumo mensal</p>

                        {loading ? <Skeleton className="w-[60px] h-[20px] rounded-full bg-blue-100"/> : <p className={"font-medium text-gray-800"}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(monthValue ?? 0)}</p>}
                    </div>
                </div>
                <div className={"flex flex-row w-full h-16 p-2 gap-2 bg-slate-50 rounded items-center"}>
                    <div className={"flex w-8 h-8 rounded-full bg-blue-100 items-center justify-center"}>
                        <Bank size={18} color={"#1e3a8a"}/>
                    </div>
                    <div className={"flex flex-col"}>
                        <p className={"font-normal text-sm text-gray-600"}>Consumo total</p>
                        <p className={"font-medium text-gray-800"}>
                            {loading ? (
                                <Skeleton className="w-[60px] h-[20px] rounded-full bg-blue-100"/>
                            ) : (
                                <p>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(data?.items[0].costAnnually ?? 0)}</p>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <Dock screen={"home"}/>
        </div>
    )
}
