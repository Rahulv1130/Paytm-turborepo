import { Card } from "@repo/ui/card";


export function BalanceCard({amount,locked}: {amount: number , locked: number}){
    return(
        <Card title="Balance">

            <div className="flex justify-between border-b py-2 border-slate-300">
                <div>
                    Unlocked Balance
                </div>
                <div>
                    {amount / 100} INR
                </div>
            </div>

            <div className="flex justify-between border-b py-2 border-slate-300">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {locked / 100} INR
                </div>
            </div>

            <div className="flex justify-between border-b py-2 border-slate-300">
                <div>
                    Total Balance
                </div>
                <div>
                    {(locked + amount) / 100} INR
                </div>
            </div>
        </Card>
    )
}