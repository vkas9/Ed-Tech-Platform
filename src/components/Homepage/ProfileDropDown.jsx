import { useSelector,useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../../Auth/Authapi";
const ProfileDropDown=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch();
    
    var bytes  = CryptoJS.AES.decrypt(localStorage.getItem("user"), "EDVKAS9"); 
    var user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate("/dashboard/my-profile")

    }
    
    return (
        <div onClick={handleSubmit} className="h-[55px] lg:h-[40px]  hover:cursor-pointer mx-auto items-center flex justify-end my-[6px] lg:my-[14px]  ">
            <div className="rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px] ">
            <img loading="lazy" src={user.ProfilePicture} alt="" className="rounded-full" /></div>
        </div>
    );

}
export default ProfileDropDown;

