import SliderProfile from "../components/slider-profile";
import Navbar from "../components/Navbar";
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