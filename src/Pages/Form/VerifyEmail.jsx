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
  const [loading,setLoading]=useState(false)
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
    setLoading(true)
    try {
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
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
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
      <h1 className=" text-[2.1rem] vm:text-[2.3rem] oi:text-[2.7rem] px-1 overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">
      Enter verification code
      </h1>
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
        onClick={()=>{
          if(!loading){
            handleSubmit()
          }
         
        }}
        disabled={loading}
        className={`sm:text-md mt-10 px-[30px] md:px-[50px] py-[6px] text-2xl  transition-all outline-none duration-200 rounded-md bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-bold uppercase ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
         {loading ? "Verify..." : "Verify"}
      </button>
    </motion.div>
  );
};

export default VerifyEmail;
