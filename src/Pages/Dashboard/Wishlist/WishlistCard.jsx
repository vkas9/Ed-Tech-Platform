import { FiMoreVertical } from "react-icons/fi";
import ReactStars from "react-stars";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {
  PaymentComponent,
  deleteCartDetails,
  enrollCourse,
} from "../../../APIs/Authapi";
import { profileAction } from "../../../store/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { fetchEnrollData } from "../EnrolledCourse/fetchEnrollData";
import { CaluculateDuration } from "../../../components/core/auth/CaluculateDuration";

const WishlistCard = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enrolledCourse } = useSelector((store) => store.card);
  const { user: data, user } = useSelector((store) => store.profile);
  
  let time = CaluculateDuration(course);

  const handleCart = async () => {
    setLoading(true);
    try {
      const updatedUser = await deleteCartDetails(course?._id);
      dispatch(profileAction.setProfile(updatedUser));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollCourse = async () => {
    setLoading(true);
    try {
      const updatedUser = await enrollCourse(dispatch, { courseId: course?._id }, data, navigate);
      dispatch(profileAction.setProfile(updatedUser));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e) => {
    e.stopPropagation();

    if (user?.Courses?.includes(course._id)) {
      if (!enrolledCourse || enrolledCourse.length < user.Courses.length) {
        const controller = new AbortController();
        const signal = controller.signal;
        await fetchEnrollData(data, dispatch, signal);
      }
      navigate(`/dashboard/enrolled-courses/${uuidv4()}/${course._id}`);
    } else {
      if (e.target.innerText === "Enroll Now") {
        const paymentResponse = await PaymentComponent({ courseId: course._id });
        if (paymentResponse.status_code === 200) {
          await handleEnrollCourse();
        }
      } else {
        navigate(`/dashboard/wishlist/${uuidv4()}/${course._id}`);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex relative text-[1.1rem] overflow-x-auto justify-between flex-col sm:flex-row mr-5 rounded-xl mt-4 hover:cursor-pointer ${
        !isButtonHovered ? "active:bg-gray-300/20 sm:hover:bg-gray-300/20" : ""
      } bg-gray-300/10 max-w-[60rem] p-1`}
    >
      <div className="gap-1 p-2 sm:min-w-[351px] flex-col   pr-[2.2rem] overflow-auto vm:items-center flex">
        <div className="flex gap-3 flex-col  w-full vm:flex-row vm:items-center">
        <img
          src={course?.Thumbnail}
          alt="course-thumbnail"
          className="h-[110px] w-full xs:w-[200px] xs:max-w-[200px] vm:w-[160px] vm:max-w-[160px] object-cover rounded-lg"
        />

        <div className="vm:w-[120px] oi:w-[180px] ow:w-[220px] sm:w-[170px]   md:max-w-[220px] lg:w-[170px]">
          <h2 className="truncate">{course.CourseName}</h2>
          <p className="text-white/40 truncate text-[.9rem]">{course.CourseDescription}</p>
          <div className="flex gap-2 whitespace-nowrap overflow-auto items-center">
            <span>0.0</span>
            <ReactStars
              className="min-w-fit whitespace-nowrap overflow-auto"
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
      <div className="flex items-center gap-3 justify-between">
        <div className="vm:grid overflow-x-auto xd:w-[220px] grid-flow-col items-start gap-9">
          <div className="w-fit pl-2 vm:pl-4 flex  items-center">
            <span className="flex flex-col sm:items-center">
              <span className="text-white/40">Duration:</span>
              <span className="whitespace-nowrap">{time}</span>
            </span>
          </div>

          <div className="w-fit pl-2 vm:pl-4 flex items-center">
            <span className="flex flex-col sm:items-center">
              <span className="text-white/40">Price:</span>
              <span className="sm:block"> ₹{course.Price}</span>
            </span>
          </div>
        </div>
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="text-[1.1rem] ml-1 sm:ml-7 select-none min-w-[100px] vm:w-[120px] bg-white/10 text-center sm:hover:bg-white/20 active:bg-white/20 box-content p-2 transition-all hover:cursor-pointer duration-150 rounded-full"
        >
          {user?.Courses?.includes(course._id) ? (
            <span className="whitespace-nowrap">Go to Course</span>
          ) : (
            "Enroll Now"
          )}
        </div>
      </div>

      <button disabled={loading} className="sm:pr-4 md:pr-6">
        <RxCross2
          onClick={(e) => {
            e.stopPropagation();
            handleCart();
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="text-[1.7rem] absolute sm:ml-3 sm:static lg:top-1 lg:right-1 top-1 right-1 sm:-top-1 sm:-right-1 hover:bg-white/10 box-content p-2 md:p-3 transition-all hover:cursor-pointer duration-150 rounded-full"
        />
      </button>
    </div>
  );
};

export default WishlistCard;
