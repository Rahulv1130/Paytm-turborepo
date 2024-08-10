"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { createOnRampTransactions } from "../app/api/lib/actions/createOnRampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}, {
    name: "Kotak Mahindra Bank",
    redirectUrl: "https://netbanking.kotak.com/"
}];

export function AddMoneyCard() {

    const [amount,setAmount] = useState(0);
    const [redirectUrl,setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

    return(
        <Card title="Add Money">

            <TextInput label="Amount" placeholder="Enter Amount" onChange={(e) => {setAmount(Number(e))}}></TextInput>

            <div className="mt-6 mb-3">
                Bank
            </div>

            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />

            <div className="text-center mt-4">
                <Button onClick={ async () => {
                    const res = await createOnRampTransactions(provider,amount);
                    window.location.href = redirectUrl || "";
                }}> Add Money </Button>
            </div>

        </Card>
    )
}