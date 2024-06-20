import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdAddCircleOutline } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { courseAction } from "../../../../store/courseSlice";
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../APIs/mainAPI";
import ViewCourseCreation from "./ViewCourseCreation";

const CourseCreatorForm = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course, step } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("UPDATED");
  }, [course]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection({
        sectionName: values.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      });
    } else {
      result = await createSection({
        sectionName: values.sectionName,
        courseId: course._id,
      });
      // console.log("result", result);
    }

    if (result) {
      dispatch(courseAction.setCourse(result));
      setEditSectionName(null);
      resetForm();
    }

    setLoading(false);
    setSubmitting(false);
  };

  const cancelEdit = (resetForm) => {
    setEditSectionName(null);
    resetForm();
  };

  const goBack = () => {
    dispatch(courseAction.setStep(1));
    dispatch(courseAction.setEditCourse(true));
  };

  const goToNext = () => {
    // console.log("next");
    if (course?.Section?.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (course.Section.some((section) => section.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    dispatch(courseAction.setStep(3));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="text-white "
    >
      <h1 className="text-3xl">Course Creator</h1>
      <div className="mt-4 mr-5">
        <div className="p-4 bg-white/10 rounded-md py-6 gap-4 max-w-[700px]">
          <Formik
            initialValues={{ sectionName: "" }}
            validationSchema={Yup.object({
              sectionName: Yup.string().required("Section Name is required"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm, setValues }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="sectionName"
                    className="text-xl text-white/80"
                  >
                    Section name <sup>*</sup>
                  </label>
                  <Field
                    id="sectionName"
                    name="sectionName"
                    placeholder="Add section name"
                    className="bg-white/20 w-full outline-none max-w-[350px] rounded-md p-2 text-xl text-white"
                  />
                  <ErrorMessage
                    name="sectionName"
                    component="span"
                    className="text-red-500"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-lg max-w-[220px] font-bold text-white p-2 rounded-md flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {editSectionName ? "Edit Section Name" : "Create Section"}
                    {/* <MdAddCircleOutline className="ml-2 " size={20} /> */}
                  </button>
                  {editSectionName && (
                    <button
                      type="button"
                      onClick={() => cancelEdit(resetForm)}
                      className="text-sm text-white hover:bg-white/20 bg-white/10 p-2 rounded-md"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
                {course?.Section?.length > 0 && (
                  <ViewCourseCreation
                    handleChangeEditSectionName={(sectionId, sectionName) => {
                      if (editSectionName === sectionId) {
                        cancelEdit(resetForm);
                        return;
                      }

                      setEditSectionName(sectionId);
                      setValues({ sectionName });
                    }}
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-2  max-w-[700px]  mr-5">
        <button
          onClick={goBack}
          className="rounded-md cursor-pointer flex items-center bg-white transition-all duration-200 hover:bg-gray-400 text-black p-2"
        >
          Back
        </button>
        <div
          onClick={goToNext}
          className="text-white hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-xl font-bold p-2 rounded-md flex items-center"
        >
          <button>Next</button>
          <FaAngleRight className="ml-1 text-2xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCreatorForm;
