import CourseSteps from "./CourseSteps";

const RootCreateCourse = () => {
  return (
    <div className="flex pb-[9rem] font-semibold flex-col text-lg  pt-2 pl-5 ">
      <div className="flex gap-1 items-center text-white/50  overflow-x-auto ">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
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
