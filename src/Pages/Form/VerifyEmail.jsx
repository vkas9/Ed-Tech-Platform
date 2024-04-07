import { useEffect, useRef, useState } from "react";
import Button from "../../components/Homepage/Button";
import { useDispatch,useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signup } from "../../Auth/Authapi";
import {Link,useNavigate} from "react-router-dom"
const VerifyEmail=()=>{
    const dispatch=useDispatch();
   const navigate= useNavigate();
    const arr = ['', '', '', '', '', ''];
    const ref = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [input, setInput] = useState(arr);
    const [missing,setMissing]=useState(arr);
    useEffect(() => {
        ref[0].current.focus();

    }, [])

    const handleInput = (e, index) => {
        const val = e.target.value;
        if (!Number(val)) return;
        const newInput = [...input];
        newInput[index] = val;
        setInput(newInput);

        if (index < input.length - 1) {
            ref[index + 1].current.focus();
        }
    };
    const handlePaste = (e) => {
        console.log(e.clipboardData);
        const data = e.clipboardData.getData('text');
        console.log("pasted Data", data);
        if (!Number(data) || data.length !== input.length) return;

        const newArr = data.split('');
        setInput(newArr);

        ref[input.length - 1].current.focus();



    }
    const handleOnKeyDown = (e, index) => {


        if (e.key === "Backspace") {
            const copyInput = [...input]
            copyInput[index] = '';
            setInput(copyInput);
            
            setTimeout(() => {
                if (index > 0) {
                    ref[index - 1].current.focus();
                }
            }, 10);
        }

    }
    const { signupdata } = useSelector((store) => store.auth);
    
    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log("fd")
        const missed=input.map((item,i)=>{
            if(item==='')return i;
        }).filter(item=>(item||item===0));
        setMissing(missed);
        if(missed.length===0){
            const userInput=Number(input.join(''));
            const data={...signupdata}
            
            data.otp=userInput;
            
            dispatch(signup(data,navigate))
           
            
        }
        else toast.error("Please Fill all Inputs")
    }
    return <div className="flex flex-col min-h-[calc(100vh-2.8rem)] items-center justify-center ">

        <div className="flex justify-center  gap-4 ">
            {arr.map((item, i) => {
                return <input key={i} value={input[i]} type="text" ref={ref[i]} maxLength="1" className={`text-black border-solid  font-bold text-center rounded-md md:text-4xl border-2 sm:w-[50px]  md:w-[70px] sm:text-2xl md:h-[60px] outline-green-500   ${missing.includes(i)?'border-red-500 animate-pulse ':''}  max-w-[100px]`} onPaste={handlePaste} onChange={(e) => handleInput(e, i)} onKeyDown={(e) => handleOnKeyDown(e, i)} />
            })}
        </div>
        <button onClick={handleSubmit2} className=" sm:px-[30px] sm:text-2xl mt-10 md:px-[60px] py-[15px] text-4xl text-white hover:bg-purple-600 transition-all outline-none duration-200 rounded-md bg-purple-800 font-bold uppercase">Submit</button>

    </div>
}
export default VerifyEmail;