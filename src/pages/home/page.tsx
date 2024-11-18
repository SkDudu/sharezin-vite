import PocketBase from 'pocketbase'

import Header from "@/components/header"
import Dock from "@/components/dock.tsx"

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
