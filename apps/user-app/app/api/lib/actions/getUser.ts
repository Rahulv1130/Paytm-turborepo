import db from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"


export const getUser = async () => {
    const session = await getServerSession(authOptions);
    const user = await db.user.findUnique({
        where: {
            id: Number(session.user.id)
        }
    })

    return user;
}

export const getBalance = async () => {
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findUnique({
        where: {
            userId: Number(session.user.id)
        }
    })
    return balance;
}