import { useEffect, useState } from "react";
import image from "../../assets/master.png";
import { navigation } from "../../constants";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Link, matchPath, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from "./ProfileDropDown";
import axios from "axios";


const Navbar = () => {
  const[catagory,setCatagory]=useState([]);
  useEffect(()=>{
    axios.get("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/getAllCatagory")
    .then(res=>{
      setCatagory(res.data.allCatagory);
      
      
      
    }).catch(error=>{
      console.log("error",error);
    })
  },[])

  const { token } = useSelector((store) => store.auth);
  const user=JSON.parse(localStorage.getItem("user"))
  const { totalItems } = useSelector((store) => store.card);
  const [openNavigation, setOpenNavigation] = useState(false);
  const location = useLocation();
  const Route = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
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
      className={`fixed  lg:backdrop-blur-md top-[15px]   rounded-b-[2.5rem] border-b border-gray-200/10 z-[100]  w-full ${
        openNavigation
          ? " bg-gradient-to-r from-blue-950  to-black"
          : " backdrop-blur-md"
      }  `}
    >
      <div className="flex  mx-auto  items-center min-h-[55px] justify-between px-3  lg:px-7   ">
        <Link to="/" className="block w-[12rem ] flex items-center  xl:mr-8 ">
          <img src={image} loading="lazy" className="lg:w-[200px]  w-[140px] " alt="MASTER" />
        </Link>

        <nav
          className={`${
            openNavigation
              ? "flex overflow-y-scroll bg-gradient-to-br from-blue-950 via-gray-950 to-black"
              : "hidden"
          } fixed top-[83px] rounded-t-[2.5rem]  left-0 right-0 bottom-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative lg:border-r lg:border-l border-gray-500/20 rounded-full  z-2 flex flex-col select-none lg:select-text items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <>
                {item.title === "Learn" ? (
                  <div
                    className={`flex   items-center gap-2  relative font-bold text-2xl uppercase ${
                      Route(item.url) ? "text-white" : "text-gray-500"
                    }   transition-colors lg:hover:cursor-pointer ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-2 py-6 md:py-4  lg:text-xl lg:font-bold group lg:leading-5 lg:hover:text-white xl:px-6  `}
                  >
                    <p className="select-none">{item.title}</p>
                    <IoIosArrowDown />
                    <div className="z-[200]  invisible group-hover:visible flex flex-col rounded-xl backdrop-blur-md bg-white -bottom-[115px] -right-[40px] transition-opacity opacity-0 group-hover:opacity-100 gap-4 py-4 duration-400  w-[250px]  absolute text-center ">
                      {catagory.length
                        ? catagory.map((item) => (
                            <Link
                              key={item.name}
                              to={item.link}
                              className="bg-gray-200 hover:bg-gray-500/60 rounded-md py-2 mx-2"
                              onClick={handleClick}
                            >
                              <p className="text-black">{item.name}</p>
                            </Link>
                          ))
                        : null}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    to={item.url}
                    onClick={handleClick}
                    className={`block relative font-bold text-2xl uppercase ${
                      Route(item.url) ? "text-white" : "text-gray-500"
                    }   transition-colors lg:hover:cursor-pointer ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-2 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-6`}
                  >
                    {item.title}
                  </Link>
                )}
              </>
            ))}
          </div>
        </nav>
        <div className={`flex ${user!=null?"gap-4 ml-[7vw]":"gap-6"}   items-center `}>
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/card" className="relative ">
              <FaCartShopping size={20} />
              {totalItems > 0 ? (
                <span className="absolute -top-[10px] -right-[10px] ">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          )}
          {token === null ? (
            <div className="flex gap-4 font-bold items-center py-3 ">
              <Button
                link={"/signup"}
                className={`hidden rounded-full lg:flex  outline-none hover:border-white border-r border-l border-gray-500/60  lg:hover:bg-white lg:active:bg-gray-300  lg:hover:text-black py-2 `}
              >
                Sign Up
              </Button>
              <Button
                link={"/login"}
                className={`hidden rounded-full lg:flex outline-none border-r border-l hover:border-white border-gray-500/60 lg:hover:bg-white lg:active:bg-gray-300 lg:hover:text-black py-2`}
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
          ) : null}
          {token !== null ? <ProfileDropDown /> : null}
          {token !== null ? openNavigation ? (
                <ImCross
                  onClick={toggle}
                  className="md:text-3xl text-2xl hover:cursor-pointer  lg:hidden "
                />
              ) : (
                <GiHamburgerMenu
                  onClick={toggle}
                  className="md:text-3xl text-2xl hover:cursor-pointer  lg:hidden "
                />
              ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
