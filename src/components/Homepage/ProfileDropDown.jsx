import { useSelector } from "react-redux";

const ProfileDropDown=()=>{
    
    const user=JSON.parse(localStorage.getItem("user"))
    return (
        <div className=" h-[40px]  mx-auto flex justify-end my-[6px] lg:my-[14px]  ">
            <div className="rounded-full h-[40px] w-[40px] ">
            <img src={user.ProfilePicture} alt="" className="rounded-full" /></div>
        </div>
    );

}
export default ProfileDropDown;

