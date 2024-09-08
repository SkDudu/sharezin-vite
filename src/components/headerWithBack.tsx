import { Link } from "react-router-dom";

import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "./ui/button";

interface headerWithBackProps {
    path: String,
    title: String
}

export default function HeaderWithBack(props: headerWithBackProps) {
    return(
        <div className="flex flex-row   border border-x-0 border-t-0">
            <div className="flex flex-row items-center p-2 pt-4 gap-2">
                <Link to={`${props.path}`}>
                    <Button className="w-8 h-8 p-0 bg-white hover:bg-transparent">
                        <ArrowLeft color="#000" size={24} />
                    </Button>
                </Link>
                <p className="text-lg font-semibold text-stone-950">{props.title}</p>
            </div>
        </div>
    )
}