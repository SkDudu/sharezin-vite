import {useNavigate} from "react-router-dom"
import {Dock, DockIcon} from "@/components/ui/dock.tsx"
import {Button} from "@/components/ui/button.tsx"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Calendar, House, IdentificationCard, Plus, Receipt, User} from "@phosphor-icons/react"

interface DockProps{
    screen: string,
}

export default function dock(props: DockProps){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()

    function toHome(){
        navigate('/home')
    }

    function toMyReceipts(){
        navigate('/myreceipts')
    }

    function createReceipt(){
        navigate('/createReceipt')
    }

    function createEvents(){
        navigate('/createEvents')
    }

    function toProfile(){
        navigate('/profile')
    }

    function toCalendar(){
        navigate('/mycalendar')
    }

    return (
        <div className="fixed bottom-6 right-4 left-4">
            <Dock direction="middle" magnification={0} distance={0} className="justify-between px-4">
                <DockIcon>
                    {props.screen == "home" ?
                        <Button onClick={toHome} variant={"default"} className="bg-blue-600 hover:bg-blue-600">
                            <House size={22} color='#fff'/>
                        </Button>
                        :
                        <Button onClick={toHome} variant={"default"} className="bg-white hover:bg-white">
                            <House size={22} color='#oboc10'/>
                        </Button>
                    }
                </DockIcon>
                <DockIcon>
                    {props.screen == "MyReceipts" ?
                        <Button onClick={toMyReceipts} variant={"default"} className="bg-blue-600 hover:bg-blue-600">
                            <Receipt size={22} color='#fff'/>
                        </Button>
                        :
                        <Button onClick={toMyReceipts} variant={"default"} className="bg-white hover:bg-white">
                            <Receipt size={22} color='#oboc10'/>
                        </Button>
                    }
                </DockIcon>
                <DockIcon>
                    <div className={"mt-5"}>
                        <Drawer>
                            <DrawerTrigger>
                                <Button className="bg-blue-100 w-10 h-10 p-2 hover:bg-blue-400">
                                    <Plus size={64} color="#1e3a8a"/>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader className={"justify-items-start"}>
                                    <DrawerTitle>Criar</DrawerTitle>
                                    <DrawerDescription className={"text-start"}>Escolha entre as opções de criar um recibo e criar um evento.</DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter className={"mb-8"}>
                                    <Button onClick={createReceipt} className={"bg-slate-50 hover:bg-slate-50 text-black font-normal w-full justify-start gap-2"}>
                                        <Receipt size={22} weight={"regular"} color={"#172554"}/>
                                        Criar um recibo
                                    </Button>
                                    <Button onClick={createEvents} className={"bg-slate-50 hover:bg-slate-50 text-black font-normal w-full justify-start gap-2"}>
                                        <Calendar size={22} weight={"regular"} color={"#172554"}/>
                                        Criar um evento
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </DockIcon>
                <DockIcon>
                    {props.screen == "myCalendar" ?
                        <Button onClick={toCalendar} variant={"default"} className="bg-blue-600 hover:bg-blue-600">
                            <Calendar size={22} color='#fff'/>
                        </Button>
                        :
                        <Button onClick={toCalendar} variant={"default"} className="bg-white hover:bg-white">
                            <Calendar size={22} color='#oboc10'/>
                        </Button>
                    }
                </DockIcon>
                <DockIcon>
                    {props.screen == "profile" ?
                        <Button onClick={toProfile} variant={"default"} className="bg-blue-600 hover:bg-blue-600">
                            <User size={22} color='#fff'/>
                        </Button>
                        :
                        <Button onClick={toProfile} variant={"default"} className="bg-white hover:bg-white">
                            <User size={22} color='#oboc10'/>
                        </Button>
                    }
                </DockIcon>
            </Dock>
        </div>
    )
}