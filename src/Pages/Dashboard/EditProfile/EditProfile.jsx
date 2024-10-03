import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { updateProfile } from "../../../APIs/mainAPI";
import UpdateProfilePicture from "../../UpdateProfilePicture";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user } = useSelector((store) => store.profile);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [showToast, isShowToast] = useState(false);
  const handleSubmit = async (values, { resetForm }) => {
    if (
      values.city == "" &&
      values.contactNumber == "" &&
      values.gender == "" &&
      values.dateOfBirth == null
    ) {
      if (showToast) {
        toast.dismiss(showToast);
        isShowToast(false);
      }
      const toastId = toast.error("Please fill atleast one field");
      isShowToast(toastId);
    } else {
      try {
        setLoading(true);
        await updateProfile(dispatch, values);
        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleUpload = () => {};

  return (
    <div>
      <h1 className="text-3xl">Edit Profile Picture</h1>
      <div className="mt-4 mr-5 sm:mr-0 sm:px-0">  
        <div  className={`p-4 relative overflow-hidden  z-[1] flex flex-col sm:flex-row items-center  rounded-md py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem]`}>
        <div className="absolute w-full h-full bg-gradient-to-t sm:bg-gradient-to-r -z-[1] from-black via-transparent to-transparent  left-0 top-0 " ></div>
        <div class="absolute bg-right bg-cover inset-1 h-full w-full top-0 left-0 rounded-md opacity-20 sm:opacity-35  -z-[2] " style={{backgroundImage:`url(${user?.avatar})`}}></div>
          <div className="min-h-[120px] min-w-[120px] max-h-[120px] sm:min-h-[100px] sm:min-w-[100px] sm:max-h-[100px] sm:max-w-[100px] rounded-full overflow-hidden  max-w-[120px]   ">
            <img
              src={user?.avatar}
              className="overflow-auto pointer-events-none scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-full min-h-[120px] min-w-[120px] max-h-[120px] sm:min-h-[100px] sm:min-w-[100px] sm:max-h-[100px] sm:max-w-[100px]  max-w-[120px]  object-cover"
              alt=""
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShow(!show)}
              className="bg-blue-600 active:bg-blue-700 transition-all duration-150 sm:hover:bg-blue-700 text-xl w-[100px] font-bold text-white p-2 rounded-md"
            >
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
            {({ setFieldValue, values, resetForm }) => (
              <Form className="flex gap-2  flex-col md:flex-row flex-wrap">
                <div className="flex flex-col">
                  <label className="text-md text-white/80">City Name</label>
                  <Field
                    className="bg-white/10 w-full  sm:w-[350px] rounded-md p-2 outline-none"
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
                    className="bg-white/10 w-full sm:max-w-[350px] rounded-md p-2 outline-none"
                    type="text"
                    maxLength="10"
                    placeholder="Enter Mobile Number"
                    name="contactNumber"
                  ></Field>
                </div>
                <div>
                  <label className="text-md text-white/80">Gender</label>
                  <div className="bg-white/10  w-full  sm:w-[350px] rounded-md p-2 outline-none flex items-center gap-4">
                    <div className="gap-1 flex items-center">
                      <Field
                        className="bg-white/10 rounded-md p-2 outline-none"
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
                        className="bg-white/10 rounded-md p-2 outline-none"
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
                  <div className="bg-white/10 w-full sm:w-[350px] rounded-md p-2 outline-none">
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
                      loading ? "bg-blue-600" : "bg-blue-600"
                    } md:hover:bg-blue-700 font-bold active:bg-blue-700 text-white transition-all duration-200  p-1 rounded-lg w-[130px] text-2xl`}
                  >
                    {loading?"Saving...":"Save"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {show && <UpdateProfilePicture show={show} setShow={setShow} />}
    </div>
  );
};

export default EditProfile;
