import { FiMoreVertical } from "react-icons/fi";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  PaymentComponent,
  enrollCourse,
  getWishlistDetails,
  getPurchaseHistory,
  updateWishlistDetails,
  updatePurchaseHistory,
} from "../../../APIs/mainAPI";
import { useNavigate } from "react-router-dom";
import { profileAction } from "../../../store/profileSlice";
import { v4 as uuidv4 } from "uuid";
import { fetchEnrollData } from "../EnrolledCourse/fetchEnrollData";
import toast from "react-hot-toast";
import { CaluculateDuration } from "../../../components/core/auth/CaluculateDuration";
import StarRating from "../../../components/core/ReusableComponents/StarRating";

const ExploreCoursesCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [starCount, setStarCount] = useState(0);
  const { user } = useSelector((store) => store.profile);
  const { enrolledCourse } = useSelector((store) => store.card);
  let time = CaluculateDuration(course);
  const { user: data } = useSelector((store) => store.profile);
  const handleWishlist = async () => {
    setLoading(true);
    if (user?.Wishlist?.includes(course._id)) {
      navigate("/dashboard/wishlist");
      setLoading(false);
      return;
    }

    const updatedUser = await updateWishlistDetails(course?._id);
    dispatch(profileAction.setProfile(updatedUser));
    setLoading(false);
  };
  const handleEnrollCourse = async () => {
    setLoading(true);

    const updatedUser = await enrollCourse(
      dispatch,
      { courseId: course?._id },
      data,
      navigate
    );
    setLoading(false);
  };
  const handleClick = async (e) => {
    if (user?.Courses?.includes(course._id)) {
      if (!enrolledCourse || enrolledCourse.length < user.Courses.length) {
        const controller = new AbortController();
        const signal = controller.signal;

        await fetchEnrollData(data, dispatch, signal);
      }
      if (user?.role === "Instructor") {
        navigate(`/dashboard/my-courses/${uuidv4()}/${course._id}`);
      } else {
        navigate(`/dashboard/enrolled-courses/${uuidv4()}/${course._id}`);
      }
    } else {
      if (e.target.innerText === "Enroll Now") {
        const paymentResponse = await PaymentComponent({
          courseId: course._id,
        });
        if (paymentResponse.status_code === 200) {
          await handleEnrollCourse();
          await updatePurchaseHistory({ courseId: course._id });
          await getPurchaseHistory(dispatch);
        }
      } else {
        navigate(`/dashboard/courses/${uuidv4()}/${course._id}`);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex relative text-[1.1rem] justify-between overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex-col sm:flex-row mr-5 rounded-xl mt-4 hover:cursor-pointer ${
        !isButtonHovered ? "sm:hover:bg-gray-300/20" : ""
      } bg-gray-300/10 max-w-[60rem] p-1`}
    >
      <div className="gap-1  p-2 sm:min-w-[351px] flex-col  pr-[2.2rem] overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full  vm:items-center flex">
        <div className="flex gap-3 flex-col  w-full vm:flex-row vm:items-center">
          <img
            src={course?.Thumbnail}
            alt="course-thumbnail"
            className="h-[110px] w-full xs:w-[200px] xs:max-w-[200px] vm:w-[160px] vm:max-w-[160px] object-cover  rounded-lg"
          />

          <div className="vm:w-[120px] w-full  md:max-w-[220px] lg:w-[220px]">
            <h2 className="truncate">{course.CourseName}</h2>
            <p className="text-white/40 truncate text-[.9rem]">
              {course.CourseDescription}
            </p>
            <div className="flex gap-2  whitespace-nowrap overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full items-center">
              <span>3.9</span>
              <span onClick={(e)=>e.stopPropagation()} onMouseEnter={(e) => {
              e.stopPropagation();
              setIsButtonHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsButtonHovered(false);
            }} >

              <StarRating
              
              flag={true}
              starCount="4"
              
              />
              </span>
            </div>
          </div>
        </div>

        <div className=" w-full">
          <span className="text-white/50 text-sm">
            Created By:{" "}
            <span className="text-white whitespace-nowrap">
              {" "}
              {course?.Instructor?.FirstName} {course?.Instructor?.LastName}
            </span>
          </span>
        </div>
      </div>
      <div className="h-[1px] bg-white/10 mx-3 my-1" />

      <div className="flex xs:items-center gap-1 vm:gap-5 justify-between">
        <div className="vm:grid overflow-x-auto  items-center scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full xd:w-[320px] grid-flow-col  gap-2">
          <div className=" flex flex-col  items-center mr-5">

          
          <div className="w-fit pl-2 vm:pl-4 sm:pl-0 flex items-start vm:items-center">
            <span className=" flex flex-col flex-start vm:items-center">
              <span className="text-white/40  flex-start vm:text-center">Created at:</span>
              <span className="whitespace-nowrap">
                <span className="sm:block ">
                  {course.createdAt.slice(0, 10)}
                </span>
              </span>
            </span>
          </div>
          <div className="hidden vm:flex h-[1px] bg-white/10 my-1 w-full" />
          <div className="w-fit pl-2 vm:pl-4 sm:pl-0 flex  flex-start vm:items-center">
            <span className=" flex flex-col  flex-start vm:items-center">
              <span className="text-white/40 text-center">Upldated at:</span>
              <span className="whitespace-nowrap">
                <span className="sm:block text-center">
                  {course.updatedAt.slice(0, 10)}
                </span>
              </span>
            </span>
          </div>
          </div>
          <div className="w-fit  pl-2 vm:pl-4 sm:pl-0 flex  items-center">
            <span className=" flex flex-col sm :items-center">
              <span className="text-white/40">Duration:</span>
              <span className="whitespace-nowrap">
                <span className="sm:block vm:text-center">{time}</span>
              </span>
            </span>
          </div>

          <div className="w-fit pl-2 vm:pl-4 flex items-center">
            <span className=" flex flex-col sm:items-center">
              <span className="text-white/40">Price:</span>{" "}
              <span className="sm:block"> ₹{course.Price}</span>
            </span>
          </div>
        </div>
        <div
          className={`flex ${
            user?.role === "Instructor" && "hidden"
          }   md:mr-5 flex-col justify-center items-center gap-1`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsButtonHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsButtonHovered(false);
            }}
            className="text-[1.1rem] w-[120px] bg-white/10 text-center hover:bg-white/20 active:bg-white/20 box-content p-2 transition-all hover:cursor-pointer duration-150 rounded-full"
          >
            {user?.Courses?.includes(course._id) ? (
              <span>Go to Course</span>
            ) : (
              "Enroll Now"
            )}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsButtonHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsButtonHovered(false);
            }}
            className={`text-[1.1rem] ${
              user?.Courses?.includes(course._id) ? "hidden" : null
            } hover:text-white text-white/30 ${
              user?.role === "Instructor" && "hidden"
            } box-content p-2 whitespace-nowrap transition-all hover:cursor-pointer duration-150 rounded-full`}
          >
            {user?.Wishlist?.includes(course._id)
              ? "Go to Wishlist"
              : "Add to Wishlist"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCoursesCard;
