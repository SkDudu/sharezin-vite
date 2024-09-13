import { Card, CardContent } from "./ui/card";

interface emptyStateProps {
    path: String,
    title: String,
    description?: String
}

export default function emptyState(props: emptyStateProps) {
    return(
        <div>
            <Card>
                <CardContent className="flex flex-col items-center justify-center mt-6 gap-2">
                    <img src={`${props.path}`} alt="image of empty data" className="w-[18%]"/>
                    <p className="font-medium text-xl">{props.title}</p>
                    <p className="font-normal text-sm text-stone-400">{props.description}</p>
                </CardContent>
            </Card>
        </div>
    )
}