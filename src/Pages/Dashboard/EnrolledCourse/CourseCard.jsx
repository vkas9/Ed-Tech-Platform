import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "../ConfirmModal";
import { deleteEnrolledCourse } from "../../../APIs/mainAPI";
import { encryptData } from "../../../components/core/auth/crypto";
import { useDispatch, useSelector } from "react-redux";
import { cardAction } from "../../../store/cardSlice";
import { profileAction } from "../../../store/profileSlice";
import { CaluculateDuration } from "../../../components/core/auth/CaluculateDuration";
import toast from "react-hot-toast";
import formatDate from "../../../components/core/ReusableComponents/formatDate";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [confirmationModal, openConfirmationModal] = useState(null);

  let time = CaluculateDuration(course);

  const handleClick = () => {
    navigate(`/dashboard/enrolled-courses/${uuidv4()}/${course._id}`);
  };

  const handleIconClick = (courseId) => {
    setActiveCourseId((prevId) => (prevId === courseId ? null : courseId));
    setIsButton(true);
  };

  const handleUnenrollCourse = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const data = await deleteEnrolledCourse({ courseId: course._id }, signal);
      const enrolledText = encryptData(data.courseDetail);
      const userDetail = encryptData(data.userDetail);
      dispatch(cardAction.setEnrolledCourse(data.courseDetail));
      dispatch(profileAction.setProfile(data.userDetail));
      localStorage.setItem(import.meta.env.VITE_ENROLL_C, enrolledText);
      localStorage.setItem(import.meta.env.VITE_USER, userDetail);
      toast.success("Course Unenrolled!");
    } catch (error) {
      console.log(error);
    } finally {
      openConfirmationModal(null);
    }
  };

  const handleCourseClick = () => {
    openConfirmationModal({
      text1: "Are You Sure?",
      text2: "You will permanently lose access to this course!",
      btn1Text: "Unenroll",
      btn2Text: "Cancel",
      btn1Handler: handleUnenrollCourse,
      btn2Handler: () => openConfirmationModal(null),
    });
  };

  const handleOption = (e) => {
    e.stopPropagation();
    handleCourseClick();
  };

  return (
    <>
      <div
        onClick={()=>{
          if(course?.isActive){
            handleClick()
          }
         }}
        className={`flex relative ${!course?.isActive?"pointer-events-none select-none":""}   text-[1.1rem] justify-between flex-col sm:flex-row mr-5 rounded-xl mt-4 hover:cursor-pointer ${
          !isButtonHovered && course?.isActive
            ? "active:bg-gray-300/20 sm:hover:bg-gray-300/20"
            : ""
        } bg-gray-300/10 max-w-[60rem] p-1`}
      >
        <div className="gap-1  p-2 sm:min-w-[351px] flex-col  pr-[2.2rem] overflow-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full  vm:items-center flex">
          <div className="flex gap-3 flex-col  w-full vm:flex-row vm:items-center">
            <img
              src={course.Thumbnail}
              alt="course-thumbnail"
              className=" h-[110px] w-full xs:w-[200px] xs:max-w-[200px] vm:w-[160px] vm:max-w-[160px] object-cover  rounded-lg"
            />
            <div className="vm:w-[120px] w-full  md:max-w-[220px] lg:w-[220px] ">
              <h2 className="truncate">{course.CourseName}</h2>
              <p className="text-white/40 truncate text-[.9rem]">
                {course.CourseDescription}
              </p>
            </div>
          </div>

          <div className=" w-full">
            <span className="text-white/50 text-sm">
              Created By:{" "}
              <span className="text-white whitespace-nowrap">
                {" "}
                {course?.Instructor?.FirstName} {course?.Instructor?.LastName}
              </span>
            </span>
          </div>
        </div>
        <div className="h-[1px] bg-white/10 mx-3 my-1" />
        <div className="w-fit text-sm vm:text-[1.1rem] pl-2 mb-1 sm:pl-4 flex items-center">
          <span>
            <span className="text-white/40">Duration:</span>{" "}
            <span className="whitespace-nowrap ">{time}</span>
          </span>
        </div>
        <div className="flex pl-2 sm:pl-4 w-fit items-center gap-7 mr-3">
          <div className="flex flex-col gap-1 lg:bg-white/[.03]  lg:p-2 lg:rounded-xl ">
            <p className="text-sm sm:text-center vm:text-[1.1rem]">
              <span className="text-white/40">Created at: </span>
              <span className="whitespace-nowrap">
                {" "}
                {formatDate(course.createdAt.slice(0, 10))}
              </span>
            </p>
            <p className="text-sm sm:text-center vm:text-[1.1rem]">
              <span className="text-white/40">Updated at: </span>
              <span className="whitespace-nowrap">
                {" "}
                {formatDate(course.updatedAt.slice(0, 10))}
              </span>
            </p>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();

              setIsButtonHovered(true);
              handleIconClick(course._id);
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsButtonHovered(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsButtonHovered(false);
              setIsButton(false);
            }}
            className="text-[1.7rem] absolute md:relative top-1 -right-1 active:bg-white/10 md:hover:bg-white/10 box-content p-2 md:p-3 transition-all hover:cursor-pointer duration-150 rounded-full"
          >
            <FiMoreVertical />
            {isButton && activeCourseId === course._id && (
              <div className=" py-4 xl:py-2 pl-[4rem] absolute right-[3rem] xl:-right-[11rem] xl:-bottom-[.3rem] -bottom-[3rem]">
                <div
                  onClick={handleOption}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setIsButtonHovered(true);
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setIsButtonHovered(false);
                    setIsButton(false);
                  }}
                  className="py-3 px-5 xl:mr-4 bg-[#333] xl:bg-white/10 hover:bg-[#333]/60 text-white xl:text-white rounded-xl right-[3rem] xl:-right-[9rem] -bottom-[0rem]"
                >
                  Unenroll
                </div>
              </div>
            )}
          </div>
        </div>
        {!course?.isActive&&<div className="absolute  pointer-events-none top-0 rounded-xl text-center left-0 w-full h-full backdrop-blur-sm bg-black/40">

        
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 font-bold text-xl bg-white/10 p-3 rounded-xl text-red-500 -translate-y-1/2">This course is no longer available</span>
        </div>}
      </div>

      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseCard;
