"use client"

export default function({onSignin , onSignout , user}: any){
    return(
        
            <div className="flex justify-between px-4 pt-2 border-2">
                
                <div className="text-xl font-semibold p-1 ">
                    Paytm
                </div>

                <div className="">
                    <button onClick={user ? onSignout : onSignin} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{user ? "LogOut" : "Login"}</button>
                </div>

            </div>
        
    )
}