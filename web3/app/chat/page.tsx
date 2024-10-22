import Navbar from "../components/Navbar";

export default function Chat() {
    return(
        <div className="flex w-full flex-col justify-between items-center">
            <Navbar/>
            <div className="flex flex-col w-10/12 max-w-[1535px] text-xl">
                <div>
                    rest of the things
                </div>
            </div>
        </div>
    )
}