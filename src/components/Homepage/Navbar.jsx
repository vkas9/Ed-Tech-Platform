import { useState } from "react";
import image from "../../assets/master.png";
import { navigation } from "../../constants";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const Navbar = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
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
    <div className={`fixed  lg:backdrop-blur-md top-0  lg:${()=>toggle()} border-b border-gray-200/20 z-[100]  w-full ${
      openNavigation ? " bg-gradient-to-r from-blue-950  to-black" : " backdrop-blur-md"
    }  `}>
      <div className="flex  mx-auto  items-center justify-between px-3  lg:px-7   ">
        <a href="#master" className="block w-[12rem ] flex items-center  xl:mr-8 ">
          <img src={image} className="lg:w-[200px]  w-[140px] "  alt="MASTER" />
        </a>
        {/* <nav
          className={`${openNavigation ? "flex  " : "hidden"
            }  fixed top-[55px] left-0 right-0 bottom-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className=" z-2 flex flex-col text-2xl items-center justify-center m-auto lg:flex-row ">
            {navigation.map((item) => (
              <a
                onClick={handleClick}
                className={`block relative text-md py-6 lg:px-4 px-7 uppercase lg:text-gray-500 font-bold lg:font-semibold lg:hover:text-white transition-colors duration-200 ${item.onlyMobile ? "lg:hidden" : ""
                  } lg:font-bold `}
                href={item.url}
                key={item.id}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav> */}
        <nav
          className={`${
            openNavigation ? "flex overflow-y-scroll bg-gradient-to-br from-blue-950 via-gray-950 to-black" : "hidden"
          } fixed top-[55px]    left-0 right-0 bottom-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-bold text-2xl uppercase text-gray-500 transition-colors lg:hover:cursor-pointer ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

         
        </nav>

        <div className="flex gap-4 font-bold items-center py-3 ">
          <Button link={"/signup"} className={`hidden lg:flex outline-gray-800/40 py-2 `}>Sign Up</Button>
          <Button link={"/login"} className={`hidden lg:flex outline-gray-800/40 py-2`}>Log In</Button>
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
