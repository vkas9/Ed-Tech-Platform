import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Auth/Authapi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const SidebarLink = ({ name, link, icon:Icon }) => {
  const location = useLocation();
  const dispatch=useDispatch();
 const navigation= useNavigate()
 const[confirmationModal,openConfirmationModal]=useState(null);
  const handleLogout=(e)=>{
    e.preventDefault();
    dispatch(logout(navigation));
    

}
    
  const Route = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const handleLogoutClick = () => {
    openConfirmationModal({
      text1: "Are You Sure?",
      text2: "You will be logged out of your Account",
      btn1Text: "Log out",
      btn2Text: "Cancel",
      btn1Handler: handleLogout,
      btn2Handler: () => openConfirmationModal(null),
    });
  };
  return (<>
    <Link onClick={name=="Log out"?handleLogoutClick:null}
    to={link!=""?link:null}
    className={`py-4 px-5 ${name=='Log out'?'hover:bg-red-900/30  transition-all duration-200 hover:border-r-4 border-red-900':'sm:hover:bg-blue-900/30 active:bg-blue-900/30 transition-all duration-200 hover:border-r-4 border-blue-900'}   ${
        Route(link) ? "bg-gradient-to-l from-blue-900/30 to-transparent border-r-4 border-blue-900 " : ""
      } `}
      >
      <div className="flex gap-2 text-white/90 items-center  ">
        <Icon size={25}/>
        <span className="overflow-x-auto ">{name}</span>
      </div>
    
    </Link>
    {confirmationModal && <ConfirmModal modalData={confirmationModal} /> }
      </>
  );
};
export default SidebarLink;
