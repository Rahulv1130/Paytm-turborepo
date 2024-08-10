import db from "@repo/db";
import { NextResponse } from "next/server";

export const GET = async () => {

    await db.user.create({
        data: {
            number: "Ishuuuu",
            password: "Ishika"
        }
    })

    return NextResponse.json({
        message: "User Created Successfully"
    })
}