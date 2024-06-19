import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../APIs/mainAPI";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(login(data, navigate));
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex  min-h-screen  pt-[3rem] sm:pt-[20vh] flex-col gap-1 xs:gap-3 px-2 items-center"
    >
      <h1 className="text-[2.5rem] mt-[1rem] mx-2 md:text-[4em] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">
        Welcome Back
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-8 w-full backdrop-blur-sm px-3 max-w-[30rem] ">
          <div className="flex flex-col gap-2">
            <div>
              <Field
                className="outline-offset-0 bg-white/10 outline-none p-3 w-full rounded-md font-semibold text-xl sm:text-2xl"
                placeholder="Enter email address"
                name="email"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                className="bg-white/10 p-3 outline-offset-0 w-full outline-none rounded-md text-xl sm:text-2xl font-semibold"
                placeholder="Enter password"
                name="password"
                type="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div className="block mt-1 font-semibold text-end">
            <Link
              to={"/reset-password"}
              className=" text-white/50 hover:text-white"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            disabled={loading}
            className={`bg-yellow-500 hover:bg-yellow-600 text-yellow-950 transition-all duration-150 w-full font-bold text-2xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } active:bg-yellow-600 p-2 rounded-md mt-3`}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </Form>
      </Formik>
    </motion.div>
  );
};

export default LoginForm;
