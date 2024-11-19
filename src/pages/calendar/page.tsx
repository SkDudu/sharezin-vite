import React, {useEffect, useState} from "react"
import PocketBase, {ListResult, RecordModel} from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import {Calendar} from "@/components/ui/calendar.tsx"
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx"
import {Skeleton} from "@/components/ui/skeleton.tsx"
import {Badge} from "@/components/ui/badge.tsx"


export default function MyCalendar() {
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const username = JSON.parse(localStorage.getItem("username") as string)

    const [events, setEvents] = useState<ListResult<RecordModel> | null>(null)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const firstDay = (new Date(date.getFullYear(), date.getMonth(), 1)).toISOString()
    const lastDay = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toISOString()

    async function getEvents(){
        setLoading(true)
        const response = await pb.collection('receipts').getList(1, 50, {
            filter: `eventTo >= "${firstDay}" && eventTo <= "${lastDay}"`,
        })

        if(response != null){
            setEvents(response)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getEvents()
    }, [])

    const dateEvent = new Date(events?.items[0]?.eventTo)

    const year = date.getFullYear();  // 2024
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const yearEvent = dateEvent.getFullYear();  // 2024
    const monthEvent = String(dateEvent.getMonth() + 1).padStart(2, '0')
    const dayEvent = String(dateEvent.getDate()).padStart(2, '0')

    console.log(`${year}-${month}-${day}`)
    console.log(`${yearEvent}-${monthEvent}-${dayEvent}`)

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header name={username} isProfile={false}/>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            <div className={"pt-3"}>
                <p className={"p-2 font-medium text-xl"}>Eventos para esse mês</p>
                {loading ? (
                    <Card className="mt-2">
                        <CardHeader className="flex flex-row p-2 justify-between">
                            <Skeleton className="w-[60px] h-[20px] rounded-full" />
                        </CardHeader>
                        <CardContent className="flex flex-col px-2 pb-2 gap-2">
                            <Skeleton className="w-[130px] h-[20px] rounded-full" />
                            <Skeleton className="w-[250px] h-[10px] rounded-full" />
                        </CardContent>
                    </Card>
                ) : events?.totalItems == 0 ? (
                    <Card>
                        <p className={"p-2 text-xs text-gray-500"}>Você não tem nada marcado para hoje.</p>
                    </Card>
                ) : (
                    events?.items.map((event)=>(
                        <Card className="mb-2">
                            <CardHeader className="flex flex-row p-2 justify-between">
                                {`${yearEvent}-${monthEvent}-${dayEvent}` == `${year}-${month}-${day}` ? <Badge variant={"default"} className="h-6 bg-green-100 text-green-700">Hoje</Badge> : <Badge variant={"default"} className="h-6 bg-stone-200 text-stone-400">{new Date(event.eventTo).toLocaleDateString('pt-BR')}</Badge>}
                            </CardHeader>
                            <CardContent className="flex flex-col px-2 pb-2 gap-2">
                                <p className="font-semibold">{event.title}</p>
                                <p>{event.description}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
            <Dock screen={"myCalendar"}/>
        </div>
    )
}
