import { useState } from "react";
import image from "../../public/vikaslogo.png";
import { navigation } from "../constants";
import Button from "./Button";
const Navbar = () => {
  const [openNavigation, setOpenNavigation] = useState(true);
  return (
    <div
      className={` justify-between flex items-center fixed top-0 left-0 backdrop-blur-sm border-b  border-gray-800  w-full`}
    >
      <div className="flex items-center justify-between mx-auto w-[95%] max-w-[1700px]  py-2 px-3 md:px-4 lg:px-5">
            <a href="#" className="">
            <img src={image} alt="VIKAS" width={150} />
            </a>

            <nav
            className={`${
                openNavigation ? "flex" : "hidden"
            }  lg:flex text-xl gap-4  flex-col lg:mx-auto lg:flex-row uppercase text-gray-500 font-extrabold`}
            >
            {navigation.map((item) => (
                <a
                key={item.id}
                href={item.url}
                className={`${
                    item.onlyMobile ? "hidden" : ""
                } hover:text-white relative sm:px-1 xl:px-6 ease-in-out transition-colors duration-200`}
                >
                {item.title}
                </a>
            ))}
            </nav>
            <div className="flex gap-4">
            <Button className={`hidden lg:flex`}>Sign Up</Button>
            <Button className={`hidden lg:flex`}>Log In</Button>
            </div>
      </div>
    </div>
  );
};

export default Navbar;
