import { Field, Form, Formik } from "formik";

const CourseInformationForm = () => {
  return (
    <>
      <div>
        <Formik
          initialValues={{
            "Course Title": "",
            "Course Description":"",
            "Price":""
          }}
        >
          <Form>
            <div>
                <label >Course Title</label>
                <Field required name="Course Title" type="text" className="text-black" placeholder="Enter Course Title">
                    
                </Field>
            </div>
            <div>
                <label >Course Description</label>
                <Field required name="Course Description" type="text" className="text-black" placeholder="Enter Course Description">
                    
                </Field>
            </div>
            <div>
                <label >Price</label>
                <Field required name="Price" type="text" className="text-black" placeholder="Enter Price">
                    
                </Field>
            </div>



          </Form>
        </Formik>
      </div>
    </>
  );
};
export default CourseInformationForm;
