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
        
           await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/auth/login",{
                email:data.email,password:data.password
            }, {
                withCredentials: true // Include cookies in the request
            }).then(res=>{
                console.log("response",res.data.token);
                response=res.data;
            })
            
          
           console.log("response->",response)
            toast.success(`Welcome to MASTER, ${response.registredUser.FirstName}`);
            dispatch(authAction.setToken(response.token));
            dispatch(profileAction.setProfile(response.registredUser.ProfilePicture))
            console.log( response.registredUser.ProfilePicture);
           
            localStorage.setItem("token",JSON.stringify(response.token));
            localStorage.setItem("user",JSON.stringify(response.registredUser));
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("Login api error",error.response.data.message);
            if(error.response.data.message){

                toast.error(error.response.data.message);
            }
            else{
                toast.error("Something went wrong or Server Offline")
            }
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
            
            await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/auth/signup",{
                FirstName:data.FirstName,
                LastName:data.LastName,
                Email:data.Email,
                Contact_Number:data.Contact_Number,
                Password:data.Password,
                ConfirmPassword:data.ConfirmPassword,
                role:"Student",
                otp:String(data.otp)
            }).then(res=>{
                response=res
            })
            console.log("response",response);
            
            navigate("/login")
            toast.success(response.data.message)
           
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
        dispatch(authAction.setLoading(false));
        toast.dismiss(toastId);



    }
}
export const opt=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Loading");
        dispatch(authAction.setLoading(true));
        let response;
        
        try {
            await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/auth/otp",{
                email:data.Email
            }).then(res=>{
                response=res;
            })
            console.log("data",data.Email)
    
        dispatch(authAction.setSignUpData(data))
        toast.success(response.data.message);
        navigate("/signup/verify-email")
        } catch (error) {
            if(error.response.data.message){

                toast.error(error.response.data.message)
            }
            else{
                toast.error("Something went wrong")
            }
            
        }
        dispatch(authAction.setLoading(false));
        toast.dismiss(toastId)

    }
}
export const logout=(navigate)=>{
    return (dispatch)=>{
        dispatch(authAction.setToken(null));
        dispatch(profileAction.setProfile(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out Successfully")
        navigate("/")
    }
    
}

export const resetPassword=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Loading");
        try{
            const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/auth/changepassword",{
                oldpassword:data.oldPassword,
                password:data.password,
                ConfirmPassword:data.confirmPassword
            }, {
                withCredentials: true
            })
            // console.log("Request headers:", response.config.headers);
            console.log("Response headers:", response.headers);
            toast.success("Successfully Password Changed")




        }catch(error){
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }
            else{
                toast.error("Something went wrong")
            }

        }
        toast.dismiss(toastId);

    }
    
}