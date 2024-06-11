import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { updateProfile } from "../../../APIs/Authapi";
import UpdateProfilePicture from "../../UpdateProfilePicture";

const EditProfile = () => {
  const { user } = useSelector((store) => store.profile);
  const [loading, setLoading] = useState(false);
  const[show,setShow]=useState(false)
  const dispatch=useDispatch()
  const handleSubmit = async (values,{resetForm}) => {
    try {
      setLoading(true);
      await updateProfile(dispatch,values);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpload=()=>{

  }

  return (
    <div>
      <h1 className="text-3xl">Edit Profile Picture</h1>
      <div className="mt-4 mr-5 sm:mr-0 sm:px-0">
        <div className="p-4 flex flex-col sm:flex-row items-center bg-white/10 rounded-md py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem]">
        <div className="min-h-[120px] min-w-[120px] max-h-[120px] sm:min-h-[100px] sm:min-w-[100px] sm:max-h-[100px] sm:max-w-[100px] rounded-full overflow-hidden  max-w-[120px]   ">
            <img  src={user?.avatar} className="overflow-auto rounded-full min-h-[120px] min-w-[120px] max-h-[120px] sm:min-h-[100px] sm:min-w-[100px] sm:max-h-[100px] sm:max-w-[100px]  max-w-[120px]  object-cover" alt="" />
          </div>
          <div className="flex gap-2">
            
            
            <button  onClick={()=>setShow(!show)} className="bg-white/10 hover:bg-white/20 text-xl w-[100px] font-bold text-white p-2 rounded-md">
              Change
            </button>
          </div>
        </div>
      </div>
      <div className="w-[98%] my-6  h-[1px] bg-white/20 rounded-full" />
      <h1 className="text-3xl">Edit Information</h1>
      <div className="mt-4 mr-5 sm:mr-0 sm:px-0">
        <div className="p-4 relative mb-9 flex flex-col sm:flex-row  bg-white/10 rounded-md py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem]">
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              city: "",
              contactNumber: "",
              gender: "",
              dateOfBirth: null,
            }}
          >
            {({ setFieldValue, values,resetForm }) => (
              <Form className="flex gap-2  flex-col md:flex-row flex-wrap">
                <div className="flex flex-col">
                  <label className="text-md text-white/80">City Name</label>
                  <Field
                    className="bg-white/20 w-full  sm:w-[350px] rounded-md p-2 outline-none"
                    type="text"
                    placeholder="Enter City"
                    name="city"
                  ></Field>
                </div>
                <div>
                  <label className="text-md text-white/80">
                    Contact Number
                  </label>
                  <Field
                    className="bg-white/20 w-full sm:max-w-[350px] rounded-md p-2 outline-none"
                    type="text"
                    maxLength="10"
                    placeholder="Enter Mobile Number"
                    name="contactNumber"
                  ></Field>
                </div>
                <div>
                  <label className="text-md text-white/80">Gender</label>
                  <div className="bg-white/20  w-full  sm:w-[350px] rounded-md p-2 outline-none flex items-center gap-4">
                    <div className="gap-1 flex items-center">
                      <Field
                        className="bg-white/20 rounded-md p-2 outline-none"
                        type="radio"
                        name="gender"
                        value="Female"
                        id="female"
                      />
                      <label htmlFor="female" className="ml-2">
                        Female
                      </label>
                    </div>
                    <div className="gap-1 flex items-center">
                      <Field
                        className="bg-white/20 rounded-md p-2 outline-none"
                        type="radio"
                        name="gender"
                        value="Male"
                        id="male"
                      />
                      <label htmlFor="male" className="ml-2">
                        Male
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-md text-white/80">Date of Birth</label>
                  <div className="bg-white/20 w-full sm:w-[350px] rounded-md p-2 outline-none">
                    <DatePicker
                      className="w-full bg-transparent outline-none"
                      selected={values.dateOfBirth}
                      onChange={(date) => setFieldValue("dateOfBirth", date)}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>
                <div className="w-full absolute hover:cursor-pointer  -bottom-[3rem] left-0">
                  <button
                    disabled={loading}
                    type="submit"
                    className={`mt-2 ${
                      loading ? "bg-yellow-600" : "bg-yellow-500"
                    } md:hover:bg-yellow-400 active:bg-yellow-400 transition-all duration-200  p-1 rounded-lg w-[130px] text-black text-2xl`}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {show &&  <UpdateProfilePicture show={show} setShow={setShow} />}
    </div>
  );
};

export default EditProfile;
