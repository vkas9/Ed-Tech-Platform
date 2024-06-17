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
  getCartDetails,
  updateCartDetails,
} from "../../../APIs/Authapi";
import { useNavigate } from "react-router-dom";
import { profileAction } from "../../../store/profileSlice";
import { v4 as uuidv4 } from "uuid";
import { fetchEnrollData } from "../EnrolledCourse/fetchEnrollData";
import toast from "react-hot-toast";
import { CaluculateDuration } from "../../../components/core/auth/CaluculateDuration";

const ExploreCoursesCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.profile);
  const { enrolledCourse } = useSelector((store) => store.card);
  let time = CaluculateDuration(course);
  const { user: data } = useSelector((store) => store.profile);
  const handleCart = async () => {
    setLoading(true);
    if (user?.Cart?.includes(course._id)) {
      navigate("/dashboard/wishlist");
      setLoading(false);
      return;
    }

    const updatedUser = await updateCartDetails(course?._id);
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
      navigate(`/dashboard/enrolled-courses/${uuidv4()}/${course._id}`);
    } else {
      if (e.target.innerText === "Enroll Now") {
        const paymentResponse = await PaymentComponent({
          courseId: course._id,
        });
        if (paymentResponse.status_code === 200) {
          await handleEnrollCourse();
        }
      } else {
        navigate(`/dashboard/courses/${uuidv4()}/${course._id}`);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex relative text-[1.1rem] justify-between overflow-x-auto flex-col sm:flex-row mr-5 rounded-xl mt-4 hover:cursor-pointer ${
        !isButtonHovered ? "sm:hover:bg-gray-300/20" : ""
      } bg-gray-300/10 max-w-[60rem] p-1`}
    >
      <div className="gap-1  p-2 sm:min-w-[351px] flex-col  pr-[2.2rem] overflow-auto  vm:items-center flex">
        <div className="flex gap-3 flex-col  w-full vm:flex-row vm:items-center">
          <img
          src={course?.Thumbnail}
          alt="course-thumbnail"
          className="w-[160px] h-[110px] max-w-[160px] object-cover rounded-lg"
        />

        <div className="vm:w-[120px] w-full  md:max-w-[220px] lg:w-[220px]">
          <h2 className="truncate">{course.CourseName}</h2>
          <p className="text-white/40 truncate text-[.9rem]">
            {course.CourseDescription}
          </p>
          <div className="flex gap-2  whitespace-nowrap overflow-auto items-center">
            <span>0.0</span>
            <ReactStars
              className="min-w-fit hidden truncate xs:flex whitespace-nowrap overflow-auto"
              count={5}
              size={25}
              edit={false}
              activeColor="#ffd700"
              emptyIcon={<FaRegStar />}
              fullIcon={<FaStar />}
            />
          </div>
        </div>
        </div>

        <div className=" w-full">
          <span className="text-white/50 text-sm">Created By: <span className="text-white whitespace-nowrap"> {course?.Instructor?.FirstName} {course?.Instructor?.LastName}</span></span>
        </div>
        
      </div>
      <div className="h-[1px] bg-white/10 mx-3 my-1" />

      <div className="flex xs:items-center gap-1 vm:gap-5 justify-between">
        <div className="vm:grid overflow-x-auto xd:w-[320px] grid-flow-col items-start gap-2">
          <div className="w-fit pl-2 vm:pl-4 sm:pl-0 flex items-center">
            <span className=" flex flex-col sm:items-center">
              <span className="text-white/40">Created at:</span>
              <span className="whitespace-nowrap">
                <span className="sm:block">
                  {course.createdAt.slice(0, 10)}
                </span>
              </span>
            </span>
          </div>
          <div className="w-fit pl-2 vm:pl-4 sm:pl-0 flex items-center">
            <span className=" flex flex-col sm:items-center">
              <span className="text-white/40">Duration:</span>
              <span className="whitespace-nowrap">
                <span className="sm:block">{time}</span>
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
        <div className={`flex ${user?.role==="Instructor"&&"hidden"}   md:mr-5 flex-col justify-center items-center gap-1`}>
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
              handleCart();
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
            } hover:text-white text-white/30 ${user?.role==="Instructor"&&"hidden"} box-content p-2 transition-all hover:cursor-pointer duration-150 rounded-full`}
          >
            {user?.Cart?.includes(course._id) ? "Go to Cart" : "Add to Cart"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCoursesCard;
