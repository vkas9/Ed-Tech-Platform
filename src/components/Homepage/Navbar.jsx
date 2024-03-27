import { useState } from "react";
import image from "../../assets/master.png";
import { navigation } from "../../constants";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Link, matchPath, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const location = useLocation();
  const Route=(route)=>{
     return matchPath({path:route},location.pathname)
  }
  const toggle = () => {
    if (!openNavigation) {
      disablePageScroll();
      setOpenNavigation(true);
    } else {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };
  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(!openNavigation);
  };
  return (
    <div
      className={`fixed  lg:backdrop-blur-md top-0   border-b border-gray-200/20 z-[100]  w-full ${
        openNavigation
          ? " bg-gradient-to-r from-blue-950  to-black"
          : " backdrop-blur-md"
      }  `}
    >
      <div className="flex  mx-auto  items-center justify-between px-3  lg:px-7   ">
        <Link to="/" className="block w-[12rem ] flex items-center  xl:mr-8 ">
          <img src={image} className="lg:w-[200px]  w-[140px] " alt="MASTER" />
        </Link>
        
        <nav
          className={`${
            openNavigation
              ? "flex overflow-y-scroll bg-gradient-to-br from-blue-950 via-gray-950 to-black"
              : "hidden"
          } fixed top-[55px]    left-0 right-0 bottom-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative font-bold text-2xl uppercase ${Route(item.url)?"text-white":"text-gray-500"}   transition-colors lg:hover:cursor-pointer ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-2 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-6`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex gap-4 font-bold items-center py-3 ">
          <Button
            link={"/signup"}
            className={`hidden lg:flex outline-gray-800/40 py-2 `}
          >
            Sign Up
          </Button>
          <Button
            link={"/login"}
            className={`hidden lg:flex outline-gray-800/40 py-2`}
          >
            Log In
          </Button>
          {openNavigation ? (
            <ImCross
              onClick={toggle}
              className="text-3xl hover:cursor-pointer  lg:hidden "
            />
          ) : (
            <GiHamburgerMenu
              onClick={toggle}
              className="text-3xl hover:cursor-pointer  lg:hidden "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
