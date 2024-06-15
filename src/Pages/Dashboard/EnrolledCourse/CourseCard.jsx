import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "../ConfirmModal";
import { deleteEnrolledCourse } from "../../../APIs/Authapi";
import { encryptData } from "../../../components/core/auth/crypto";
import { useDispatch, useSelector } from "react-redux";
import { cardAction } from "../../../store/cardSlice";
import { profileAction } from "../../../store/profileSlice";
import { CaluculateDuration } from "../../../components/core/auth/CaluculateDuration";

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
    } catch (error) {
      console.log(error);
    } finally {
      openConfirmationModal(null);
    }
  };

  const handleLogoutClick = () => {
    openConfirmationModal({
      text1: "Are You Sure?",
      text2: "You will permanently lose this course",
      btn1Text: "Unenroll",
      btn2Text: "Cancel",
      btn1Handler: handleUnenrollCourse,
      btn2Handler: () => openConfirmationModal(null),
    });
  };

  const handleOption = (e) => {
    e.stopPropagation();
    handleLogoutClick();
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`flex relative text-[1.1rem] justify-between flex-col sm:flex-row mr-5 rounded-xl mt-4 hover:cursor-pointer ${
          !isButtonHovered
            ? "active:bg-gray-300/20 sm:hover:bg-gray-300/20"
            : ""
        } bg-gray-300/10 max-w-[60rem] p-1`}
      >
        <div className="gap-3  p-2 sm:min-w-[351px] flex-col vm:flex-row pr-[2.2rem]  overflow-auto vm:items-center flex">
          <img
            src={course.Thumbnail}
            alt="course-thumbnail"
            className=" h-[110px] w-full xs:w-[200px] xs:max-w-[200px] vm:w-[160px] vm:max-w-[160px] object-cover  rounded-lg"
          />
          <div className="w-[120px] md:w-[150px]">
            <h2>{course.CourseName}</h2>
            <p className="text-white/40 text-[.9rem]">
              {course.CourseDescription}
            </p>
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
          <div className="flex flex-col gap-1 lg:bg-white/[.03] lg:p-2 lg:rounded-xl ">
            <p className="text-sm vm:text-[1.1rem]">
              <span className="text-white/40">Created at: </span>
              <span className="whitespace-nowrap">
                {" "}
                {course.createdAt.slice(0, 10)}
              </span>
            </p>
            <p className="text-sm vm:text-[1.1rem]">
              <span className="text-white/40">Updated at: </span>
              <span className="whitespace-nowrap">
                {" "}
                {course.updatedAt.slice(0, 10)}
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
            className="text-[1.7rem] absolute md:relative top-1 -right-1 hover:bg-white/10 box-content p-2 md:p-3 transition-all hover:cursor-pointer duration-150 rounded-full"
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
                  className="py-3 px-5 xl:mr-4 bg-white xl:bg-white/10 hover:bg-white/20 text-black xl:text-white rounded-xl right-[3rem] xl:-right-[9rem] -bottom-[0rem]"
                >
                  Unenroll
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseCard;
