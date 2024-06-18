import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { updateCourse } from "../../../../APIs/Authapi";
import { courseAction } from "../../../../store/courseSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((store) => store.course);
  const [loading, setLoading] = useState(false);
const{editCourse}=useSelector((store)=>store.course)
  const formik = useFormik({
    initialValues: {
      public: false,
    },
    onSubmit: async (values) => {
      if (
        (course.status === "Published" && values.public === true) ||
        (course.status === "Draft" && values.public === false)
      ) {
        goToCourses();
        return;
      }
      const formData = new FormData();
      formData.append("courseId", course._id);
      const courseStatus = values.public ? "Published" : "Draft";
      formData.append("status", courseStatus);
      setLoading(true);
      const result = await updateCourse(formData);
      if (result.success) {
        goToCourses();
      }
      setLoading(false);
      dispatch(courseAction.setCreatingCourse(true));
    },
  });

  const goBack = () => {
    dispatch(courseAction.setStep(2));
  };

  const goToCourses = () => {
    dispatch(courseAction.setCreatingCourse(true));
    dispatch(courseAction.resetCourseState());

    toast.success("Course Created!");
    navigate("/dashboard/my-courses");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      
    >
      <h1 className="text-3xl font-bold mb-4">Course Publish</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-8 bg-white/10 p-6 rounded-md mr-5 max-w-[700px] mt-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <label htmlFor="public" className="text-md font-semibold text-white/80 flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="public"
                name="public"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.public}
                className="sr-only"
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${
                  formik.values.public ? "translate-x-full bg-blue-600" : "bg-white"
                }`}
              ></div>
            </div>
            <span className="ml-3">Publish this course for public access</span>
          </label>
        </div>

        <div className="flex absolute
         left-0 px-5 hg:px-0 hg:ml-5  max-w-[700px] w-full flex-col-reverse gw:flex-row justify-center items-center gap-y-2 gw:justify-end gap-x-2">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
            className="flex items-center gap-x-2 rounded-md bg-gray-300 py-2 px-4 font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-x-2 rounded-md bg-blue-500 py-2 px-4 font-bold text-white transition-all duration-200 hover:bg-blue-600 active:bg-blue-700"
          >
            {editCourse?"Save Changes":"Publish"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PublishCourse;
