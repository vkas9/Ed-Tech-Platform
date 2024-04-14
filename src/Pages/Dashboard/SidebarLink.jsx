import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Auth/Authapi";
import { useDispatch } from "react-redux";

const SidebarLink = ({ name, link, icon:Icon }) => {
  const location = useLocation();
  const dispatch=useDispatch();
 const navigation= useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(logout(navigation));
    

}
    
  const Route = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <Link onClick={name=="Log out"?handleSubmit:null}
    to={link}
    className={`py-4 px-5  hover:bg-blue-900/30 transition-all duration-200 hover:border-r-4 border-blue-900  ${
        Route(link) ? "bg-blue-900/20 border-r-4 border-blue-900 " : ""
      } `}
    >
      <div className="flex gap-2 items-center  ">
        <Icon size={25}/>
        <span>{name}</span>
      </div>
    </Link>
  );
};
export default SidebarLink;
