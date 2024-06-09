import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { updateProfile } from "../../../APIs/Authapi";

const EditProfile = () => {
  const { user } = useSelector((store) => store.profile);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await updateProfile(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Edit Profile</h1>
      <div className="mt-8 mr-5 sm:mr-0 sm:px-0">
        <div className="p-4 flex flex-col sm:flex-row items-center bg-white/10 rounded-md py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem]">
          <div className="min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px]">
            <img src={user.avatar} className="" alt="" />
          </div>
          <div className="flex gap-2">
            <div className="bg-white/10 flex items-center gap-2 hover:bg-white/20 hover:cursor-pointer p-2 rounded-md">
              <MdFileUpload size={25} />
              <label htmlFor="file-upload" className="hover:cursor-pointer">
                Upload
              </label>
            </div>
            <input
              id="file-upload"
              className="ml-2 hidden bg-white/10"
              type="file"
            />
            <button className="bg-green-500 hover:bg-green-600 text-xl w-[100px] font-bold text-black p-2 rounded-md">
              Change
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 mr-5 sm:mr-0 sm:px-0">
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
            {({ setFieldValue, values }) => (
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
    </div>
  );
};

export default EditProfile;
