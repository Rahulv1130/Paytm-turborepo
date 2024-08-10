"use server"

import db from "@repo/db"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const p2pTransfer = async (number: string, amount: number) => {

    const session = await getServerSession(authOptions);
    const from = Number(session?.user?.id);

    if (!session) {
        return {
            message: "User not signed in"
        }
    }

    const toUser = await db.user.findUnique({
        where: {
            number: number
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }

    if(toUser.id === from ){
        return {
            message: "Sending to Self not Allowed"
        }
    }

    const fromBalance = await db.balance.findUnique({
        where: { userId: from }
    });

    if (!fromBalance || fromBalance.amount < amount) {
        return {
            message: "Insufficient Balance"
        }
    }

    await db.$transaction( async (tx) => {

        const fromBalance = await tx.balance.findUnique({
            where: { userId: from }
        });
    
        if (!fromBalance || fromBalance.amount < amount) {
            return {
                message: "Insufficient Balance"
            }
        }

        await tx.balance.update({
            where: { userId: from },
            data: { amount: { decrement: amount } }
        });

        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } }
        });

        await tx.onRampTransaction.create({
            data: {
                status: "Success",
                token: (Math.random() * 1000).toString(),
                provider: "Paytm User",
                amount: amount,
                startTime: new Date(),
                userId: toUser.id
            }
        });

        await tx.p2pTransfer.create({
            data: {
                amount:     amount,
                timeStamp:  new Date(),
                fromUserId: from,
                toUserId:   toUser.id,
            }
        })
    });

    return {
        message: "Transaction Successful"
    }

}