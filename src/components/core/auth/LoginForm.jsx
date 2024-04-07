import { Formik,Field,Form } from "formik";
import toast from "react-hot-toast";
import {Link,useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {login} from "../../../Auth/Authapi"
const LoginForm=()=>{
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const handleSubmit=(data)=>{
      
        dispatch(login(data,navigate));

    }

    
    return (
        <div className=" min-h-[calc(100vh-2.8rem)]  flex flex-col overflow-x-hidden items-center justify-center w-fit     mx-auto ">

            <h1 className="text-[3rem] overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-br from-red-500 to-blue-500 bg-clip-text text-transparent font-bold text-center ">Welcome Back</h1>
            <Formik  onSubmit={(values)=>(handleSubmit(values))} initialValues={{email:"",password:""}} >
                <Form className="flex  flex-col px-2overflow-hidden ">
                    <label className="text-xl font-bold mb-1">Email Address</label>
                    <Field  required className="outline-offset-0 bg-gray-700  outline-none p-3 w-full md:w-[25rem] rounded-md font-semibold text-xl" placeholder="Enter email address" name="email" type="email" />
                    <label className="text-xl mt-6 mb-1 font-bold">Password</label>
                    <Field required className="bg-gray-700 p-3 outline-offset-0   w-full md:w-[25rem] outline-none rounded-md text-xl font-semibold" placeholder="Enter password" name="password" type="password" />
                    <Link to={"/reset-password"} className="ml-auto mt-1 text-sm font-semibold">
                        <span>Forgot Password?</span>
                    </Link>
                    <button   className="bg-purple-700 w-full font-bold text-xl active:bg-purple-600 p-2 rounded-md mt-3  " type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default LoginForm;