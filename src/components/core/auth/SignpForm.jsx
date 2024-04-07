import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { opt, signup } from "../../../Auth/Authapi";
import toast from "react-hot-toast";
const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    
    if(data.Password!==data.ConfirmPassword){
        toast.error("Password Not Matching");
        return;
    }
  
    dispatch(opt(data,navigate))
   
  };
  return (
    <div className="flex min-h-[calc(100vh-2.8rem)] flex-col gap-3 items-center justify-center">
    <h1 className="text-[2rem] overflow-hidden mt-[4rem] md:mt-[0rem] md:text-[4em]  bg-gradient-to-br from-yellow-500 to-red-500 bg-clip-text text-transparent font-bold text-center ">Enter the MASTER World</h1>
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{
          FirstName: "",
          LastName: "",
          Email: "",
          Contact_Number: "",
          Password: "",
          ConfirmPassword: "",
          role: "",
        }}
      >
        <Form>
          <div className=" flex flex-col px-2 gap-3">
         
            <div className="flex flex-col md:flex-row justify-center gap-3">
              <div >
                <label className="text-xl font-bold mb-1">First Name</label>
                <br />
                <Field className=" bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-xl" placeholder="Enter First Name" required name="FirstName" type="text"></Field>
              </div>
              <div>
                <label className="text-xl font-bold mb-1">Last Name</label>
                <br />
                <Field className=" bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-xl" placeholder="Enter Last Name" required name="LastName" type="text"></Field>
              </div>
            </div>
            <div>

            <label className="text-xl font-bold  ">Email</label>
            <Field className=" bg-gray-700  outline-none p-3 w-full  rounded-md font-semibold text-xl" placeholder="Enter Email" required name="Email" type="email"></Field>
            </div>
            <div>

            <label className="text-xl font-bold ">Contact Number</label>
            <Field className=" bg-gray-700  outline-none p-3 w-full rounded-md font-semibold text-xl" placeholder="Enter Contact Number" required name="Contact_Number" type="tel" max={10}></Field>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-3">
              <div>
                <label className="text-xl font-bold mb-1">Password</label>
                <br />

                <Field 
                  required
                  className=" bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-xl" placeholder="Enter Password"
                  name="Password"
                  type="password"
                ></Field>
              </div>
              <div>
                <label className="text-xl font-bold mb-1">Re-Enter Password</label>
                <br />
                <Field
                  required
                  className="truncate  bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-xl" placeholder="Enter Confirm Password"
                  name="ConfirmPassword"
                  type="password"
                ></Field>
              </div>
            </div>
            <button type="submit" className="bg-purple-700 w-full font-bold text-xl active:bg-purple-500 p-2 rounded-md mt-3  " >
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default SignupForm;
