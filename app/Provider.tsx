"use client"
import { SessionProvider } from "next-auth/react"


interface ProvidersProps{
    children:React.ReactNode;
}

export  function Provider({children}:ProvidersProps){
    return(
        <SessionProvider >
                {children}
        </SessionProvider>
    )
}