import { useState } from "react";
import image from "../../assets/vikaslogo.png";
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
    <div className="fixed  top-0  border-b border-gray-200/20 z-[100] backdrop-blur-sm w-full  ">
      <div className="flex  mx-auto  items-center justify-between px-3  lg:px-7   ">
        <a href="#master" className="block w-[12rem ] xl:mr-8 ">
          <img src={image} width={140} alt="MASTER" />
        </a>
        <nav
          className={`${openNavigation ? "flex overflow-scroll h-screen  bg-gradient-to-br from-blue-950 via-gray-950 to-black" : "hidden"
            }  fixed top-[55px] left-0 right-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className=" z-2 flex flex-col items-center justify-center m-auto lg:flex-row ">
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
        </nav>

        <div className="flex gap-4 items-center py-3 ">
          <Button link={"/signup"} className={`hidden lg:flex outline-gray-800`}>Sign Up</Button>
          <Button link={"/login"} className={`hidden lg:flex outline-gray-800`}>Log In</Button>
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
