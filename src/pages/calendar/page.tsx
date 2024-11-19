import React from "react"
import PocketBase from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import {Calendar} from "@/components/ui/calendar.tsx";
import {Card} from "@/components/ui/card.tsx";


export default function MyCalendar() {
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)
    const username = JSON.parse(localStorage.getItem("username") as string)

    const [date, setDate] = React.useState<Date | undefined>(new Date())

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
                <p className={"p-2 font-medium text-xl"}>Atividades</p>
                <Card>
                    <p className={"p-2 text-xs text-gray-500"}>Você não tem nada marcado para hoje.</p>
                </Card>
            </div>
            <Dock screen={"myCalendar"}/>
        </div>
    )
}
