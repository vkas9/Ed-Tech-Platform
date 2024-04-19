import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Auth/Authapi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const SidebarLink = ({ name, link, icon:Icon }) => {
  const location = useLocation();
  const dispatch=useDispatch();
 const navigation= useNavigate()
 const[confirmationModal,setConfirmationModal]=useState(null);
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(logout(navigation));
    

}
    
  const Route = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (<>
    <Link onClick={name=="Log out"?() => 
           
           setConfirmationModal({
      text1: "Are You Sure ?",
      text2: "You will be logged out of your Account",
      btn1Text: "Log out",
      btn2Text: "Cancel",
      btn1Handler: handleSubmit,
      btn2Handler: () => setConfirmationModal(null),
    }):null}
    to={link!=""?link:null}
    className={`py-4 px-5 ${name=='Log out'?'hover:bg-red-900/30  transition-all duration-200 hover:border-r-4 border-red-900':'hover:bg-blue-900/30 transition-all duration-200 hover:border-r-4 border-blue-900'}   ${
        Route(link) ? "bg-gradient-to-l from-blue-900/30 to-transparent border-r-4 border-blue-900 " : ""
      } `}
      >
      <div className="flex gap-2 items-center  ">
        <Icon size={25}/>
        <span>{name}</span>
      </div>
    
    </Link>
    {confirmationModal && <ConfirmModal modalData={confirmationModal} /> }
      </>
  );
};
export default SidebarLink;
