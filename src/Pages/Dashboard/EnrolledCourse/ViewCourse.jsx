import { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { motion } from "framer-motion";
import VideoModal from "./VideoModal/VideoModal";
const ViewCourse = () => {
  const { enrolledCourse } = useSelector((store) => store.card);
  const { courseId } = useParams();
  const [openSections, setOpenSections] = useState({});
  const [confirmationModal, openConfirmationModal] = useState(null);
  const { user } = useSelector((store) => store.profile);
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
  const eCourse = enrolledCourse.find((item) => item._id === courseId);
  const getTotalLectures = () => {
    let total = 0;
    for (let temp in eCourse.Section) {
      total += eCourse.Section[temp].subSection.length;
    }
    return total;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 px-5"
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto">
        <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <Link to={"/dashboard/enrolled-courses"} className=" underline active:text-white  sm:hover:text-white whitespace-nowrap">
          {user?.role === "Instructor" ? "All Courses" : "Enrolled Courses"}
        </Link>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap">
          {eCourse.CourseName}
        </span>
      </div>
      <h1 className="text-3xl mb-3">Course Content</h1>
      <h2 className="text-white/50 mb-1 ">
        {eCourse.Section.length} Sections • {getTotalLectures()} Lectures{" "}
      </h2>
      <div className="bg-white/10 overflow-y-auto max-h-[calc(100vh-13rem)] w-full md:max-w-[700px] p-2  md:p-4 rounded-md shadow-md">
        {eCourse?.Section.map((section) => (
          <details key={section._id} className="mb-2">
            <summary
              onClick={() => handleSetOpen(section._id)}
              className="cursor-pointer flex items-center  justify-between px-2 py-3 bg-white/20 relative rounded-md hover:bg-white/30"
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
                    openConfirmationModal({
                      data: subsection.videoURL,
                      cancel: () => openConfirmationModal(null),
                    });
                  }}
                  className="px-4  hover:bg-white/20 hover:cursor-pointer relative py-2 bg-white/10 rounded-md ml-4 mt-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="truncate  mr-[5rem]">
                      <div className="  flex items-center gap-2">
                        <MdOutlineOndemandVideo className="min-w-[20px]" />

                        <p className=" whitespace-nowrap max-w-[450px]  truncate">
                          {subsection.title}
                        </p>
                      </div>
                    </div>
                    <div className="  flex absolute bottom-1 right-2">
                      <div className="py-2 select-none text-sm text-white/50">
                        {secondsToMinutesAndSeconds(subsection.duration)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
        {confirmationModal && <VideoModal data={confirmationModal} />}
      </div>
    </motion.div>
  );
};
export default ViewCourse;
