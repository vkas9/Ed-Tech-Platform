import axios from "axios";
import authSlice, { authAction } from "../store/authSlice"
import { toast } from "react-hot-toast"
import {profileAction} from "../store/profileSlice"
export const login=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(authAction.setLoading(true));
        let response;
        try {
            console.log(data.email)
           await axios.post("/api/v1/auth/login",{
                email:data.email,password:data.password
            }).then(res=>{
                console.log("response",res.data);
                response=res.data;
            })
            
           
            toast.success("Login Successful");
            dispatch(authAction.setToken(response.token));
            dispatch(profileAction.setProfile(response.registredUser.ProfilePicture))
            console.log( response.registredUser.ProfilePicture);
           
            localStorage.setItem("token",JSON.stringify(response.token));
            localStorage.setItem("user",JSON.stringify(response.registredUser));
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("Login api error",error);
            toast.error("Login Faild");
        }
        dispatch(authAction.setLoading(false));
        toast.dismiss(toastId)

    }
}

export const signup=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Loading");
        dispatch(authAction.setLoading(true));
        let response;
        try {
            
            await axios.post("/api/v1/auth/signup",{
                FirstName:data.FirstName,
                LastName:data.LastName,
                Email:data.Email,
                Contact_Number:data.Contact_Number,
                Password:data.Password,
                ConfirmPassword:data.ConfirmPassword,
                role:"Student",
            }).then((res)=>{
                response=res;
            })
            toast.success("Successfully Signup")
            navigate("/login")
           
        } catch (error) {
            console.log("error",error)
        }
        toast.dismiss(toastId);



    }
}