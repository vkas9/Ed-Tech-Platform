import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className=" mb-6">
      <h1 className="text-3xl ">Edit Profile</h1>
      <div className="mt-8  mr-5 sm:mr-0 sm:px-0  ">
        <div className=" p-4 flex flex-col sm:flex-row items-center  bg-gray-500/30 rounded-md py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem] ">
          <div className="min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px]   ">
            <img loading="lazy" src={user.ProfilePicture} className="" alt="" />
          </div>
          <div className=" flex gap-2">
            <label for="file-upload" className="bg-white/10 hover:bg-white/20 hover:cursor-pointer p-2 rounded-md">Upload</label>
            <input
              id="file-upload"
              className="ml-2 hidden bg-white/10 "
              type="file"
            />
            <button className="bg-green-500 text-black p-2 rounded-md ">
            Change
          </button>
          </div>
          
        </div>
      </div>
      <div className="mt-8 mr-5 sm:mr-0  sm:px-0  ">
        
        <div className=" p-4 flex flex-col sm:flex-row items-center  bg-gray-500/30 rounded-md py-6 gap-4 w-full sm:w-[95%] lg:max-w-[55rem] ">
          
          <Formik
            onSubmit={(value) => handleSubmit(value)}
            initialValues={{
              city: "",
              contactNumber: "",
              Gender: "",
              dateOfBirth: "",
            }}
          >
            
            <Form className=" mt-6 flex gap-2 flex-wrap">
              
              <div>
                <label  className=" text-md  text-white/80"> City Name </label>
                <Field
                  className="bg-white/20 w-full max-w-[350px] rounded-md p-2 outline-none"
                  type="text"
                  required
                  placeholder="Enter City"
                  name="city"
                ></Field>
              </div>
              <div>
                <label className=" text-md  text-white/80">
                  Contact Number
                </label>
                <Field
                  className="bg-white/20 w-full max-w-[350px] rounded-md p-2 outline-none"
                  type="text"
                  maxlength="10"
                  required
                  placeholder="Enter Mobile Number"
                  name="contactNumber"
                ></Field>
              </div>
              <div>
                <label className=" text-md  text-white/80">Gender </label>
                <div className="  bg-white/20 w-full md:w-[324.5px] max-w-[350px] rounded-md p-2 outline-none flex items-center gap-4">
                  <div className="  gap-1 flex">
                    <Field
                      className="bg-white/20 w-full max-w-[350px] rounded-md p-2 outline-none"
                      type="radio"
                      required
                      placeholder="Enter Mobile Number"
                      name="gender"
                    ></Field>
                    <label>Female</label>
                  </div>
                  <div className="gap-1 flex">
                    <Field
                      className="bg-white/20 w-full max-w-[350px] rounded-md p-2 outline-none"
                      type="radio"
                      required
                      placeholder="Enter Mobile Number"
                      name="gender"
                    ></Field>
                    <label>Male</label>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col">
                <label className=" text-md  text-white/80">Date of Birth</label>
                <Field
                  className="bg-white/20 w-full md:w-[350px] max-w-[350px] rounded-md p-2 outline-none"
                  type="date"
                  required
                  placeholder="Enter City"
                  name="Gender"
                ></Field>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
