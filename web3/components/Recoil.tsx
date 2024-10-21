"use client"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil"
type RecoilSetupProps = {
    children: ReactNode;
}
export default function RecoilSetup({children}:RecoilSetupProps){
    return(
        <RecoilRoot>
            <Toaster/>
            {children}
        </RecoilRoot>
    )
}