import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPasswordOtp } from "../../APIs/mainAPI";
import { authAction } from "../../store/authSlice";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    setLoading(true);
    await forgotPasswordOtp(data, navigate);
    dispatch(authAction.setForgotPassword(true));
    dispatch(authAction.setUserEmail(data.email));

    setLoading(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="h-screen  relative flex flex-col overflow-x-hidden items-center justify-center w-full mx-auto"
    >
      <h1 className="text-[2.7rem] overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 max-w-fit bg-clip-text text-transparent font-bold text-center">
        Reset your password
      </h1>
      <div>
        <Formik
          onSubmit={(value) => handleSubmit(value)}
          initialValues={{ email: "" }}
        >
          <Form className="mt-8 w-full backdrop-blur-sm px-3  max-w-[40rem]  overflow-hidden ">
            <div>
              <Field
                className="outline-offset-0 w-full sm:w-[30rem] bg-white/10  outline-none p-3  rounded-md font-semibold text-xl sm:text-2xl"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
              ></Field>
            </div>
            <button
              disabled={loading}
              className={`bg-yellow-500  hover:bg-yellow-600 text-yellow-950   transition-all duration-150 w-full font-bold text-2xl ${
                loading ? "opacity-50 cursor-not-allowed" : " "
              } active:bg-yellow-600 p-2 rounded-md mt-3  `}
              type="submit"
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </Form>
        </Formik>
      </div>
    </motion.div>
  );
};
export default ForgotPassword;
