import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import ConfirmModal from "../ConfirmModal";
import { deleteEnrolledCourse } from "../../../APIs/Authapi";
import { encryptData } from "../../../components/core/auth/crypto";
import { useDispatch, useSelector } from "react-redux";
import {cardAction} from "../../../store/cardSlice"
import { profileAction } from "../../../store/profileSlice";
const CourseCard=({course})=>{
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const[confirmationModal,openConfirmationModal]=useState(null);


  const handleClick=()=>{
    navigate(`/dashboard/enrolled-courses/${uuidv4()}/${course._id}`); 
  }
  const handleIconClick = (courseId) => {
  
    setActiveCourseId(prevId => (prevId === courseId ? null : courseId));
  };

  const handleUnenrollCourse=async()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    try {

      const data=await deleteEnrolledCourse({courseId:course._id},signal);
      const enrolledText=encryptData(data.courseDetail);
      const userDetail=encryptData(data.userDetail)
      dispatch(cardAction.setEnrolledCourse(data.courseDetail));
      dispatch(profileAction.setProfile(data.userDetail));
      localStorage.setItem(import.meta.env.VITE_ENROLL_C,enrolledText);
      localStorage.setItem(import.meta.env.VITE_USER, userDetail);
    } catch (error) {
      console.log(error)
    }
    finally{
      openConfirmationModal(null)
    }
    
  }
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
  const handleOption=(e)=>{
    e.stopPropagation()
    handleLogoutClick()
  }
    return (
      <>
        <div onClick={handleClick} className={`flex relative text-[1.1rem] justify-between flex-col sm:flex-row mr-5  rounded-xl mt-4 hover:cursor-pointer ${!isButtonHovered?"active:bg-gray-300/20 sm:hover:bg-gray-300/20":""}  bg-gray-300/10 max-w-[60rem] p-1  `}>
            <div className= "gap-3 p-2 overflow-auto items-center flex">
              <img src={course.Thumbnail} alt="course-thumbnail" className="w-[140px] vm:w-[160px] h-[110px] max-w-[160px] object-cover  rounded-lg " />
              <div className=" w-[120px] md:w-[150px]">
                <h2 className="">{course.CourseName}</h2>
                <p className="text-white/40 text-[.9rem] ">{course.CourseDescription}</p>
              </div>
            </div>
            <div className="h-[1px] bg-white/10 mx-3 my-1  "/>
            <div className=" w-fit text-sm vm:text-[1.1rem] pl-4 flex items-center ">
              <span className=""> <span className="text-white/40">Duration:</span>  {course?.duration}5hr 45m</span>
            </div>
            <div className="flex   pl-4 w-fit items-center gap-7 mr-3 ">
              {/* <p><span className="text-white/40">Progress: </span>100%</p> */}
              <p className="text-sm vm:text-[1.1rem]"><span className="text-white/40">Created at: </span>{(course.createdAt).slice(0,10)}</p>
              <div  onClick={(e)=>{
                e.stopPropagation();
                handleIconClick( course._id)
              }}  onMouseEnter={(e)=>{
                e.stopPropagation()
                setIsButtonHovered(true)
              }}
              onMouseLeave={(e)=>{
                e.stopPropagation()
                setIsButtonHovered(false)
              }} className="text-[1.7rem] absolute md:relative  top-1 -right-1 hover:bg-white/10 box-content p-2 md:p-3 transition-all hover:cursor-pointer duration-150 rounded-full  " >
                 <FiMoreVertical  />
                 {activeCourseId === course._id &&<div  onClick={(e)=>{handleOption(e)}} onMouseEnter={(e)=>{
                e.stopPropagation()
                setIsButtonHovered(true)
              }}
              onMouseLeave={(e)=>{
                e.stopPropagation()
                setIsButtonHovered(false)
              }} className="py-3 px-5 bg-white hover:bg-white/80 text-black rounded-3xl absolute right-[3rem] xl:-right-[9rem] -bottom-[2rem] " >unenroll</div>}
              </div>
             

                
              
            </div>
            
          </div>
          {confirmationModal && <ConfirmModal modalData={confirmationModal} /> }
          </>
    );
}
export default CourseCard;