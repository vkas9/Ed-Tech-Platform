import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import {
  signup,
  opt,
  verifyForgotOTP,
  forgotPasswordOtp,
} from "../../APIs/mainAPI";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [missing, setMissing] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

  const { signupdata, forgotPassword, userEmail } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (!signupdata && !forgotPassword) {
      navigate("/login");
    }
  }, []);

  const handleChange = (otp) => {
    setOtp(otp);
    if (missing) setMissing(false);
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setMissing(true);
      if (toastShow) {
        toast.dismiss(toastShow);
        setToastShow(false);
      }
      const toastId = toast.error("Please fill all inputs");
      setToastShow(toastId);
      return;
    }

    const userInput = Number(otp);
    const data = { ...signupdata, otp: userInput };

    if (!forgotPassword) {
      dispatch(signup(data, navigate));
    } else {
      await verifyForgotOTP({ data, email: userEmail }, navigate);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex flex-col h-[100vh] items-center justify-center"
    >
      <div
        className="flex justify-center flex-wrap   px-2 relative gap-2 md:gap-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <OTPInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          inputType={"tel"}
          renderInput={(props) => <input {...props} />}
          inputStyle="bg-white/20 py-2  font-bold text-center max-w-[25px]  vm:w-[25px] rounded-md md:min-w-[60px] h-[50px] text-4xl  box-content overflow-hidden p-1 sm:p-3 outline-none"
          containerStyle={{ gap: ".5rem" }}
        />
        <div
          onClick={async () => {
            if (!forgotPassword) {
              dispatch(opt(signupdata, navigate));
            } else {
              
              if(sendingOTP){
                return 
              }
              setSendingOTP(true)
              await forgotPasswordOtp({ email: userEmail }, navigate);
              setSendingOTP(false)

            }
          }}
          className="absolute right-2 -bottom-8 font-semibold text-lg"
        >
          <button className="text-white/50  sm:hover:text-white active:text-white">
            Resend OTP
          </button>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="sm:text-md mt-10 px-[30px] md:px-[50px] py-[12px] text-2xl text-white hover:bg-purple-700 transition-all outline-none duration-200 rounded-md bg-purple-800 font-bold uppercase"
      >
        Verify
      </button>
    </motion.div>
  );
};

export default VerifyEmail;
