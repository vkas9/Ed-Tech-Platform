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
    <div className="flex  min-h-[calc(100vh-2.8rem)]  pt-[3rem] sm:pt-[5rem] md:pt-[10rem] flex-col gap-1 xs:gap-3 px-2 items-center ">
    <h1 className="text-[2.5rem]  overflow-hidden mt-[1rem] mx-2  md:text-[4em]  bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center ">Create Student Account</h1>
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
        <Form className=" ">
          <div className="   border border-gray-500/50  w-screen xs:w-full p-4 rounded-xl flex flex-col px-2 gap-2 xs:gap-5">
         
            <div className="flex w-full flex-col xs:flex-row justify-center gap-2 xs:gap-2">
              <div >
                
                
                <Field className=" bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl" placeholder="Enter First Name" required name="FirstName" type="text"></Field>
              </div>
              <div>
                
                
                <Field className=" bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl" placeholder="Enter Last Name" required name="LastName" type="text"></Field>
              </div>
            </div>
            <div>

            
            <Field className=" bg-gray-700  outline-none p-3 w-full  rounded-md font-semibold text-sm sm:text-xl" placeholder="Enter Email" required name="Email" type="email"></Field>
            </div>
            <div>

           
            <Field className=" bg-gray-700  outline-none p-3 w-full rounded-md font-semibold text-sm sm:text-xl" placeholder="Enter Contact Number" required name="Contact_Number" type="tel" max={10}></Field>
            </div>
            <div className="flex flex-col vm:flex-row justify-center gap-2 xs:gap-5 vm:gap-2">
              <div>
                
               

                <Field 
                  required
                  className=" bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl" placeholder="Enter Password"
                  name="Password"
                  type="password"
                ></Field>
              </div>
              <div>
                
               
                <Field
                  required
                  className="truncate  bg-gray-700  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl" placeholder="Enter Confirm Password"
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
