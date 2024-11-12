import { Link } from "react-router-dom"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import { MagnifyingGlass } from "@phosphor-icons/react"

interface headerProps {
    name: string,
    isProfile: boolean
}

export default function Header(props: headerProps) {
    return(
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
                <div className="w-12 h-12 rounded-full overflow-clip">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-light text-stone-600">Bem vindo!</p>
                    <p className="text-base font-semibold text-stone-950">{props.name}</p>
                </div>
            </div>

            {props.isProfile ?
                <></>
            :
                <div className="flex flex-row gap-4">
                    <Link to={'/searchReceipts'}>
                        <MagnifyingGlass size={24}/>
                    </Link>
                </div>
            }
        </div>
    )
}