'use client'
import { useState } from "react"

export default function ChatArea() {
    const [text, setText] = useState("");

    const textHandeler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        console.log(text);
    }

    return(
        <div className="flex flex-col gap-y-4 min-h-[55vh] justify-end w-full items-center">
            <div className="flex flex-col gap-y-4 w-full">
                <div className="flex justify-center self-end items-center w-full">
                    chat area
                </div>
                <div className="flex gap-x-3 justify-between self-end text-xl items-center w-full">
                    <input placeholder="Text..." className="rounded-lg bg-[#3D5473] w-11/12 px-4 py-2 placeholder:text-[#BDD9F2]" onChange={textHandeler} />
                    <div className="bg-[#BDD9F2] p-2 text-[#3D5473] rounded-lg">
                        send
                    </div>
                </div>
            </div>
        </div>
    )
}