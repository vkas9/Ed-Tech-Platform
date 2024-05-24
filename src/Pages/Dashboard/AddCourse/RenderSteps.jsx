import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilderForm from "./courseBuilder/CourseBuilderForm";

const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
];
const RenderSteps = () => {
  const { step } = useSelector((store) => store.course);
  return (
    <>
      <div className=" flex">
        <div className="">
          {steps.map((item) => (
            <>
              <div>
                <div
                  className={`${step === item.id}?"bg-yellow-500":bg-white/10`}
                >
                  {step > item.id ? <FaCheck /> : item.id}
                </div>
              </div>
            </>
          ))}
        </div>
        <div>
          {steps.map((item) => (
            <div>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      {step == 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
    </>
  );
};
export default RenderSteps;
