import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../APIs/mainAPI";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { profileAction } from "../../store/profileSlice";

const SidebarLink = ({ name, link, icon: Icon }) => {
  const location = useLocation();
  const { sidebarShow: show } = useSelector((store) => store.profile);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [confirmationModal, openConfirmationModal] = useState(null);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(navigation));
  };

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
  return (
    <>
      <Link
        onClick={
          name == "Log out"
            ? handleLogoutClick
            : () =>
                show ? dispatch(profileAction.setSidebarShow(!show)) : null
        }
        to={link != "" ? link : null}
        className={`py-4 px-5 ${
          name == "Log out"
            ? "sm:hover:bg-red-900/30 active:bg-red-900/30  transition-all duration-200 active:border-l-4 md:active:border-l-0 md:hover:border-r-4 border-red-900"
            : "sm:hover:bg-blue-900/30 active:bg-blue-900/30 transition-all duration-200 active:border-l-4 md:active:border-l-0  md:hover:border-r-4 border-blue-900"
        }   ${
          Route(link)
            ? "bg-gradient-to-r md:bg-gradient-to-l from-blue-900/30 to-transparent border-l-4 md:border-l-0 md:border-r-4 border-blue-900 "
            : ""
        } `}
      >
        <div className="flex gap-2 text-white/90 items-center  ">
          <Icon size={25} className="min-w-[20px]" />
          <span className="overflow-x-auto ">{name}</span>
        </div>
      </Link>
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
};
export default SidebarLink;
