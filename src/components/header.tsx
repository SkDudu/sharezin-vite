import { House, List, X } from "@phosphor-icons/react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Header() {
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
                    <p className="text-sm font-thin text-stone-600">Bem vindo!</p>
                    <p className="text-base font-semibold text-stone-950">Eduardo Santos</p>
                </div>
            </div>
            
            <Sheet>
                <SheetTrigger>
                    <List size={24} />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="flex justify-start">
                            <div className="flex flex-row w-full justify-between items-center">
                                Menu
                                <SheetClose>
                                    <X size={24} />
                                </SheetClose>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <SheetDescription className="mt-6">
                        <Button variant={"default"} className="w-full justify-start bg-white text-stone-950 gap-3 hover:bg-stone-100">
                            <House color="#0c0a09" weight="regular" size={18} />
                            Home
                        </Button>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    )
}