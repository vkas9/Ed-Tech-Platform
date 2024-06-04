import { FiMoreVertical } from "react-icons/fi";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getCartDetails, updateCartDetails } from "../../../APIs/Authapi";
import { useNavigate } from "react-router-dom";
import { profileAction } from "../../../store/profileSlice";
import { v4 as uuidv4 } from "uuid";

const ExploreCoursesCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} =  useSelector((store) => store.profile);

  const handleCart = async () => {
    setLoading(true)
    if (user?.Cart?.includes(course._id)) {
      navigate("/dashboard/wishlist");
      setLoading(false)
      return;
    }

    const updatedUser = await updateCartDetails(course?._id);
    dispatch(profileAction.setProfile(updatedUser));
    // navigate("/dashboard/wishlist");
    setLoading(false)
  };
 
  const handleClick=()=>{
    
    if(user?.Courses?.includes(course._id))  navigate(`/dashboard/enrolled-courses`); 
    else  navigate(`/dashboard/courses/${uuidv4()}/${course._id}`); 
  }

  return (
    <div onClick={handleClick} className="flex text-[1.1rem] justify-between flex-col sm:flex-row mr-5 items-center hover:cursor-pointer active:bg-gray-300/20 sm:hover:bg-gray-300/20 rounded-xl mt-4 bg-gray-300/10 max-w-[60rem] p-1  ">
      <div className="gap-3 p-2 items-center flex">
        <img
          src={course?.Thumbnail}
          alt="course-thumbnail"
          className="w-[120px] h-[90px] max-w-[120px] object-cover  rounded-lg "
        />

        <div>
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
      <div>
        <span>Duration: {course?.duration ? "" : "2 hr"}</span>
      </div>
      <div className="flex items-center gap-10 justify-between pr-3 w-[250px] mr-3 ">
        <p>
          {" "}
          <span className="text-white/60">Price:</span> ₹{course.Price}
        </p>
        <div className="flex flex-col justify-center items-center  w-[110px]  gap-1">
          <div onClick={(e)=>{ e.stopPropagation() }} className="text-[1.1rem] w-[120px] bg-white/10 text-center hover:bg-green-500/20 active:bg-green-500/30  box-content p-2 transition-all hover:cursor-pointer duration-150 rounded-full  ">
          {user?.Courses?.includes(course._id)
              ? <span onClick={(e)=>{ e.stopPropagation() 
                navigate("/dashboard/enrolled-courses")}}>Go to Course</span>
              : "Buy"}
          </div>
          <div
            onClick={(e)=>{  
              e.stopPropagation()
              handleCart()}}
            className={`text-[1.1rem] ${user?.Courses?.includes(course._id)?"hidden":null} hover:text-white text-white/30   box-content p-2 transition-all hover:cursor-pointer duration-150 rounded-full  `}
          >
           
            {user?.Cart?.includes(course._id)
              ? "Go to Cart"
              : "Add to Cart"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExploreCoursesCard;
