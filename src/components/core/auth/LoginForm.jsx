import { Formik,Field,Form } from "formik";
import toast from "react-hot-toast";
const LoginForm=()=>{
    const handle=()=>{
        toast.success("Successfull login!")
    }
    return (
        <div className=" h-screen flex  items-center justify-center w-fit     mx-auto ">
            <Formik  onSubmit={(values)=>{console.log(values)}} initialValues={{email:"",password:""}} >
                <Form className="flex  flex-col ">
                    <label className="text-xl">Email Address</label>
                    <Field  className=" text-black outline-none p-3 w-full md:w-[25rem] rounded-md font-semibold text-xl" placeholder="Enter email address" name="email" type="email" />
                    <label className="text-xl mt-6 ">Password</label>
                    <Field className="text-black p-3 w-full md:w-[25rem] outline-none rounded-md text-xl font-semibold" placeholder="Enter password" name="password" type="password" />
                    
                    <button onClick={handle}  className="bg-yellow-500 w-full text-black font-bold text-xl active:bg-yellow-400 p-2 rounded-md mt-3  " type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
}
export default LoginForm;