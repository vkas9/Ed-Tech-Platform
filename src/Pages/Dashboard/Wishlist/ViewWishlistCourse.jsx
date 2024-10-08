import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { motion } from "framer-motion";
import { MdLock } from "react-icons/md";
import { courseAction } from "../../../store/courseSlice";
import { getAllCourse } from "../../../APIs/mainAPI";
import { encryptData } from "../../../components/core/auth/crypto";


const ViewCourse = () => {
  const { exploreAllCourses } = useSelector((store) => store.course)
  const {courseId} = useParams();
  const [openSections, setOpenSections] = useState({});
  const { token } = useSelector((store) => store.auth);
  const [confirmationModal, openConfirmationModal] = useState(null);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSetOpen = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };
  function secondsToMinutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }



  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchData = async () => {
        try {
          const courseData = await getAllCourse(signal);
          const text = encryptData(courseData);
          localStorage.setItem(import.meta.env.VITE_ALL_C, text);
          dispatch(courseAction.setExploreAllCourses(courseData));
        } catch (error) {
          if (!controller.signal.aborted) {
            toast.error("Unable to fetch all courses");
          }
        }
      };

      if(!exploreAllCourses){
        fetchData()
      }
     // Always fetch data on component mount

      return () => {
        controller.abort();
      };
    }
  }, [token, dispatch, navigate]);

  const eCourse=exploreAllCourses?.find(item=>item._id===courseId);
  const getTotalLectures=()=>{
    
    let total=0;
    for(let temp in eCourse.Section){
      total+=eCourse.Section[temp].subSection.length;
    }
    return total;
  }
 if(!exploreAllCourses){
  return <p>Loading...</p>
 }
 
  

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex  font-semibold flex-col text-lg pt-2 px-5"
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <Link to={"/dashboard/wishlist"} className="underline active:text-white  sm:hover:text-white ">Wishlist</Link>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap">
          {eCourse.CourseName}
        </span>
      </div>
      <h1 className="text-3xl mb-3">Course Content</h1>
      <h2 className="text-white/50 ">{eCourse.Section.length} Sections  • {getTotalLectures()} Lectures  </h2>
      <div className="bg-white/10 overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full   max-h-[calc(100vh-13rem)] w-full md:max-w-[700px] p-2  md:p-4 rounded-md shadow-md">
        {eCourse?.Section.map((section) => (
          <details key={section._id} className="mb-2">
            <summary
              onClick={() => handleSetOpen(section._id)}
              className="cursor-pointer flex items-center justify-between px-2 py-3 bg-white/20 relative rounded-md hover:bg-white/30"
            >
              <div className="flex truncate mr-[6rem] items-center gap-2">
                {openSections[section._id] ? (
                  <IoMdArrowDropdown className="text-lg min-w-[20px]" />
                ) : (
                  <IoMdArrowDropright className="text-lg min-w-[20px]" />
                )}
                <p className="text-lg   whitespace-nowrap max-w-[450px]  truncate">
                  {section.SectionName}
                </p>
                <MdLock  className=" text-2xl min-w-[30px] font-bold text-white/70 "/>
              </div>
              <div className="flex  absolute bottom-2 sm:bottom-1 right-0">
                <div className=" p-2 text-sm sm:text-lg">{section.subSection.length} Lectures</div>
               
              </div>
            </summary>
            <div>
              {section?.subSection?.map((subsection) => (
                <div
                  key={subsection?._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    openConfirmationModal({data:subsection.videoURL, cancel: () => openConfirmationModal(null),});
                  }}
                  className="px-4 py-2 hover:bg-white/20 hover:cursor-pointer relative bg-white/10 rounded-md ml-4 mt-2"
                >
                  <div className="flex items-center justify-between">
                    <div  className="truncate  mr-[5rem]">
                      <div className="flex items-center gap-2">
                        <MdOutlineOndemandVideo  className=" min-w-[20px]"  />

                        <p className="whitespace-nowrap max-w-[450px]  truncate">
                          {subsection.title}
                        </p>
                      </div>
                    </div>
                    <div className="  flex absolute bottom-1 right-2">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditSubSection({
                            ...subsection,
                            sectionId: section._id,
                          });
                        }}
                        className="py-2 text-sm select-none text-white/50"
                      >
                        {secondsToMinutesAndSeconds(subsection.duration)}
                      </div>
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      
      </div>
    </motion.div>
  );
};
export default ViewCourse;
