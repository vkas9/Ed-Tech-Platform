import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { updateCourse } from "../../../../Auth/Authapi";
import { courseAction } from "../../../../store/courseSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = useSelector((store) => store.course);
  const [loading, setLoading] = useState(false);

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
    },
  });

  useEffect(() => {
    if (course?.status === "Published") {
      formik.setFieldValue("public", true);
    }
  }, [course, formik]);

  const goBack = () => {
    dispatch(courseAction.setStep(2));
  };

  const goToCourses = () => {
    dispatch(courseAction.resetCourseState());
    toast.success("Course Created!")
    navigate("/dashboard/my-profile");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="max-w-[700px] m-5 rounded-md bg-white/10 p-6"
    >
      <p className="text-2xl font-semibold text-white/80">Publish Course</p>
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="flex items-center space-y-1">
          <label htmlFor="public" className="text-md font-semibold text-white/80">
            <input
              type="checkbox"
              id="public"
              name="public"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.public}
              className="h-4 w-4 rounded bg-white/10 text-richblack-400 focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2">Make this course public</span>
          </label>
        </div>

        <div className="flex justify-end gap-x-2">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
            className="flex items-center gap-x-2 rounded-md bg-gray-300 py-2 px-4 font-semibold text-gray-900"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-x-2 rounded-md bg-blue-500 py-2 px-4 font-bold text-blue-950 transition-all duration-200 hover:bg-blue-600 active:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PublishCourse;
