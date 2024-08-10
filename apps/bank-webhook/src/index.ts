import db from "@repo/db"
import express from "express";
const app = express();
const port = 3003;

app.use(express.json())

app.post("/hdfcWebhook", async (req,res) => {
    
    const paymentInformation: {
        token: string,
        userId: number,
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    

    const existingToken = await db.onRampTransaction.findUnique({
        where: {
            token: paymentInformation.token
        }
    })

    if(!existingToken){
        return res.json({
            message: "Invalid Request"
        })
    }

    if(existingToken.status === "Success"){
        return res.json({
            message: "Token already Used"
        })
    }

    try{
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount) * 100
                    }
                }
            }),

            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ]);

        res.json({
            message: "Amount Captured"
        })

    }catch(e){
        console.log(e);
        res.status(411).json({
            message: "Error While Processing Webhook"
        })
    }

});

app.listen(port, () => {
    console.log(`Listening to Portttt :- ${port}`);
})