import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PocketBase, { ListResult, RecordModel } from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"
import EmptyState from "@/components/emptyState"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Receipt } from "@phosphor-icons/react"

import imgUrl from '../../assets/nodata.svg'

export default function Home() {
    const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

    const userId = JSON.parse(localStorage.getItem("userId") as string)
    const username = JSON.parse(localStorage.getItem("username") as string)

    return (
        <div className="flex flex-col p-4 gap-2 w-screen h-screen">
            <Header name={username} isProfile={false}/>

            <Dock screen={"home"}/>
        </div>
    )
}
