import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../../ConfirmModal";
import { deleteSection, deleteSubSection } from "../../../../Auth/Authapi";
import { courseAction } from '../../../../store/courseSlice';
import { IoMdAdd } from "react-icons/io";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmationModal, openConfirmationModal] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const[editSubSection,setEditSubSection]=useState(null);
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
  const handleDeleteSubSection=async(data)=>{
    try {
        const updated=await deleteSubSection(data);
        console.log("updatedss",updated)
           
    } catch (error) {
        
    }
  }

  return (
    <>
      <div className="">
        <div className="bg-white/10 max-w-[700px] m-5 p-4 rounded-md shadow-md">
          {course?.Section?.map((section) => (
            <details key={section._id} className="mb-2">
              <summary
                onClick={handleSetOpen}
                className="cursor-pointer flex items-center justify-between p-2 bg-white/20 rounded-md hover:bg-white/30"
              >
                <div className="flex items-center gap-2">
                  {open ? (
                    <IoMdArrowDropright className="text-lg" />
                  ) : (
                    <IoMdArrowDropdown className="text-lg" />
                  )}
                  <p className="text-lg">{section.SectionName}</p>
                </div>
                <div className="flex">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("edit button");
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
                        text2: "All the lectures in this Section will be deleted",
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
                  className="p-4 bg-white/10 rounded-md ml-4 mt-2"
                >
                    <div className="flex items-center justify-between">
                  <div>
                    <p>{subsection.title}</p>
                  </div>
                  <div className="flex">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditSubSection({...data,sectionId:section._id})
                      }}
                      className="hover:bg-white/20 rounded-full p-2"
                    >
                      <MdEdit className="text-xl" />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "This lectures in this Section will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => {
                            handleDeleteSubSection({subSectionId:subsection._id,sectionId:section._id});
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
              <button className="flex items-center">
                <IoMdAdd/>
                <span>Add Lecture</span>
              </button>
               </div>
            </details>
          ))}
        </div>
         
      </div>
      {
        addSubSection?(<SubSectionModal/>):viewSubSection?(<SubSectionModal/>):editSubSection?
        (<SubSectionModal/>):<div></div>
          
      }
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
};

export default NestedView;
