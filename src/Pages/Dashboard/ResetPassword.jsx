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
    <div className="mb-[3rem]">
      <h1 className="text-3xl ">Change Password</h1>

      <Formik
        onSubmit={(value) => handleSubmit(value)}
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <Form className=" mr-5  mt-6">
          <div className="p-4 bg-white/10 rounded-md   sm:w-[100%] lg:max-w-[55rem] w-full">
            <div className="flex flex-col gap-4 ">
              <div className=" flex flex-col ">
              <label className=" text-md  text-white/80">Current Password </label>
                <Field
                  className="bg-white/10 w-full max-w-[350px] rounded-md p-2 outline-none"
                  type="password"
                  required
                  placeholder="Current Password"
                  name="oldPassword"
                ></Field>
              </div>
              <div className="flex flex-col ">
              <label className=" text-md  text-white/80">New Password</label>
                <Field
                  className="bg-white/10 w-full max-w-[350px]  rounded-md p-2 outline-none"
                  type="password"
                  required
                  placeholder="New Password"
                  name="password"
                ></Field>
              </div>
              <div className="flex flex-col ">
              <label className=" text-md  text-white/80">Confirm New Password</label>
                <Field
                  className="bg-white/10 w-full max-w-[350px]  rounded-md p-2 outline-none"
                  type="password"
                  required
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                ></Field>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 md:hover:bg-yellow-400 active:bg-yellow-400   transition-all duration-200 bg-yellow-500 p-1 rounded-lg w-[130px] text-black text-2xl "
          >
            Change
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ResetPassword;
