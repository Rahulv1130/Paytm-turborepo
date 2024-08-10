"use client"
import { usePathname, useRouter } from "next/navigation"

export const SidebarItem = ({href,title,icon}: {href: string , title: string , icon: React.ReactNode}) => {
    const pathName = usePathname();
    const router = useRouter();
    const selected = pathName === href;

    return(
        <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} font-semibold cursor-pointer p-2 pl-8 hover:font-bold  w-52 `}  onClick={()=> {router.push(href); router.refresh();}}>

            <div className="pr-2">
                {icon}
            </div>

            <div className={`${selected ? "text-[#6a51a6] font-bold " : "text-slate-500"}`}>
                {title}
            </div>
        </div>
    )
}