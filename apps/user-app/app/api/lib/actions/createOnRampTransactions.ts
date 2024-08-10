"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import db from "@repo/db"

export const createOnRampTransactions = async (provider: string ,amount: number) => {
    const session = await getServerSession(authOptions);
    // if(!session){
    //     return {
    //         message: "Unauthenticated Request"
    //     }
    // }

    const token = (Math.random() * 1000).toString();

    const transaction = await db.onRampTransaction.create({
        data: {
            token: token,
            provider,
            status: "Processing",
            amount: amount * 100,
            startTime: new Date(),
            userId: Number(session?.user?.id),
        }
    });

    return transaction
}