import { Link } from "react-router-dom";
import CourseSteps from "./CourseSteps";

const RootCreateCourse = () => {
  return (
    <div className="flex pb-[9rem] font-semibold flex-col text-lg  pt-2 pl-5 ">
      <div className="flex gap-1 items-center text-white/50  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto ">
      <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-500 whitespace-nowrap ">
          Create Course
        </span>
      </div>
      <div>
        {/* <h1 className="text-3xl">Create Course</h1> */}
        <div>
          <CourseSteps />
        </div>
      </div>
    </div>
  );
};
export default RootCreateCourse;
