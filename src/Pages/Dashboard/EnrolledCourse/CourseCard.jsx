import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CourseCard=({course,index})=>{
  const navigate = useNavigate();
 
  const handleClick=()=>{
    navigate(`/dashboard/course/${index}`); 
  }
    return (
        <div onClick={handleClick} className="flex text-[1.1rem] justify-between flex-col sm:flex-row mr-5 items-center rounded-xl mt-4 hover:cursor-pointer hover:bg-gray-300/20 bg-gray-300/10 max-w-[60rem] p-1  ">
            <div className= "gap-3 p-2 items-center flex">
              <img src={course.Thumbnail} alt="course-thumbnail" className="w-[120px] h-[90px] max-w-[120px] object-cover  rounded-lg " />
             
              <div>
                <h2>{course.CourseName}</h2>
                <p className="text-white/40 text-[.9rem] ">{course.CourseDescription}</p>
              </div>
            </div>
            <div>
              <span>Duration: {course?.duration}</span>
            </div>
            <div className="flex items-center gap-7 mr-3 ">
              <p>Progress: 0%</p>
              <FiMoreVertical onClick={(e)=>{
                e.stopPropagation();

              }}  className="text-[1.5rem] hover:bg-white/10 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full  " />

            </div>
          </div>
    );
}
export default CourseCard;