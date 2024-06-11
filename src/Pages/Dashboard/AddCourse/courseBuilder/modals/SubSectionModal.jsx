import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubSection, createSubSection } from '../../../../../APIs/Authapi';
import { RxCross2 } from "react-icons/rx";
import { motion } from 'framer-motion';
import Upload from '../../Upload';
import { courseAction } from '../../../../../store/courseSlice';
import * as Yup from 'yup';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
    const dispatch = useDispatch();
    const { course } = useSelector((store) => store.course);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const initialValues = {
        lectureTitle: modalData.title || '',
        lectureDesc: modalData.description || '',
        lectureVideo: modalData.videoURL || '',
    };

    const validationSchema = Yup.object().shape({
        lectureTitle: Yup.string().required('Lecture Title is required'),
        lectureDesc: Yup.string().required('Lecture Description is required'),
        lectureVideo: Yup.string().required('Lecture Video is required'),
    });

    const isFormUpdated = (currentValues) => {
        
        return (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== null
        );
    };

    const handleEditSubSection = async (values) => {
        const formData = new FormData();

        formData.append('sectionId', modalData.sectionId);
        formData.append('subSectionId', modalData._id);
        formData.append('courseId', course._id);

        if (values.lectureTitle !== modalData.title) {
            formData.append('title', values.lectureTitle);
        }

        if (values.lectureDesc !== modalData.description) {
            formData.append('description', values.lectureDesc);
        }

        if (values.lectureVideo !== modalData.videoURL) {
            formData.append('video', values.lectureVideo);
        }

        setLoading(true);
        const newSubSection = await updateSubSection(formData);
        if (newSubSection) {
           
            dispatch(courseAction.setCourse(newSubSection.updatedCourse));
        }

        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (values) => {
        
        if (view) return;

        if (edit) {
            if (!isFormUpdated(values)) {
                toast.error('No changes made to the Sub-Section');
            } else {
               await handleEditSubSection(values);
            }
            setIsDisabled(false)
            return;
        }

        const formData = new FormData();
        formData.append('sectionId', modalData);
        formData.append('title', values.lectureTitle);
        formData.append('description', values.lectureDesc);
        formData.append('videoFile', values.lectureVideo);
        formData.append("courseId", course._id);

        setLoading(true);
        
        try {
            const result = await createSubSection(formData);
    
            if (result) {
                // console.log("result->",result)
                dispatch(courseAction.setCourse(result.updatedCourse));
            }
        } catch (error) {
            console.error(error)
        }finally{
        setModalData(null);
        setLoading(false);}
        
    };

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2, ease: [0, .71, .2, 1.01] }}>
            <div className="space-y-8 rounded-md max-w-[700px] m-5 bg-white/10 p-6">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold text-white/80">
                        {view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})} className="text-white hover:bg-white/10 rounded-full p-2">
                        <RxCross2 size={24} />
                    </button>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {({ values, handleChange }) => (
                        <Form className="space-y-6">
                            <Upload
                                name="lectureVideo"
                                label="Lecture Video"
                                setValue={handleChange}
                                video={true}
                                viewData={view ? modalData.videoURL : null}
                                editData={edit ? modalData.videoURL : null}
                            />
                            <div className="flex flex-col space-y-1">
                                <label htmlFor='lectureTitle' className="text-md font-semibold text-white/80">
                                    Lecture Title <sup className="text-red-300">*</sup>
                                </label>
                                <Field
                                    id='lectureTitle'
                                    name='lectureTitle'
                                    placeholder='Enter Lecture Title'
                                    className='bg-white/10 text-xl w-full max-w-[650px] rounded-md p-2 outline-none'
                                    readOnly={view}
                                />
                                <ErrorMessage name='lectureTitle' component='span' className="ml-2 text-xs tracking-wide text-red-300" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor='lectureDesc' className="text-md font-semibold text-white/80">
                                    Lecture Description <sup className="text-red-300">*</sup>
                                </label>
                                <Field
                                    id='lectureDesc'
                                    name='lectureDesc'
                                    placeholder='Enter Lecture Description'
                                    as='textarea'
                                    className='bg-white/10 text-xl resize-none min-h-[130px] w-full max-w-[650px] rounded-md p-2 outline-none'
                                    readOnly={view}
                                />
                                <ErrorMessage name='lectureDesc' component='span' className="ml-2 text-xs tracking-wide text-red-300" />
                            </div>
                            {!view && (
                                <div className="flex justify-end gap-x-2">
                                    <div
                                        
                                        onClick={(e) => {
                                            if(isDisabled)return 
                                            e.preventDefault();
                                            setIsDisabled(true);
                                            onSubmit(values);
                                        }}
                                        className={`flex cursor-pointer items-center rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-xl transition-all duration-200 py-2 px-4 text-blue-950 font-bold`}
                                    >
                                        {loading ? 'Loading...' : edit ? 'Save Changes' : 'Upload'}
                                    </div>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </motion.div>
    );
};

export default SubSectionModal;
