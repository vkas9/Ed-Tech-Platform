import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MdAddCircleOutline } from "react-icons/md";
import { BiRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { courseAction } from '../../../../store/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection,updateSection } from '../../../../Auth/Authapi';
import NestedView from './NestedView';



const CourseBuilderForm = () => {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course,step } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("UPDATED");
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
      console.log("result",result)
    }

    if (result) {
      dispatch(courseAction.setCourse(result.updatedCourse));
      setEditSectionName(null);
      resetForm();
    }

    setLoading(false);
    setSubmitting(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    resetForm();
  };

  const goBack = () => {
    dispatch(courseAction.setStep(1));
    dispatch(courseAction.setEditCourse(true));
  };

  console.log("cours->",course.data)
  console.log("coursy->",course)
  const goToNext = () => {
    console.log("next")
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

  // const handleChangeEditSectionName = (sectionId, sectionName) => {
  //   if (editSectionName === sectionId) {
  //     cancelEdit();
  //     return;
  //   }

  //   setEditSectionName(sectionId);
  //   setValues({ sectionName });
  // };

  return (
    <div className='text-white'>
      <p>Course Builder</p>
      <Formik
    initialValues={{ sectionName: '' }}
    validationSchema={Yup.object({
      sectionName: Yup.string().required('Section Name is required'),
    })}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting, resetForm, setValues }) => (
      <Form>
        <div>
          <label htmlFor='sectionName'>
            Section name <sup>*</sup>
          </label>
          <Field
            id='sectionName'
            name='sectionName'
            placeholder='Add section name'
            className='w-full'
          />
          <ErrorMessage name="sectionName" component="span" />
        </div>
        <div className='mt-10 flex w-full'>
          <button
            type="submit"
            className="btn btn-outline text-white"
            disabled={isSubmitting}
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <MdAddCircleOutline className='text-yellow-50 ml-2' size={20} />
          </button>
          {editSectionName && (
            <button
              type='button'
              onClick={() => cancelEdit(resetForm)}
              className='text-sm text-richblack-300 underline ml-10'
            >
              Cancel Edit
            </button>
          )}
        </div>
        {course?.Section?.length > 0 && (
          <NestedView
            dispatch={dispatch} courseAction={courseAction}
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

      <div className='flex justify-end gap-x-3 mt-10'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center'
        >
          Back
        </button>
        <button
          onClick={goToNext}
          className='btn btn-outline flex items-center'
        >
          Next
          <BiRightArrow className='ml-2' />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
