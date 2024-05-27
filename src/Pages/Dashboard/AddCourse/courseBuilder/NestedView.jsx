import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../../ConfirmModal";
import { deleteSection, deleteSubSection } from "../../../../Auth/Authapi";
import { courseAction } from "../../../../store/courseSlice";
import { IoMdAdd } from "react-icons/io";
import SubSectionModal from "./modals/SubSectionModal";
const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmationModal, openConfirmationModal] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);

  const handleSetOpen = () => {
    setOpen(!open);
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      const updated = await deleteSection({
        sectionId: sectionId,
        courseId: course._id,
      });

      if (updated.success) {
        dispatch(courseAction.setCourse(updated.updateCourse));
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
        console.log("updated", updated.updatedCourse);
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
                onClick={handleSetOpen}
                className="cursor-pointer flex items-center justify-between p-2 bg-white/20 rounded-md hover:bg-white/30"
              >
                <div className="flex items-center gap-2">
                  {open ? (
                    <IoMdArrowDropdown className="text-lg" />
                  ) : (
                    <IoMdArrowDropright className="text-lg" />
                  )}
                  <p className="text-lg  max-w-[90px] md:max-w-none md:whitespace-normal truncate">{section.SectionName}</p>
                </div>
                <div className="flex">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChangeEditSectionName(
                        section._id,
                        section.SectionName
                      );
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
                    className="px-4 py-1 hover:bg-white/20 hover:cursor-pointer bg-white/10 rounded-md ml-4 mt-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="max-w-[70px] truncate md:max-w-none md:whitespace-normal">{subsection.title}</p>
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
                          className="hover:bg-white/20 rounded-full p-2"
                        >
                          <MdDelete className="text-xl" />
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
