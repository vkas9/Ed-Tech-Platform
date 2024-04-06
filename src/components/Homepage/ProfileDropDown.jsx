import { useSelector } from "react-redux";

const ProfileDropDown=()=>{
    
    const user=JSON.parse(localStorage.getItem("user"))
    return (
        <div className=" h-[40px] hover:cursor-pointer mx-auto items-center flex justify-end my-[6px] lg:my-[14px]  ">
            <div className="rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px] ">
            <img src={user.ProfilePicture} alt="" className="rounded-full" /></div>
        </div>
    );

}
export default ProfileDropDown;

