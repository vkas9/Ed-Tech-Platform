import { useSelector,useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../APIs/Authapi";
import {profileAction} from "../../store/profileSlice"
const ProfileDropDown=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const {user,openNavigation,sidebarShow:show}= useSelector((store) => store.profile);
    const handleSubmit=(e)=>{
        
        e.preventDefault()
        
         if(show)dispatch(profileAction.setSidebarShow(!show))
         if(openNavigation) dispatch(profileAction.setOpenNavigation(!openNavigation))
        navigate("/dashboard/my-profile")

    }
    
    return (
        <div onClick={handleSubmit} className="h-[55px] lg:h-[40px]  hover:cursor-pointer mx-auto items-center flex justify-end md:my-[6px] lg:my-[14px]  ">
            <div className="rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px] ">
            <img src={user.avatar} alt="" className="rounded-full" /></div>
        </div>
    );

}
export default ProfileDropDown;

