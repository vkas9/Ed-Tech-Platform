import { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useParams } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import VideoModal from "./VideoModal/VideoModal";
const ViewCourse = () => {
  const { enrolledCourse } = useSelector((store) => store.card);

  const { index } = useParams();
  console.log("enrolledCourse", index);

  const [openSections, setOpenSections] = useState({});
  const [confirmationModal, openConfirmationModal] = useState(null);
  const handleSetOpen = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };
  function secondsToMinutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 px-5"
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span>Enrolled_Courses</span>
        <span>/</span>
        <span className="text-yellow-500">
          {enrolledCourse[index].CourseName}
        </span>
      </div>
      <h1 className="text-3xl mb-3">Course Content</h1>
      <div className="bg-white/10 w-full md:max-w-[700px] p-2  md:p-4 rounded-md shadow-md">
        {enrolledCourse[index]?.Section.map((section) => (
          <details key={section._id} className="mb-2">
            <summary
              onClick={() => handleSetOpen(section._id)}
              className="cursor-pointer flex items-center justify-between p-2 bg-white/20 rounded-md hover:bg-white/30"
            >
              <div className="flex items-center gap-2">
                {openSections[section._id] ? (
                  <IoMdArrowDropdown className="text-lg" />
                ) : (
                  <IoMdArrowDropright className="text-lg" />
                )}
                <p className="text-lg  max-w-[90px] md:max-w-none md:whitespace-normal truncate">
                  {section.SectionName}
                </p>
              </div>
              <div className="flex">
                <div className=" p-2">{section.subSection.length} Lectures</div>
                {/* <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfirmationModal({
                        text1: "Delete this Section",
                        text2:
                          "All the lectures in this Section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => {
                          handleDeleteSection(section._id);
                        },
                        btn2Handler: () => openConfirmationModal(null),
                      });
                    }}
                    className="hover:bg-white/20 rounded-full p-2"
                  >
                    <MdDelete className="text-xl" />
                  </div> */}
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
                  className="px-4 py-1 hover:bg-white/20 hover:cursor-pointer bg-white/10 rounded-md ml-4 mt-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <MdOutlineOndemandVideo />

                        <p className="max-w-[70px] truncate md:max-w-none md:whitespace-normal">
                          {subsection.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditSubSection({
                            ...subsection,
                            sectionId: section._id,
                          });
                        }}
                        className="py-2 text-sm text-white/50"
                      >
                        {secondsToMinutesAndSeconds(subsection.duration)}
                      </div>
                      {/* <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmationModal({
                              text1: "Delete This Sub Section",
                              text2:
                                "This lectures in this Section will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => {
                                handleDeleteSubSection({
                                  subSectionId: subsection._id,
                                  sectionId: section._id,
                                });
                              },
                              btn2Handler: () => openConfirmationModal(null),
                            });
                          }}
                          className="hover:bg-white/20 rounded-full p-2"
                        >
                          <MdDelete className="text-xl" />
                        </div> */}
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
