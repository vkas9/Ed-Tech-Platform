import { FiMoreVertical } from "react-icons/fi";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseAction } from "../../../store/courseSlice";
import { useNavigate } from "react-router-dom";
const MyCourseCard=({course})=>{
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // const{course:currentCourse}=useSelector((store) => store.course);
  const handeClick=()=>{
    dispatch(courseAction.setCourse(course));
    dispatch(courseAction.setEditCourse(true));
    dispatch(courseAction.setStep(1));
    navigate("/dashboard/create-course")

  }

    return (
        <div className={`flex text-[1.1rem] justify-between flex-col sm:flex-row mr-5 items-center hover:cursor-pointer ${!isButtonHovered?"active:bg-gray-300/20 sm:hover:bg-gray-300/20":""} rounded-xl mt-4 bg-gray-300/10 max-w-[60rem] p-1  `}>
            <div className= "gap-3 p-2 items-center flex">
              
              <p className={`${course.status=="Draft"?"text-red-500":"text-green-500 "} text-center w-[80px] p-1  rounded-full font-bold`}>{course.status}</p>
              <div className="h-[90px] w-[1px] bg-white/10 mx-3 my-1  " />
              <img src={course?.Thumbnail} alt="course-thumbnail" className="w-[120px] h-[90px] max-w-[120px] object-cover  rounded-lg " />
             
              <div className="max-w-[250px] md:w-[250px]">
                <h2 className=" hover:overflow-x-auto truncate ">{course.CourseName}</h2>
                <p className="text-white/40 text-[.9rem] ">{course.CourseDescription}</p>
                <div className="flex gap-2 items-center">
                    <span>4.8</span>
                    <ReactStars count={5} size={25} edit={false} activeColor="#ffd700" emptyIcon={<FaRegStar/>} fullIcon={<FaStar/>}  />

                </div>
              </div>
            </div>
            <div>
              <span>Duration: {course?.duration?"":"2 hr"}</span>
            </div>
            <div className="flex items-center gap-7 mr-3 ">
              <p>Price: ₹ 699</p>
              <div className="flex items-center gap-2">

             
                <MdOutlineEdit onClick={handeClick} onMouseEnter={(e)=>{
            e.stopPropagation()
            setIsButtonHovered(true)
          }}
          onMouseLeave={(e)=>{
            e.stopPropagation()
            setIsButtonHovered(false)
          }} className="text-[1.5rem] hover:bg-white/10 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full"/>
              <RxCross2 onMouseEnter={(e)=>{
            e.stopPropagation()
            setIsButtonHovered(true)
          }}
          onMouseLeave={(e)=>{
            e.stopPropagation()
            setIsButtonHovered(false)
          }} className="text-[1.5rem] hover:bg-white/10 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full  " />
              </div>
            </div>

           
          </div>
    );
}
export default MyCourseCard;