import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import CourseInformationForm from "./CourseInformationForm";
import CourseCreatorForm from "./courseBuilder/CourseCreatorForm";
import PublishCourse from "./PublishCourse/PublishCourse";

const steps = [
  {
    id: 1,
    title: "Course Information ‣",
  },
  {
    id: 2,
    title: "Course Creator ‣",
  },
  {
    id: 3,
    title: "Course Publish",
  },
];

const CourseSteps = () => {
  const { step } = useSelector((store) => store.course);
  return (
    <>
      <div className="flex ">
        <div className="flex my-5 bg-white/10 y-2 px-3 rounded-md bs:rounded-full flex-col bs:flex-row gap-3">
          {steps.map((item) => {
            const isActive = step === item.id;
            const isCompleted = step > item.id;
            const textColor = isActive
              ? "text-white animate-pulse"
              : isCompleted
              ? "text-yellow-500"
              : "text-white/30";

            return (
              <div key={item.id}>
                <p className={textColor}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseCreatorForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default CourseSteps;
