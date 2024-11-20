import React, {useEffect, useState} from "react"
import PocketBase, {ListResult, RecordModel} from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import {Calendar} from "@/components/ui/calendar.tsx"
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx"
import {Skeleton} from "@/components/ui/skeleton.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {isSameDay, parseISO} from "date-fns";


export default function MyCalendar() {
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const username = JSON.parse(localStorage.getItem("username") as string)
    const today = new Date()

    const [events, setEvents] = useState<ListResult<RecordModel> | null>(null)
    const [eventToday, setEventToday] = useState<RecordModel | null>(null)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const firstDay = (new Date(date.getFullYear(), date.getMonth(), 1)).toISOString()
    const lastDay = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toISOString()

    async function getEvents(){
        setLoading(true)
        const response = await pb.collection('receipts').getList(1, 50, {
            filter: `eventTo >= "${firstDay}" && eventTo <= "${lastDay}"`,
            sort: 'eventTo',
        })

        if(response != null){
            setEvents(response)
            setLoading(false)

            const filteredItems = response.items.filter((item) => {
                const eventDate = parseISO(item.eventTo)
                return isSameDay(eventDate, today)
            })

            setEventToday(filteredItems)
        }
    }

    console.log(eventToday)

    useEffect(()=>{
        getEvents()
    }, [])

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header name={username} isProfile={false}/>
            <p className={"font-medium text-xl"}>Calendários de eventos</p>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            <div className={"pt-3"}>
                <p className={"font-normal text-md mb-2"}>Evento de hoje</p>
                {loading ? (
                    <Card className="mt-2">
                        <CardHeader className="flex flex-row p-2 justify-between">
                            <Skeleton className="w-[60px] h-[20px] rounded-full"/>
                        </CardHeader>
                        <CardContent className="flex flex-col px-2 pb-2 gap-2">
                            <Skeleton className="w-[130px] h-[20px] rounded-full"/>
                            <Skeleton className="w-[250px] h-[10px] rounded-full"/>
                        </CardContent>
                    </Card>
                ) : eventToday?.totalItems == 0 ? (
                    <Card>
                        <p className={"p-2 text-xs text-gray-500"}>Você não tem nada marcado para hoje.</p>
                    </Card>
                ) : (
                    eventToday?.map((event) => (
                        <Card className="mb-2">
                            <CardHeader className="flex flex-row p-2 justify-between">
                                <Badge variant={"default"} className="h-6 bg-green-100 text-green-700">Hoje</Badge>
                            </CardHeader>
                            <CardContent className="flex flex-col px-2 pb-2 gap-2">
                                <p className="font-semibold">{event.title}</p>
                                <p>{event.description}</p>
                            </CardContent>
                        </Card>
                    ))

                )}
            </div>
            <div className={"pt-3 pb-10"}>
                <p className={"font-normal text-md mb-2"}>Eventos do mês</p>
                {loading ? (
                    <Card className="mt-2">
                        <CardHeader className="flex flex-row p-2 justify-between">
                            <Skeleton className="w-[60px] h-[20px] rounded-full"/>
                        </CardHeader>
                        <CardContent className="flex flex-col px-2 pb-2 gap-2">
                            <Skeleton className="w-[130px] h-[20px] rounded-full"/>
                            <Skeleton className="w-[250px] h-[10px] rounded-full"/>
                        </CardContent>
                    </Card>
                ) : events?.totalItems == 0 ? (
                    <Card>
                        <p className={"p-2 text-xs text-gray-500"}>Você não tem nada marcado para hoje.</p>
                    </Card>
                ) : (
                    events?.items.map((event) => (
                        <Card className="mb-2">
                            <CardHeader className="flex flex-row p-2 justify-between">
                                { isSameDay(event.eventTo, today) ?
                                    <Badge variant={"default"} className="h-6 bg-green-100 text-green-700">{today.toLocaleDateString('pt-BR')}</Badge> :
                                    <Badge variant={"default"} className="h-6 bg-stone-200 text-stone-400">{new Date(event.eventTo).toLocaleDateString('pt-BR')}</Badge>
                                }
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
