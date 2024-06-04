import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { opt } from "../../../APIs/Authapi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import * as Yup from "yup";

import { authAction } from "../../../store/authSlice";
import Switch from "./Switch";

const SignupForm = () => {
  let {roll}=useParams();
  const temp=roll.charAt(0).toUpperCase() + roll.slice(1).toLowerCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  dispatch(authAction.setForgotPassword(false));
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Contact_Number: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Contact Number is required"),
    Password: Yup.string().required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (data) => {
    // console.log("data->",data)
    if (data.Password !== data.ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await dispatch(opt(data, navigate));
      setLoading(false);
    } catch (error) {
      console.error("Signup failed:", error);
      
      toast.error("Signup failed. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      exit={{ opacity: 0 }}
      className="flex h-screen  pt-[3rem] sm:pt-[15vh] flex-col gap-1 xs:gap-3 px-2 items-center"
    >
      <h1 className="text-[2.5rem] mt-[1rem] mx-2 md:text-[4em] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">
        Create Master Account
      </h1>
     
      <Formik
        initialValues={{
          FirstName: "",
          LastName: "",
          Email: "",
          Contact_Number: "",
          Password: "",
          ConfirmPassword: "",
          role:temp,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="  ">
        <div  className=" w-full ">
          <Switch roll={temp}/>
        </div>
          <div className="w-screen xs:w-full p-6 rounded-3xl flex flex-col gap-2 xs:gap-5">
            <div className="flex w-full flex-col xs:flex-row justify-center gap-2 xs:gap-2">
              <div>
                <Field
                  className="bg-white/10 outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter First Name"
                  
                  name="FirstName"
                  type="text"
                />
                <ErrorMessage name="FirstName" component="div" className="text-red-400 text-sm" />
              </div>
              <div>
                <Field
                  className="bg-white/10 outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Last Name"
                  
                  name="LastName"
                  type="text"
                />
                <ErrorMessage name="LastName" component="div" className="text-red-400 text-sm" />
              </div>
            </div>
            <div>
              <Field
                className="bg-white/10 outline-none p-3 w-full rounded-md font-semibold text-sm sm:text-xl"
                placeholder="Enter Email"
                
                name="Email"
                type="email"
              />
              <ErrorMessage name="Email" component="div" className="text-red-400 text-sm" />
            </div>
            <div>
              <Field
                className="bg-white/10 outline-none p-3 w-full rounded-md font-semibold text-sm sm:text-xl"
                placeholder="Enter Contact Number"
                
                name="Contact_Number"
                type="number"
                maxLength={10}
          inputProps={{ maxLength: 10 }}
                
              />
              <ErrorMessage name="Contact_Number" component="div" className="text-red-400 text-sm" />
            </div>
            <div className="flex flex-col vm:flex-row justify-center gap-2 xs:gap-5 vm:gap-2 ">
              <div>
                <Field
                  
                  className="bg-white/10 outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Password"
                  name="Password"
                  type="password"
                />
                <ErrorMessage name="Password" component="div" className="text-red-400 text-sm" />
              </div>
              <div>
                <Field
                  
                  className="truncate bg-white/10 outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Confirm Password"
                  name="ConfirmPassword"
                  type="password"
                />
                <ErrorMessage name="ConfirmPassword" component="div" className="text-red-400 text-sm" />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-yellow-500 hover:bg-yellow-600 text-yellow-950 w-full transition-all duration-150 font-bold text-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }  active:bg-yellow-600 p-2 rounded-md mt-3  `}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </Form>
      </Formik>
    </motion.div>
  );
};

export default SignupForm;
