"use client"

import { useRouter } from "next/navigation";
import { addMoneyDirect } from "../../api/lib/actions/addMoneyDirect";

export const AddMoney = () => {
    const router = useRouter();
    return(
        <div className="inline-block">
            <button onClick={() => {addMoneyDirect(); router.refresh();}} className="border rounded-lg p-2 ml-5 mt-2 text-sm bg-zinc-700 text-white font-semibold hover:bg-zinc-800">Add Money for testing</button>
        </div>
    )
}