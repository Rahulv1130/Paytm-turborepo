import React from "react";


export const Center = ({children}: {children: React.ReactNode}) => {
    return(
        <div className="flex justify-center h-full place-items-center">
            <div>
                {children}
            </div>
        </div>
    )
}