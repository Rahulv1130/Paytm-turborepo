"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/Center"
import { TextInput } from "@repo/ui/TextInput"
import { useState } from "react"
import { p2pTransfer } from "../app/api/lib/actions/p2pTransfer"
import { useRouter } from "next/navigation"


export const SendCard = () => {

    const [amount,setAmount] = useState("");
    const [number,setNumber] = useState("");
    const router = useRouter();

    return(
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput placeholder="123456789" label="Number" onChange={(e) => {setNumber(e)}} />
                        <TextInput placeholder="Enter Amount" label="Amount" onChange={(e) => {setAmount(e)}} />
                        <div className="text-center pt-4 ">
                            <Button onClick={ async () => {
                                const res = await p2pTransfer(number , Number(amount) * 100 );
                                alert(res?.message);

                                if( res.message === "Transaction Successful") {
                                    router.push("/transfer");
                                }

                            }}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}