import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { resetPasswordOut } from "../../APIs/mainAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
const ResetPasswordOut = () => {
  const [loading, setLoading] = useState(false);
  const { userEmail, forgotPassword } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!forgotPassword) {
      navigate("/login");
    }
  }, []);
  const handleSubmit = async (data) => {
    setLoading(true);
    // console.log("dat",data)

    if (data.password !== data.confirmPassword) {
      toast.error("Password Not Matching");
      setLoading(false);
      return;
    }
    // console.log("data->", data);

    try {
      await resetPasswordOut({ data, email: userEmail }, navigate);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="h-screen  relative flex flex-col overflow-x-hidden items-center justify-center w-full mx-auto"
    >
      <h1 className="text-[2.7rem] overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">
        Reset Password
      </h1>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
      >
        <Form className=" mr-5  mt-6">
          <div className="  rounded-md   sm:w-[100%] lg:max-w-[55rem] w-full">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col ">
                {/* <label className=" text-md  text-white/80">New Password</label> */}
                <Field
                  className="outline-offset-0 w-full sm:w-[25rem] bg-white/10  outline-none p-3  rounded-md font-semibold text-xl sm:text-2xl"
                  type="password"
                  required
                  placeholder="New Password"
                  name="password"
                ></Field>
              </div>
              <div className="flex flex-col ">
                {/* <label className=" text-md  text-white/80">Confirm New Password</label> */}
                <Field
                  className="outline-offset-0 w-full sm:w-[25rem] bg-white/10  outline-none p-3  rounded-md font-semibold text-xl sm:text-2xl"
                  type="password"
                  required
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                ></Field>
              </div>
            </div>
          </div>
          <button
            className={`bg-yellow-500  hover:bg-yellow-600 text-yellow-950   transition-all duration-150 w-full font-bold text-2xl ${
              loading ? "opacity-50 cursor-not-allowed" : " "
            } active:bg-yellow-600 p-2 rounded-md mt-3  `}
            disabled={loading}
            type="submit"
          >
            {loading ? "Changing..." : "Change"}
          </button>
        </Form>
      </Formik>
    </motion.div>
  );
};
export default ResetPasswordOut;
