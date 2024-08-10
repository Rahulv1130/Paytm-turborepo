"use server"

import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const addMoneyDirect = async () => {
    const session  = await getServerSession(authOptions);

    await db.balance.update({
        where: {
            userId: Number(session.user.id)
        },
        data: {
            amount: 20000
        }
    });
}