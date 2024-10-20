import { Card, CardContent } from "./ui/card";

interface emptyStateParticipantsProps {
    title: String,
    description?: String
}

export default function emptyStateParticipants(props: emptyStateParticipantsProps) {
    return(
        <Card className="border-gray-100">
            <CardContent className="p-2 m-0">
                <div className="flex">
                    <p className="font-normal text-md text-stone-400">{props.description}</p>
                </div>
            </CardContent>
        </Card>
    )
}