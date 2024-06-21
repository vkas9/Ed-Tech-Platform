import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

import { useState } from "react";
import { CaluculateDuration } from "../../../components/core/auth/CaluculateDuration";

import { useNavigate } from "react-router-dom";


const PurchaseCard = ({ course }) => {
const navigate=useNavigate()
  const [isButtonHovered, setIsButtonHovered] = useState(false);


  let time = CaluculateDuration(course?.courseId);


  return (
    <div
      onClick={()=>{ navigate(`/dashboard/enrolled-courses`)}}
      className={`flex relative text-[1.1rem] justify-between overflow-x-auto  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full flex-col sm:flex-row mr-5 rounded-xl mt-4 hover:cursor-pointer ${
        !isButtonHovered ? "sm:hover:bg-gray-300/20" : ""
      } bg-gray-300/10 max-w-[60rem] p-1`}
    >
      <div className="gap-1  p-2 sm:min-w-[351px] flex-col  pr-[2.2rem] overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full  vm:items-center flex">
        <div className="flex gap-3 flex-col  w-full vm:flex-row vm:items-center">
          <img
          src={course?.courseId?.Thumbnail}
          alt="course-thumbnail"
          className="w-[160px] h-[110px] max-w-[160px] object-cover rounded-lg"
        />

        <div className="vm:w-[120px] w-full  md:max-w-[220px] lg:w-[220px]">
          <h2 className="truncate">{course?.courseId?.CourseName}</h2>
          <p className="text-white/40 truncate text-[.9rem]">
            {course?.courseId?.CourseDescription}
          </p>
          <div className="flex gap-2  whitespace-nowrap overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full items-center">
            <span>0.0</span>
            <ReactStars
              className="min-w-fit hidden truncate xs:flex whitespace-nowrap scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto"
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
          <span className="text-white/50 text-sm">Created By: <span className="text-white whitespace-nowrap"> {course?.courseId?.Instructor?.FirstName} {course?.courseId?.Instructor?.LastName}</span></span>
        </div>
        
      </div>
      <div className="h-[1px] bg-white/10 mx-3 my-1" />

      <div className="flex xs:items-center gap-1 vm:gap-5 justify-between">
        <div className="vm:grid overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full xd:w-[320px] grid-flow-col items-start gap-2">
          <div className="w-fit pl-2 vm:pl-4 sm:pl-0 flex items-center">
            <span className=" flex flex-col sm:items-center">
              <span className="text-white/40">Created at:</span>
              <span className="whitespace-nowrap">
                <span className="sm:block">
                  {course?.courseId?.createdAt.slice(0, 10)}
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
              <span className="sm:block"> ₹{course?.courseId?.Price}</span>
            </span>
          </div>
        </div>
        <div className="h-[1px] w-full sm:h-[90px] sm:w-[1px] hidden sm:flex   bg-white/10 sm:my-1  " />
        <div className={`flex absolute vm:static bottom-0 right-0   md:mr-5 flex-col justify-center items-center gap-1`}>
          <div
            
            className="text-[1.1rem] w-[120px] text-center text-white/40  box-content p-2 transition-all hover:cursor-pointer duration-150 rounded-full"
          >
            Purchase at: <span className="text-white">{course?.purchasedAt.slice(0, 10)}</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
