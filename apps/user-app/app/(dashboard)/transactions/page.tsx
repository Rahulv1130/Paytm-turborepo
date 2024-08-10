import db from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/lib/auth"
import { Card } from "@repo/ui/card";


export default async function() {

    const session = await getServerSession(authOptions);
    const id = session.user.id;

    const received = await db.p2pTransfer.findMany({
        where: {
            toUserId: Number(id)
        }
    })
    
    const sent = await db.p2pTransfer.findMany({
        where: {
            fromUserId: Number(id)
        }
    })

    if(!received.length && ! sent.length){
        return(
            <div className="flex justify-center pt-28">
                <Card title="Recent Transactions">
                    <div>
                        No Recent P2P Transactions
                    </div>
                </Card>
            </div>
        )
    }
    return(
        <div className="flex justify-center">
            <Card title="P2P Tansactions">
                <div className="pt-2">
                    {received.map(t => 
                        <div className="flex justify-between">
                            <div>
                                <div className="text-sm">
                                    Received INR
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timeStamp.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center ">
                                + Rs {t.amount / 100}
                            </div>
                        </div>
                    )}

                    {sent.map(t => 
                        <div className="flex justify-between">
                            <div>
                                <div className="text-sm">
                                    Sent INR
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timeStamp.toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                - Rs {t.amount / 100}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}