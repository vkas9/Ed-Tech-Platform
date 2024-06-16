import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import * as Yup from "yup";
import { courseAction } from "../../../store/courseSlice";
import {
  addCourseDetails,
  editCourseDetails,
  updateCourse,
} from "../../../APIs/Authapi";
import Upload from "./Upload";
import { motion } from "framer-motion";
import { decryptData } from "../../../components/core/auth/crypto";

const CourseInformationForm = () => {
  const { course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const initialValues = {
    courseTitle: course.CourseName || "",
    courseShortDesc: course.CourseDescription || "",
    coursePrice: course.Price || "",
    courseCategory: course.Catagory?._id || "",
    courseBenefits: course.WhatYouWillLearn || "",
  };
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/beta/course/getAllCatagory`
        );
        const decryptAllCategory=decryptData(response.data.allCatagory)
        setCourseCategories(decryptAllCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const validationSchema = Yup.object({
    courseTitle: Yup.string().required("Course title is required"),
    courseShortDesc: Yup.string().required("Course Description is required"),
    coursePrice: Yup.number()
      .required("Course Price is required")
      .positive("Price must be positive"),
    courseCategory: Yup.string().required("Course Category is required"),
    courseBenefits: Yup.string().required("Benefits of the course is required"),
  });

  const isFormUpdated = (currentValues) => {
    if (!editCourse) {
      return true; // For a new course, always treat as updated
    }

    return (
      currentValues.courseTitle !== course.CourseName ||
      currentValues.courseShortDesc !== course.CourseDescription ||
      currentValues.coursePrice !== course.Price ||
      currentValues.courseBenefits !== course.WhatYouWillLearn ||
      currentValues.courseCategory !== course.Catagory
      // currentValues.courseImage !== course.Thumbnail
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      if (editCourse) {
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("courseName", values.courseTitle);
        formData.append("courseDescription", values.courseShortDesc);
        formData.append("price", values.coursePrice);
        formData.append("whatYouWillLearn", values.courseBenefits);
        formData.append("category", values.courseCategory);
        formData.append(
          "thumbnailImage",
          values.courseImage || course.Thumbnail
        );
        console.log("values.courseImage", course.Thumbnail);
        setLoading(true);
        const result = await editCourseDetails(formData);
        // console.log("result->",result)
        setLoading(false);

        if (result) {
          dispatch(courseAction.setStep(2));
          dispatch(courseAction.setCourse(result));
        } else {
          console.error("Edit course details failed");
        }
      } else {
        const formData = new FormData();
        formData.append("courseName", values.courseTitle);
        formData.append("courseDescription", values.courseShortDesc);
        formData.append("price", values.coursePrice.toString());
        formData.append("whatYouWillLearn", values.courseBenefits);
        formData.append("category", values.courseCategory);
        formData.append("thumbnailImage", values.courseImage);

        setLoading(true);

        const resultCourse = await addCourseDetails(formData);
        setLoading(false);

        if (resultCourse) {
          dispatch(courseAction.setStep(2));
          dispatch(courseAction.setCourse(resultCourse));
        } else {
          console.error("Create course details failed");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <h1 className="text-3xl">Course Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="space-y-8 mt-4 mr-5 rounded-md max-w-[700px]  bg-white/10 mb-[10rem] p-6">
            {/* Course Title */}

            <div className="flex flex-col space-y-1">
              <label
                className="text-md font-semibold text-white/80"
                htmlFor="courseTitle"
              >
                Course Title <sup className="text-red-300">*</sup>
              </label>
              <Field
                id="courseTitle"
                name="courseTitle"
                placeholder="Enter Course Title"
                className="bg-white/10 text-xl w-full max-w-[650px] rounded-md p-2 outline-none"
              />
              {errors.courseTitle && touched.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-red-300">
                  {errors.courseTitle}
                </span>
              )}
            </div>
            {/* Course Short Description */}
            <div className="flex flex-col space-y-1">
              <label
                className="text-md font-semibold text-white/80"
                htmlFor="courseShortDesc"
              >
                Course Description <sup className="text-red-300">*</sup>
              </label>
              <Field
                as="textarea"
                id="courseShortDesc"
                name="courseShortDesc"
                placeholder="Enter Description"
                className="bg-white/10 text-xl resize-none min-h-[130px] w-full max-w-[650px] rounded-md p-2 outline-none"
              />
              {errors.courseShortDesc && touched.courseShortDesc && (
                <span className="ml-2 text-xs tracking-wide text-red-300">
                  {errors.courseShortDesc}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label
                className="text-md font-semibold text-white/80"
                htmlFor="courseCategory"
              >
                Course Category <sup className="text-red-300">*</sup>
              </label>
              <Field
                as="select"
                id="courseCategory"
                name="courseCategory"
                className="bg-white/10 text-xl w-full max-w-[650px] rounded-md p-2 outline-none"
              >
                <option value="" disabled>
                  Choose a Category
                </option>
                {!loading &&
                  courseCategories.map((category, index) => (
                    <option
                      className="text-black font-semibold text-xl "
                      key={index}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  ))}
              </Field>
              {errors.courseCategory && touched.courseCategory && (
                <span className="ml-2 text-xs tracking-wide text-red-300">
                  {errors.courseCategory}
                </span>
              )}
            </div>
            {/* Course Price */}
            <div className="flex flex-col space-y-1">
              <label
                className="text-md font-semibold text-white/80"
                htmlFor="coursePrice"
              >
                Course Price <sup className="text-red-300">*</sup>
              </label>
              <div className="relative">
                <Field
                  id="coursePrice"
                  name="coursePrice"
                  placeholder="Enter Course Price"
                  className="bg-white/10 text-xl w-full max-w-[650px] rounded-md p-2 outline-none pl-12"
                  type="number"
                />
                <MdOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-richblack-400" />
              </div>
              {errors.coursePrice && touched.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-red-300">
                  {errors.coursePrice}
                </span>
              )}
            </div>
            {/* Course Category */}
            
           
            {/* Benefits of the course */}
            <div className="flex flex-col space-y-1">
              <label
                className="text-md font-semibold text-white/80"
                htmlFor="courseBenefits"
              >
                Benefits of the course <sup className="text-red-300">*</sup>
              </label>
              <Field
                as="textarea"
                id="courseBenefits"
                name="courseBenefits"
                placeholder="Enter benefits of the course"
                className="bg-white/10 text-xl resize-none min-h-[130px] w-full max-w-[650px] rounded-md p-2 outline-none"
              />
              {errors.courseBenefits && touched.courseBenefits && (
                <span className="ml-2 text-xs tracking-wide text-red-300">
                  {errors.courseBenefits}
                </span>
              )}
            </div>
            <Upload
              name="courseImage"
              label="Course Thumbnail"
              errors={errors}
              editData={editCourse ? course.Thumbnail : null}
            />

            {/* Next Button */}
            <div className="flex absolute left-0  px-5 hg:px-0 hg:ml-5 max-w-[700px] w-full  flex-col-reverse gf:flex-row justify-center gf:justify-between items-center gap-y-2 gf:gap-x-2">
              {editCourse && (
                <button
                  type="button"
                  onClick={() => dispatch(courseAction.setStep(2))}
                  disabled={loading}
                  className="flex text-white bg-white/10 active:bg-white/20 hover:bg-white/20 cursor-pointer items-center gap-x-2 rounded-md py-2 px-4 font-semibold"
                >
                  Continue Without Saving
                </button>
              )}
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`flex cursor-pointer  items-center rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-xl transition-all duration-200 py-2 px-4  text-white font-bold ${
                  editCourse ? "" : ""
                }`}
              >
                {!editCourse ? "Next" : "Save Changes"}
                <MdNavigateNext className="text-2xl" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default CourseInformationForm;
