import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import { Formik, Form, Field } from "formik";
// import { editCourseDetails } from "../../../../Auth/Authapi";
import { courseAction } from "../../../../store/courseSlice";

const PublishCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course } = useSelector((store) => store.course);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      public: false,
    },
    onSubmit: async(values) => {
      if(course.status==="Published" && values.public===true || (course.status==="Draft"&& values.public===false)){
        goToCourses();
        return 
      }
      const formData=new FormData();
      formData.append("courseId",course._id);
      const courseStatus=values.public?"Published":"Draft";
      formData.append("status",courseStatus);
      setLoading(true);
      // const result=await editCourseDetails(formData);
      // if(result.success){
      //   goToCourses();
      // }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (course?.status === "Published") {
      formik.setFieldValue("public", true);
    }
  }, [course, formik]);

  const goBack = () => {
    // Implement goBack functionality
  };

  const goToCourses = () => {
    // Implement goToCourses functionality
  };

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={formik.handleSubmit}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              name="public"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.public}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <button disabled={loading}  >Save Changes</button>
        </div>
      </form>
    </div>
  );
};
export default PublishCourse;
