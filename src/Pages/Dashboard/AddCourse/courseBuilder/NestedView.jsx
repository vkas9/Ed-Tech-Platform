import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../../ConfirmModal";
import { deleteSection, deleteSubSection } from "../../../../APIs/Authapi";
import { courseAction } from "../../../../store/courseSlice";
import { IoMdAdd } from "react-icons/io";
import SubSectionModal from "./modals/SubSectionModal";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { decryptData } from "../../../../components/core/auth/crypto";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [confirmationModal, openConfirmationModal] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);

  const handleSetOpen = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      const updated = await deleteSection({
        sectionId: sectionId,
        courseId: course._id,
      });
      const decryptDeleteSection = decryptData(updated.updateCourse);

      if (updated.success) {
        dispatch(courseAction.setCourse(decryptDeleteSection));
      } else {
        console.error("Failed to delete section:", updated.message);
      }
    } catch (error) {
      console.error("Error deleting section:", error.message);
    } finally {
      openConfirmationModal(null);
    }
  };
  const handleDeleteSubSection = async (data) => {
    try {
      const updated = await deleteSubSection({ ...data, courseId: course._id });

      if (updated.success) {
        dispatch(courseAction.setCourse(updated.updatedCourse));
      } else {
        console.error("Failed to delete Sub section:", updated.message);
      }
    } catch (error) {
      console.error("Error deleting Sub Section:", error.message);
    } finally {
      openConfirmationModal(null);
    }
  };

  return (
    <>
      <div className="">
        <div className="bg-white/10 w-full md:max-w-[700px] p-2  md:p-4 rounded-md shadow-md">
          {course?.Section?.map((section) => (
            <details key={section._id} className="mb-2">
              <summary
                onClick={() => handleSetOpen(section._id)}
                className={`cursor-pointer flex items-center justify-between p-2 ${
                  !isButtonHovered ? "hover:bg-white/30" : ""
                } relative py-3 bg-white/20 rounded-md `}
              >
                <div className="flex items-center truncate mr-[5rem]  gap-2">
                  {openSections[section._id] ? (
                    <IoMdArrowDropdown className="text-lg min-w-[20px]" />
                  ) : (
                    <IoMdArrowDropright className="text-lg min-w-[20px]" />
                  )}
                  <p className="text-lg whitespace-nowrap truncate    max-w-[450px]">
                    {section.SectionName}
                  </p>
                </div>
                <div className="flex absolute bottom-2 right-0">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeEditSectionName(
                        section._id,
                        section.SectionName
                      );
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setIsButtonHovered(true);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setIsButtonHovered(false);
                    }}
                    className="hover:bg-white/20 rounded-full p-2"
                  >
                    <MdEdit className="text-xl" />
                  </div>
                  <div
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
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setIsButtonHovered(true);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setIsButtonHovered(false);
                    }}
                    className="hover:bg-white/20 rounded-full p-2"
                  >
                    <MdDelete className="text-xl" />
                  </div>
                </div>
              </summary>
              <div>
                {section?.subSection?.map((subsection) => (
                  <div
                    key={subsection?._id}
                    onClick={() => setViewSubSection(subsection)}
                    className={`px-4 py-1 ${
                      !isButtonHovered
                        ? "hover:bg-white/20 active:bg-white/20"
                        : ""
                    }   hover:cursor-pointer   bg-white/10 py-2 relative rounded-md ml-4 mt-2`}
                  >
                    <div className="flex items-center  justify-between">
                      <div className="w-full">
                        <div className="flex  items-center gap-2 mr-[4rem]">
                          <MdOutlineOndemandVideo className=" min-w-[20px]" />

                          <p className=" whitespace-nowrap truncate    max-w-[350px]  ">
                            {subsection.title}
                          </p>
                        </div>
                        <div className="flex absolute bottom-1 right-0 ">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditSubSection({
                                ...subsection,
                                sectionId: section._id,
                              });
                            }}
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setIsButtonHovered(true);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setIsButtonHovered(false);
                            }}
                            className="hover:bg-white/20 rounded-full p-2"
                          >
                            <MdEdit className="text-xl" />
                          </div>
                          <div
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
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setIsButtonHovered(true);
                            }}
                            onMouseLeave={(e) => {
                              e.stopPropagation();
                              setIsButtonHovered(false);
                            }}
                            className="hover:bg-white/20 rounded-full p-2"
                          >
                            <MdDelete className="text-xl" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => setAddSubSection(section._id)}
                  className="ml-5 text-blue-500 font-bold hover:text-blue-600 hover:cursor-pointer text flex items-center"
                >
                  <span>Add Lecture</span>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
};

export default NestedView;
