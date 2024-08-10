"use server"

import db from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/lib/auth"

export const EditDetails = async (name: string , email: string) => {

    const session = await getServerSession(authOptions);
    const id = Number(session.user.id);

    const res = await db.user.update({
        where: {
            id: id
        },
        data: {
            name: name,
            email: email
        }
    })

    if(!res){
        return {
            message: "Something went wrong!"
        }
    }

    return {
        message: "Successful"
    }
}