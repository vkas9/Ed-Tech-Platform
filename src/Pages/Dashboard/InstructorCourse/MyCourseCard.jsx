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
import { v4 as uuidv4 } from "uuid";
import { FaAngleDown } from "react-icons/fa6";

const MyCourseCard = ({ course }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const{course:currentCourse}=useSelector((store) => store.course);
  const handleEdit = () => {
    dispatch(courseAction.setCourse(course));
    dispatch(courseAction.setEditCourse(true));
    dispatch(courseAction.setStep(1));
    navigate("/dashboard/create-course");
  };
  const handleClick = () => {
    navigate(`/dashboard/all-courses/${uuidv4()}/${course._id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={`relative flex text-[1.1rem] justify-between overflow-x-auto flex-col sm:flex-row mr-5 items-center hover:cursor-pointer ${
        !isButtonHovered ? "active:bg-gray-300/20 sm:hover:bg-gray-300/20" : ""
      } rounded-xl mt-4 bg-gray-300/10 max-w-[60rem] p-1  `}
    >
      <div className="gap-3 p-2 flex-col w-full sm:items-center sm:flex-row Z flex">
        <p
          className={`${
            course.status == "Draft" ? "text-red-500" : "text-green-500 "
          } text-center  w-full sm:w-[80px] sm:p-1   rounded-full font-bold`}
        >
          {course.status}
        </p>
        <div className="h-[1px] w-full sm:h-[90px] sm:w-[1px]    bg-white/10 mx-3 sm:my-1  " />
        <div className="flex  flex-col sm:min-w-[250px] max-w-[250px] sm:items-center w-full xs:flex-row gap-3 ">
          <img
            src={course?.Thumbnail}
            alt="course-thumbnail"
            className=" w-[170px] max-w-[170px] xs:w-[120px] xs:max-w-[120px] h-[90px]  object-cover  rounded-lg "
          />

          <div className="max-w-[250px] md:w-[150px]">
            <h2 className=" hover:overflow-x-auto truncate ">
              {course.CourseName}
            </h2>
            <p className="text-white/40 truncate text-[.9rem] ">
              {course.CourseDescription}
            </p>
            <div className=" hidden overflow-x-auto justify-center gap-2 items-center">
              <span >0.0</span>
              
            
            <ReactStars
              className=" min-w-[120px]  whitespace-nowrap overflow-x-auto  "
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
        <div className="h-[1px] w-full sm:h-[90px] sm:w-[1px] sm:hidden    bg-white/10 mx-3 sm:my-1  " />
      </div>
      <div className="sm:w-fit text-sm w-full mb-1 vm:text-[1.1rem] pl-[.6rem]  flex items-center">
        <span className="gap-1">
          <span className="text-white/40">Duration:</span>{" "}
          <span className="whitespace-nowrap ">
            {" "}
            {course?.duration}
            5hr 45m
          </span>
        </span>
      </div>
      <div className="flex pl-[.6rem]    w-full sm:w-fit items-center gap-7 sm:mr-3">
        <p className="text-sm vm:text-[1.1rem] pr-3">
          <span className="text-white/40 gap-1">Created at: </span>
          <span className="whitespace-nowrap ">
            {" "}
            {course.createdAt.slice(0, 10)}
          </span>
        </p>
        <div className="h-[1px] w-full sm:h-[90px] sm:w-[1px] hidden sm:flex   bg-white/10 sm:my-1  " />
        <div className="flex items-center gap-2">
          <MdOutlineEdit
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsButtonHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsButtonHovered(false);
            }}
            className="text-[1.5rem] hover:bg-white/10  absolute sm:static bottom-0 right-0 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full"
          />
          <RxCross2
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsButtonHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsButtonHovered(false);
            }}
            className="text-[1.5rem] absolute sm:static top-0 right-0 hover:bg-white/10 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full  "
          />
        </div>
      </div>
      {/* <span className="absolute  text-[1.4rem] text-white/10 hover:animate-bounce left-1/2 bottom-0"><FaAngleDown/></span> */}
    </div>
  );
};
export default MyCourseCard;
