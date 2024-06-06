import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const CourseCard=({course})=>{
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate(`/dashboard/enrolled-courses/${uuidv4()}/${course._id}`); 
  }
    return (
        <div onClick={handleClick} className="flex relative text-[1.1rem] justify-between flex-col sm:flex-row mr-5  rounded-xl mt-4 hover:cursor-pointer active:bg-gray-300/20 sm:hover:bg-gray-300/20 bg-gray-300/10 max-w-[60rem] p-1  ">
            <div className= "gap-3 p-2 overflow-auto items-center flex">
              <img src={course.Thumbnail} alt="course-thumbnail" className="w-[160px] h-[110px] max-w-[160px] object-cover  rounded-lg " />
              <div className=" w-[120px] md:w-[150px]">
                <h2 className="">{course.CourseName}</h2>
                <p className="text-white/40 text-[.9rem] ">{course.CourseDescription}</p>
              </div>
            </div>
            <div className="h-[1px] bg-white/10 mx-3 my-1  "/>
            <div className=" w-fit pl-4 flex items-center ">
              <span className=""> <span className="text-white/40">Duration:</span>  {course?.duration}5hr 45m</span>
            </div>
            <div className="flex   pl-4 w-fit items-center gap-7 mr-3 ">
              {/* <p><span className="text-white/40">Progress: </span>100%</p> */}
              <p><span className="text-white/40">Created at: </span>{(course.createdAt).slice(0,10)}</p>
              <FiMoreVertical onClick={(e)=>{
                e.stopPropagation();

              }}  className="text-[1.7rem] absolute md:static  top-1 -right-1 hover:bg-white/10 box-content p-2 md:p-3 transition-all hover:cursor-pointer duration-150 rounded-full  " />

            </div>
          </div>
    );
}
export default CourseCard;