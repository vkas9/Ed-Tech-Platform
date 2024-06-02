import { useEffect, useRef, useState } from "react";
import Button from "../../components/Homepage/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signup, opt, verifyForgotOTP, forgotPasswordOtp } from "../../Auth/Authapi";
import { Link, useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const arr = ["", "", "", "", "", ""];
  const ref = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [input, setInput] = useState(arr);
  const [missing, setMissing] = useState(arr);
  useEffect(() => {
    ref[0].current.focus();
  }, []);

  const handleInput = (e, index) => {
    const val = e.target.value;
    if (val === 0 && !Number(val)) return;
    const newInput = [...input];
    newInput[index] = val;
    setInput(newInput);

    if (index < input.length - 1) {
      ref[index + 1].current.focus();
    }
  };
  const handlePaste = (e) => {
    // console.log(e.clipboardData);
    const data = e.clipboardData.getData("text");
    // console.log("pasted Data", data);
    if (!Number(data) || data.length !== input.length) return;

    const newArr = data.split("");
    setInput(newArr);

    ref[input.length - 1].current.focus();
  };
  const handleOnKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const copyInput = [...input];
      copyInput[index] = "";
      setInput(copyInput);

      setTimeout(() => {
        if (index >= 0) {
          ref[index - 1].current.focus();
        }
      }, 10);
    }
  };
  const { signupdata, forgotPassword,userEmail } = useSelector((store) => store.auth);

  useEffect(() => {
    console.log("forgotPassword", forgotPassword);
    if (!signupdata && !forgotPassword) {
      navigate("/login");
    }
  }, []);
  const handleSubmit2 = async(e) => {
    const missed = input
      .map((item, i) => {
        if (item === "") return i;
      })
      .filter((item) => item || item === 0);
    setMissing(missed);
    if (missed.length === 0) {
      const userInput = Number(input.join(""));
      const data = { ...signupdata };

      data.otp = userInput;
      if (!forgotPassword) {
        dispatch(signup(data, navigate));
      }
      else{
       await verifyForgotOTP({data,email:userEmail},navigate)
      }
    } else toast.error("Please Fill all Inputs");
  };

  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }} className="flex flex-col h-[100vh] items-center justify-center ">
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit2();
          }
        }}
        className="flex justify-center px-2 relative gap-2 md:gap-4 "
      >
        {arr.map((item, i) => {
          return (
            <input
              key={i}
              value={input[i]}
              type="text"
              ref={ref[i]}
              maxLength="1"
              className={` bg-white/20  font-bold text-center min-w-[20px] rounded-md w-full md:w-[50px] h-[40px] text-4xl  box-content overflow-hidden p-1 sm:p-3 outline-none   ${
                missing.includes(i)
                  ? " border-2 border-red-500 animate-pulse "
                  : ""
              }  max-w-[100px]`}
              onPaste={handlePaste}
              onChange={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleOnKeyDown(e, i)}
            />
          );
        })}
        <div
          onClick={async() => {
            if (!forgotPassword) {
              dispatch(opt(signupdata, navigate));
            }
            else{
             await forgotPasswordOtp({email:userEmail},navigate)
            }
            
          }}
          className="absolute right-2 -bottom-8 font-semibold text-lg"
        >
          <button className=" text-white/60 hover:text-white ">
            Resend OTP{" "}
          </button>
        </div>
      </div>
      <button
        onClick={() => handleSubmit2()}
        className="  sm:text-md mt-10 px-[30px] md:px-[50px] py-[12px] text-2xl text-white hover:bg-purple-700 transition-all outline-none duration-200 rounded-md bg-purple-800 font-bold uppercase"
      >
        Submit
      </button>
    </motion.div>
  );
};
export default VerifyEmail;
