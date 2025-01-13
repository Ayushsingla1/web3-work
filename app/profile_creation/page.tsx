import SliderProfile from "../../components/ui/slider-profile";
import Navbar from "../../components/ui/Navbar";
const Profile = () => {
    return (
        <div className="bg-[#1D2C40] flex flex-col h-screen w-screen">
            <Navbar />
            <div className="flex justify-center items-center w-full h-full">
                <SliderProfile />
            </div>
        </div>
    )
}

export default Profile;