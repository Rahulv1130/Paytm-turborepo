"use client"

import { Button } from "@repo/ui/button"
import { useRouter } from "next/navigation"

export const DashButton = () => {
    const router = useRouter();
    return(
        <div>
            <Button onClick={() => {
                router.push("/edit");
            }}>Edit Details</Button>
        </div>
    )
}