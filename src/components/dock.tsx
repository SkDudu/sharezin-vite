import {Dock, DockIcon} from "@/components/ui/dock.tsx";
import {Button} from "@/components/ui/button.tsx";
import {House, Plus, User} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";

export default function dock(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()

    function createReceipt(){
        navigate('/createReceipt')
    }

    function toProfile(){
        navigate('/profile')
    }

    return (
        <div className="absolute bottom-6 right-4 left-4">
            <Dock direction="middle" magnification={0} distance={0} className="gap-6">
                <DockIcon>
                    <Button onClick={toProfile} variant={"default"} className="bg-white">
                        <House size={22} color='#oboc10'/>
                    </Button>
                </DockIcon>
                <DockIcon>
                    <Button onClick={createReceipt} className="bg-blue-100 w-10 h-10 p-2">
                        <Plus size={64} color="#1e3a8a"/>
                    </Button>
                </DockIcon>
                <DockIcon>
                    <Button onClick={toProfile} variant={"default"} className="bg-white">
                        <User size={22} color='#oboc10'/>
                    </Button>
                </DockIcon>
            </Dock>
        </div>
    )
}