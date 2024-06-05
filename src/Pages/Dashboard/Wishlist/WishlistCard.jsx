import { FiMoreVertical } from "react-icons/fi";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { deleteCartDetails } from "../../../APIs/Authapi";
import { profileAction } from "../../../store/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const WishlistCard = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const { user } = useSelector((store) => store.profile);
  const handleClick = () => {
    if (user?.Courses?.includes(course._id))
      navigate(`/dashboard/enrolled-courses`);
    else navigate(`/dashboard/wishlist/${uuidv4()}/${course._id}`);
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      className="flex relative text-[1.1rem] justify-between flex-col sm:flex-row mr-5  rounded-xl mt-4 hover:cursor-pointer hover:bg-gray-300/20 bg-gray-300/10 max-w-[60rem] p-1  "
    >
      <div className="gap-3 p-2 overflow-auto items-center flex">
        <img
          src={course?.Thumbnail}
          alt="course-thumbnail"
          className="w-[160px] h-[110px] max-w-[160px] object-cover  rounded-lg "
        />

        <div className=" w-[200px]">
          <h2>{course.CourseName}</h2>
          <p className="text-white/40 text-[.9rem] ">
            {course.CourseDescription}
          </p>
          <div className="flex gap-2 whitespace-nowrap overflow-auto items-center">
            <span>4.8</span>
            <ReactStars className=" min-w-fit  whitespace-nowrap overflow-auto  "
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
      <div className="h-[1px] bg-white/10 mx-3 my-1  " />
      <div className="flex items-center gap-3 justify-between">

      <div className="vm:grid grid-flow-col items-start  gap-2">
      <div className=" w-fit pl-4  flex items-center ">
        <span className="">
          {" "}
          <span className="text-white/40">Duration:</span> {course?.duration}5hr
          45m
        </span>
      </div>

      <div className=" w-fit pl-4 flex items-center ">
        <span className="">
          {" "}
          <span className="text-white/40">Price:</span> ₹{course.Price}
        </span>
      </div>
      </div>
      <div
            onClick={(e) => e.stopPropagation()}
            className="text-[1.1rem] bg-white/10 text-center hover:bg-green-500/20 active:bg-green-500/30  box-content p-2 w-[50px] transition-all hover:cursor-pointer duration-150 rounded-full  "
          >
            Buy
          </div>
      </div>

      <button disabled={loading} className="rounded-full mr-3  ">
        <RxCross2
          onClick={(e) => {
            e.stopPropagation();
            handleCart();
          }}
          className="text-[1.7rem] absolute md:relative  top-1 right-1 hover:bg-white/10 box-content p-2 md:p-3 transition-all hover:cursor-pointer duration-150 rounded-full  "
        />
      </button>
    </div>
  );
};
export default WishlistCard;
