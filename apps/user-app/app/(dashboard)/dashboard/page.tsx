
import { Button } from "@repo/ui/button";
import { getUser , getBalance } from "../../api/lib/actions/getUser"
import { DashButton } from "./DashButton";
import { AddMoney } from "./AddMoney";

export default async function() {
    
    const user = await getUser();
    const balance = await getBalance();


    return (
        <div>
            <div className="font-bold text-3xl text-center p-4">
                Welcome to Paytm
            </div>
            <div className="font-semibold text-xl p-4">
                Your Details are as Follows :
            </div>
            <div className="flex justify-center pt-5">
                <div className="text-lg border-2 rounded-lg p-5 w-fit">
                    <div className="p-1">
                        Name &nbsp;&nbsp;:-&nbsp;&nbsp; {user?.name}
                    </div>
                    <div className="p-1">
                        Number &nbsp;&nbsp;:-&nbsp;&nbsp; {user?.number}
                    </div>
                    <div className="p-1">
                        Email &nbsp;&nbsp;:-&nbsp;&nbsp; {user?.email}
                    </div>
                    <div className="p-1">
                        Balance &nbsp;&nbsp;:-&nbsp;&nbsp; {balance?.amount ? balance?.amount/100 : 0}
                    </div>
                </div>
            </div>
            <div className="text-center pt-4">
                <DashButton />
            </div>
            <div className="font-light">
                Note: Normally, Money is added through Transfer section that send a request to your bank, but if you want to test the website, you can add Rs. 200 directly by clicking here :
                <AddMoney />
            </div>
        </div>
    )
}