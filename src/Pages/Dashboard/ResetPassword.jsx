import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../Auth/Authapi";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password Not Matching");
      return;
    }
    console.log("data->", data);
    dispatch(resetPassword(data, navigate));
  };
  return (
    <div>
      <h1 className="text-3xl ">Change Password</h1>

      <Formik
        onSubmit={(value) => handleSubmit(value)}
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <Form className=" mt-6">
          <div className="flex flex-col gap-4 pr-[20px] ">
            <div className="  ">
              <Field
                className="bg-white/20 w-full max-w-[350px] rounded-md p-2 outline-none"
                type="text"
                required
                placeholder="Current Password"
                name="oldPassword"
              ></Field>
            </div>
            <div className=" ">
              <Field
                className="bg-white/20 w-full max-w-[350px]  rounded-md p-2 outline-none"
                type="text"
                required
                placeholder="New Password"
                name="password"
              ></Field>
            </div>
            <div className=" ">
              <Field
                className="bg-white/20 w-full max-w-[350px]  rounded-md p-2 outline-none"
                type="text"
                required
                placeholder="Confirm New Password"
                name="confirmPassword"
              ></Field>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 md:hover:bg-yellow-600 active:bg-yellow-600 shadow-inner active:shadow-yellow-700 md:hover:shadow-yellow-700  transition-all duration-200 bg-yellow-500 p-1 rounded-lg w-[130px] text-black text-2xl "
          >
            Change
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ResetPassword;
