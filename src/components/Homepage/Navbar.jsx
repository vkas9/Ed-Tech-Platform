import { useEffect, useState } from "react";
import image from "../../assets/master.webp";
import { navigation } from "../../constants";
import Button from "./Button";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropDown from "./ProfileDropDown";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import SubTitle from "./SubTitle";
import { courseAction } from "../../store/courseSlice";
import { getAllInstructorCourses, logout } from "../../APIs/mainAPI";
import ConfirmModal from "../../Pages/Dashboard/ConfirmModal";
import { profileAction } from "../../store/profileSlice";
import { decryptData } from "../core/auth/crypto";
import toast from "react-hot-toast";

const Navbar = () => {
  const [name, setName] = useState(null);
  const [catagory, setCatagory] = useState([]);
  const dispatch = useDispatch();
  const { exploreAllCourses } = useSelector((store) => store.course);
  const { openNavigation, sidebarShow: show } = useSelector(
    (store) => store.profile
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/beta/course/getAllCatagory`)
      .then((res) => {
        const decryptAllCategory = decryptData(res.data.allCatagory);
        setCatagory(decryptAllCategory);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);
  const toggle = () => {
    dispatch(profileAction.setOpenNavigation(!openNavigation));
  };
  const navigate = useNavigate();
  const location = useLocation();
  const Route = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClick2 = async () => {
    if (user && user.role === "Instructor") {
      // toast("To purchase these courses, you must switch to Student mode", {
      //   icon: '',
      // });
      if (!exploreAllCourses) {
        const controller = new AbortController();
        const signal = controller.signal;
        const courseData = await getAllInstructorCourses(signal);
        dispatch(courseAction.setIC(courseData));
      }

      navigate("/dashboard/courses/cloud-computing");

      openNavigation && toggle();
    }
    if (!name) {
      setName("dfd");
    } else {
      setName(null);
    }
  };
  const [confirmationModal, openConfirmationModal] = useState(null);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
    openConfirmationModal(null);
    if (!openNavigation) return;

    toggle();
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
  const handleClick = (e) => {
    if (e.target.innerHTML == "Log Out") {
      handleLogoutClick();
    } else {
      if (show) dispatch(profileAction.setSidebarShow(!show));
      if (!openNavigation) return;
      toggle();
    }
  };
  return (
    <div
      className={`fixed   lg:backdrop-blur-md top-[15px] h-[55px] md:h-[69px]  rounded-b-[2.5rem] border-b border-gray-200/10 z-[100]  w-full ${
        openNavigation
          ? " bg-gradient-to-r from-blue-950  to-black"
          : " backdrop-blur-md"
      }  `}
    >
      <div className="flex  mx-auto  items-center min-h-[55px] justify-between px-3  lg:px-7   ">
        <Link
          to="/"
          onClick={handleClick}
          className="block w-[12rem ] flex items-center  xl:mr-8 "
        >
          <ScrollLink
            to="home-section"
            smooth={true}
            duration={500}
            onClick={() => {
              openNavigation && toggle();
              navigate("/");
            }}
          >
            <img
              src={image}
              className="lg:w-[200px]  w-[140px] "
              alt="MASTER"
            />
          </ScrollLink>
        </Link>
        {/* top-[70px] */}
        <nav
          className={`${
            openNavigation
              ? "flex overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full bg-gradient-to-br from-blue-950 via-gray-950 to-black"
              : "hidden"
          } fixed top-[70px] md:top-[84px] rounded-t-[2.5rem]  left-0 right-0 bottom-0  lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative lg:border-r lg:border-l border-gray-500/30 rounded-full  z-2 flex flex-col select-none lg:select-text items-center justify-center m-auto lg:flex-row">
            {navigation.map((item, index) => (
              <div key={index}>
                {item.title === "Learn" ? (
                  <div
                    key={index}
                    onMouseEnter={() => {
                      setName("sfsdaf");
                    }}
                    onMouseLeave={() => {
                      setName(null);
                    }}
                    //
                    onClick={handleClick2}
                    className={`flex items-center gap-2  relative font-bold text-2xl uppercase ${
                      Route(item.url) ? "text-white" : "text-gray-500"
                    }   transition-colors lg:hover:cursor-pointer ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-2 py-6 md:py-4  lg:text-xl lg:font-bold group lg:leading-5 lg:hover:text-white xl:px-6  `}
                  >
                    <p className="select-none">
                      {user && user.role == "Instructor"
                        ? "All Courses"
                        : item.title}
                    </p>
                    {user && user.role == "Instructor" ? null : (
                      <IoIosArrowDown />
                    )}
                    {user && user.role === "Instructor" ? null : name ? (
                      <SubTitle catagory={catagory} />
                    ) : null}
                  </div>
                ) : user ? (
                  item.title !== "Pricing" ? (
                    <Link
                      key={index}
                      to={item.title !== "Log Out" && item.url}
                      onClick={handleClick}
                      className={`block relative  font-bold text-2xl uppercase ${
                        Route(item.url) ? "text-white" : "text-gray-500"
                      }   transition-colors lg:hover:cursor-pointer ${
                        user?.role === "Instructor" &&
                        item.title === "Pricing" &&
                        "hidden"
                      } ${
                        item.title === "New Account" || item.title === "Sign in"
                          ? "hidden"
                          : ""
                      } ${
                        item.onlyMobile ? "lg:hidden" : ""
                      } px-2 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-6`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <ScrollLink
                      to="pricing-section"
                      smooth={true}
                      duration={500}
                      className={`block relative font-bold text-2xl uppercase ${
                        user?.role === "Instructor" && "hidden"
                      } ${
                        Route(item.url) ? "text-white" : "text-gray-500"
                      }   transition-colors lg:hover:cursor-pointer ${
                        item.title === "Log Out" ? "hidden" : ""
                      } ${
                        item.onlyMobile ? "lg:hidden" : ""
                      } px-2 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-6`}
                      onClick={() => {
                        openNavigation && toggle();
                        navigate("/");
                      }}
                    >
                      Pricing
                    </ScrollLink>
                  )
                ) : item.title !== "Pricing" ? (
                  <Link
                    key={index}
                    to={item.url}
                    onClick={handleClick}
                    className={`block relative font-bold text-2xl uppercase ${
                      Route(item.url) ? "text-white" : "text-gray-500"
                    }   transition-colors lg:hover:cursor-pointer ${
                      item.title === "Log Out" ? "hidden" : ""
                    } ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-2 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-6`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <ScrollLink
                    to="pricing-section"
                    smooth={true}
                    duration={500}
                    className={`block relative font-bold text-2xl uppercase  ${
                      user?.role === "Instructor" && "hidden"
                    } ${
                      Route(item.url) ? "text-white" : "text-gray-500"
                    }   transition-colors lg:hover:cursor-pointer ${
                      item.title === "Log Out" ? "hidden" : ""
                    } ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-2 py-6 md:py-4  lg:text-xl lg:font-bold  lg:leading-5 lg:hover:text-white xl:px-6`}
                    onClick={() => {
                      openNavigation && toggle();
                      navigate("/");
                    }}
                  >
                    Pricing
                  </ScrollLink>
                )}
              </div>
            ))}
          </div>
        </nav>
        <div
          className={`flex ${
            user != null ? "gap-4 ml-[7vw]" : "gap-6"
          }   items-center `}
        >
          {user && user?.role != "Instructor" ? (
            <Link
              to="/dashboard/wishlist"
              onClick={(e) => {
                e.stopPropagation();
                openNavigation && toggle();
                if (show) dispatch(profileAction.setSidebarShow(!show));
              }}
              className="relative "
            >
              <FaCartShopping size={20} />
              {user?.Wishlist?.length > 0 ? (
                <span className="absolute -top-[11px] -right-[11px] ">
                  {user?.Wishlist?.length}
                </span>
              ) : null}
            </Link>
          ) : (
            user &&
            user?.role == "Instructor" && (
              <p className="hidden sm:flex uppercase font-bold ai text-yellow-500 select-none shadow-md drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
                Instructor
              </p>
            )
          )}

          {token === null ? (
            <div className="flex gap-4 font-bold items-center py-3 ">
              <Button
                link={"/signup/i/student"}
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
          {token !== null ? (
            openNavigation ? (
              <ImCross
                onClick={toggle}
                className="md:text-3xl text-2xl hover:cursor-pointer  lg:hidden "
              />
            ) : (
              <GiHamburgerMenu
                onClick={toggle}
                className="md:text-3xl text-2xl hover:cursor-pointer  lg:hidden "
              />
            )
          ) : null}
        </div>
      </div>
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </div>
  );
};

export default Navbar;
