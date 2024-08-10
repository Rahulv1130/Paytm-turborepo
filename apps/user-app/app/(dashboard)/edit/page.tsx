"use client"

import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { EditDetails } from "./EditDetails";
import { useRouter } from "next/navigation";


export default function() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const router = useRouter();

    return(
        <div>
            <div className="flex justify-center pt-24">
                
                <div className="w-72">
                    <TextInput placeholder="John Doe" label="Name" onChange={(e) => setName(e)} />
                    <TextInput placeholder="abc@gmail.com" label="Email" onChange={(e) => setEmail(e)} />
                </div>
            </div>

            <div className="text-center pt-6">
                <Button onClick={ async () => {
                    const res = await EditDetails(name,email);
                    if(res.message === "Successful"){
                        alert("Details Edited Successfully");
                        router.push("/dashboard");
                        return router.refresh();
                    }
                    alert("Something went wrong")
                }}>Submit</Button>
            </div>
            
        </div>
    )
}