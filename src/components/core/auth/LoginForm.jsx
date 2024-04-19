import { Formik,Field,Form } from "formik";
import toast from "react-hot-toast";
import {Link,useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {login} from "../../../Auth/Authapi"
import { useEffect } from "react";
const LoginForm=()=>{
    const navigate = useNavigate()
    const dispatch=useDispatch();
    // const token=localStorage.getItem("token");
    // console.log("token");
    // useEffect(()=>{
    //     if(token){
    //         navigate("/dashboard/my-profile");
    //     }
    // },[])
    const handleSubmit=(data)=>{
      
        dispatch(login(data,navigate));

    }

    
    return (
        <div className=" min-h-[calc(100vh-2.8rem)]  flex flex-col overflow-x-hidden items-center justify-center w-fit     mx-auto ">

            <h1 className="text-[3rem] overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center ">Welcome Back</h1>
            <Formik  onSubmit={(values)=>(handleSubmit(values))} initialValues={{email:"",password:""}} >
                <Form className="mt-8 px-2 overflow-hidden ">
                 <div className="flex flex-col gap-8">

                    <Field  required className="outline-offset-0 bg-white/10  outline-none p-3 w-full md:w-[25rem] rounded-md font-semibold text-xl" placeholder="Enter email address" name="email" type="email" />
                    
                    <Field required className="bg-white/10 p-3 outline-offset-0   w-full md:w-[25rem] outline-none rounded-md text-xl font-semibold" placeholder="Enter password" name="password" type="password" />
                 </div>
                    <Link to={"/reset-password"} className="block mt-1 text-gray-400 hover:text-white font-semibold  text-end ">
                        <span>Forgot Password?</span>
                    </Link>
                    <button   className="bg-purple-700 w-full font-bold text-xl active:bg-purple-600 p-2 rounded-md mt-3  " type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default LoginForm;