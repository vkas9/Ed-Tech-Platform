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

const WishlistCard = ({ course}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCart = async () => {
    const updatedUser = await deleteCartDetails(course?._id);
    dispatch(profileAction.setProfile(updatedUser));
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
      className="flex text-[1.1rem] justify-between flex-col sm:flex-row mr-5 items-center hover:cursor-pointer active:bg-gray-300/20 sm:hover:bg-gray-300/20 rounded-xl mt-4 bg-gray-300/10 max-w-[60rem] p-1  "
    >
      <div className="gap-3 p-2 items-center flex">
        <img
          src={course?.Thumbnail}
          alt="course-thumbnail"
          className="w-[120px] h-[90px] max-w-[120px] object-cover  rounded-lg "
        />

        <div className=" w-[200px]">
          <h2>{course.CourseName}</h2>
          <p className="text-white/40 text-[.9rem] ">
            {course.CourseDescription}
          </p>
          <div className="flex gap-2 items-center">
            <span>4.8</span>
            <ReactStars
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
      <div className="">
        <span>Duration: {course?.duration ? "" : "2 hr"}</span>
      </div>
      <div className="flex items-center gap-7 mr-3 ">
        <p className=" w-[100px]">
          {" "}
          <span className="text-white/60 ">Price:</span> ₹{course.Price}
        </p>
        <div className=" flex items-center gap-1 ">
          <div
            onClick={(e) => e.stopPropagation()}
            className="text-[1.1rem] bg-white/10 text-center hover:bg-green-500/20 active:bg-green-500/30  box-content p-2 w-[50px] transition-all hover:cursor-pointer duration-150 rounded-full  "
          >
            Buy
          </div>
          <RxCross2
            onClick={(e) => {
              e.stopPropagation();
              handleCart();
            }}
            className="text-[1.5rem] hover:bg-white/10 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full  "
          />
        </div>
      </div>
    </div>
  );
};
export default WishlistCard;
