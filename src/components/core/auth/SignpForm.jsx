import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { opt, signup } from "../../../Auth/Authapi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";
const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[loading,setLoading]=useState(false);
  const handleSubmit = async(data) => {
    if (data.Password !== data.ConfirmPassword) {
      toast.error("Password Not Matching");
      return;
    }
    setLoading(true);
    await dispatch(opt(data, navigate));
    setLoading(false);
  };
  return (
    <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.4,delay:.2,ease:[0,.71,.2,1.01]}} exit={{opacity:0}} className="flex  h-screen  pt-[3rem] sm:pt-[5rem]   flex-col gap-1 xs:gap-3 px-2 items-center ">
      <h1 className="text-[2.5rem]  overflow-hidden mt-[1rem] mx-2  md:text-[4em]  bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center ">
        Create Student Account
      </h1>
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
          <div className="     w-screen xs:w-full p-6 rounded-3xl flex flex-col  gap-2 xs:gap-5">
            <div className="flex w-full flex-col xs:flex-row justify-center gap-2 xs:gap-2">
              <div>
                <Field
                  className=" bg-white/10  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter First Name"
                  required
                  name="FirstName"
                  type="text"
                ></Field>
              </div>
              <div>
                <Field
                  className=" bg-white/10  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Last Name"
                  required
                  name="LastName"
                  type="text"
                ></Field>
              </div>
            </div>
            <div>
              <Field
                className=" bg-white/10  outline-none p-3 w-full  rounded-md font-semibold text-sm sm:text-xl"
                placeholder="Enter Email"
                required
                name="Email"
                type="email"
              ></Field>
            </div>
            <div>
              <Field
                className=" bg-white/10  outline-none p-3 w-full rounded-md font-semibold text-sm sm:text-xl"
                placeholder="Enter Contact Number"
                required
                name="Contact_Number"
                type="tel"
                maxlength={10}
              ></Field>
            </div>
            <div className="flex flex-col vm:flex-row justify-center gap-2 xs:gap-5 vm:gap-2 ">
              <div>
                <Field
                  required
                  className=" bg-white/10  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Password"
                  name="Password"
                  type="password"
                ></Field>
              </div>
              <div>
                <Field
                  required
                  className="truncate  bg-white/10  outline-none p-3 w-full md:w-[20rem] rounded-md font-semibold text-sm sm:text-xl"
                  placeholder="Enter Confirm Password"
                  name="ConfirmPassword"
                  type="password"
                ></Field>
              </div>
            </div>
            <button
            disabled={loading}
              type="submit"
              className={`bg-yellow-600  hover:bg-yellow-500 text-black w-full  transition-all duration-150 font-bold text-2xl ${loading?"opacity-50 cursor-not-allowed":""}  active:bg-yellow-500 p-2 rounded-md mt-3  `}
            >
              {loading?"Signing up...":"Signup"}
            </button>
          </div>
        </Form>
      </Formik>
    </motion.div>
  );
};
export default SignupForm;
