import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { useSelector } from "react-redux";
import RequirementField from "./RequirementsField"



const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit=async()=>{

  }
  const { course, editCourse } = useSelector((state) => state.course)
  // const courseCategories=useSelector((store)=>store.course.courseCategory);
  const courseCategories=[{
    name:"dlkjf"
  }]
  
  console.log("course",courseCategories)
  const [loading, setLoading] = useState(false);
  
  return <>
  <form
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <div>
            <label  htmlFor='courseTitle'>Course Title<sup>*</sup></label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is Required**</span>
                )
            }
        </div>

        <div>
            <label  htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className='min-h-[140px] w-full'
                />
            {
                errors.courseShortDesc && (<span>
                    Course Description is required**
                </span>)
            }
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true
                })}
                className='w-full'
            />
            <HiOutlineCurrencyRupee  className='absolute top-1/2 text-richblack-400'/>
            {
                errors.coursePrice && (
                    <span>Course Price is Required**</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required:true})}
            >
                <option value="" disabled>Choose a Category</option>

                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }

            </select>
            {errors.courseCategory && (
                <span>
                    Course Category is Required
                </span>
            )}
        </div>

        {/* create a custom component for handling tags input */}
        {/* <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues = {getValues}
        /> */}

        {/* create a component for uploading and showing preview of media */}
        {/* <Upload
            name=
            label=
            register={}
            errors=
            setValue={}
            /> */}
        
        {/*     Benefits of the Course */}
        <div>
            <label>Benefits of the course<sup>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='min-h-[130px] w-full'
            />
            {errors.courseBenefits && (
                <span>
                    Benefits of the course are required**
                </span>
            )}
        </div>

        
        <div>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <button
                text={!editCourse ? "Next" : "Save Changes"}
                />
        </div>
    </form>
  
  </>;
};
export default CourseInformationForm;
