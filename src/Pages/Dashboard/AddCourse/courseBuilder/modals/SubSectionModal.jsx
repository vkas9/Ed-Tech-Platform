import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../Auth/Authapi';
import { setCourse } from '../../../../../store/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../../Upload';
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

    const initialValues = {
        lectureTitle: modalData.title || '',
        lectureDesc: modalData.description || '',
        lectureVideo: modalData.videoUrl || '',
    };

    const isFormUpdated = (currentValues) => {
        return (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        );
    };

    const handleEditSubSection = async (values) => {
        const formData = new FormData();

        formData.append('sectionId', modalData.sectionId);
        formData.append('subSectionId', modalData._id);

        if (values.lectureTitle !== modalData.title) {
            formData.append('title', values.lectureTitle);
        }

        if (values.lectureDesc !== modalData.description) {
            formData.append('description', values.lectureDesc);
        }

        if (values.lectureVideo !== modalData.videoUrl) {
            formData.append('video', values.lectureVideo);
        }

        setLoading(true);
        // API call
        const result = await updateSubSection(formData, token);
        if (result) {
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (values) => {
        if (view) return;

        if (edit) {
            if (!isFormUpdated(values)) {
                toast.error('No changes made to the form');
            } else {
                handleEditSubSection(values);
            }
            return;
        }

        // ADD

        const formData = new FormData();
        formData.append('sectionId', modalData);
        formData.append('title', values.lectureTitle);
        formData.append('description', values.lectureDesc);
        formData.append('video', values.lectureVideo);
        setLoading(true);
        // API CALL
        const result = await createSubSection(formData, token);

        if (result) {
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    };

    return (
        <div>
            <div>
                <p>
                    {view && 'Viewing'} {add && 'Adding'} {edit && 'Editing'} Lecture
                </p>
                <button onClick={() => (!loading ? setModalData(null) : {})}>
                    <RxCross1 />
                </button>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ values, setValues, handleChange }) => {
                    useEffect(() => {
                        if (view || edit) {
                            setValues({
                                lectureTitle: modalData.title || '',
                                lectureDesc: modalData.description || '',
                                lectureVideo: modalData.videoUrl || '',
                            });
                        }
                    }, [modalData, view, edit]);

                    return (
                        <Form>
                            <Upload
                                name="lectureVideo"
                                label="Lecture Video"
                                setValue={handleChange}
                                video={true}
                                viewData={view ? modalData.videoUrl : null}
                                editData={edit ? modalData.videoUrl : null}
                            />
                            <div>
                                <label htmlFor='lectureTitle'>Lecture Title</label>
                                <Field
                                    id='lectureTitle'
                                    name='lectureTitle'
                                    placeholder='Enter Lecture Title'
                                    className='w-full'
                                    validate={value => value ? undefined : 'Lecture Title is required'}
                                />
                                <ErrorMessage name='lectureTitle' component='span' />
                            </div>
                            <div>
                                <label htmlFor='lectureDesc'>Lecture Description</label>
                                <Field
                                    id='lectureDesc'
                                    name='lectureDesc'
                                    placeholder='Enter Lecture Description'
                                    as='textarea'
                                    className='w-full min-h-[130px]'
                                    validate={value => value ? undefined : 'Lecture Description is required'}
                                />
                                <ErrorMessage name='lectureDesc' component='span' />
                            </div>

                            {!view && (
                                <div>
                                    <button>{loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'}</button>
                                </div>
                            )}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SubSectionModal;
