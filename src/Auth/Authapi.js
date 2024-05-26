import axios from "axios";
import authSlice, { authAction } from "../store/authSlice"
import { toast } from "react-hot-toast"
import {profileAction} from "../store/profileSlice"
import  CryptoJS  from "crypto-js";
import { cardAction } from "../store/cardSlice";

export const login=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Logging in...");
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
        const toastId=toast.loading("Signing up...");
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
        localStorage.clear();
        document.cookie = '__EDT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(cardAction.reset());
        toast.success("Logged Out Successfully")
        navigate("/")
    }
    
}

export const resetPassword=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Changing...");
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


export const getCourseDetail = async (courseId, signal) => {
  const toastId = toast.loading("Loading");
  let response;

  try {
    const res = await axios.get("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/profile/getEnrolledCourses", {
      withCredentials: true,
      signal: signal,
    });
    response = res;

    const Text = CryptoJS.AES.encrypt(JSON.stringify(response.data.courseDetail), "EDVKAS9").toString();
    localStorage.setItem("EC", Text);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.log("Error fetching course details", error);
    }
  } finally {
    toast.dismiss(toastId);
  }

  return response;
};

export const addCourseDetails = async (formData) => {
  const toastId = toast.loading('Loading');
  
  try {
    const response = await axios.post(
      'https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/createCourse',
      formData,
      {
        withCredentials: true,
      }
    );

    toast.success('Course Details Added Successfully');
    console.log('Course creation response:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error creating course:', error);
    toast.error('Something went wrong while creating course');
  } finally {
    toast.dismiss(toastId);
  }
};
export const createSection=async(data)=>{
    const toastId = toast.loading('Loading');
    try {
        const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/createSection",{
            sectionName:data.sectionName,
            courseId:data.courseId
        },{
            withCredentials:true
        })
        toast.success('Section Details Added Successfully');
        console.log('Section creation response:', response.data);
        return response.data
    } catch (error) {
        console.error("Error creating Section",error);
        toast.error(error.response.data.message);
    }finally{
        toast.dismiss(toastId)
    }
}

export const deleteSection=async(data)=>{
    const toastId = toast.loading('Deleting');
    try {
        console.log("Data",data)
        const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/deleteSection",data,{
            withCredentials:true
        })
        toast.success('Section Deleted Successfully');
        console.log('Section Delete response:', response.data);
        return response.data
    } catch (error) {
        console.error("Error Deleting Section",error);
        toast.error(error.response.data.message);
    }finally{
        toast.dismiss(toastId)
    }
}
export const deleteSubSection=async(data)=>{
    const toastId = toast.loading('Deleting');
    try {
        console.log("Data",data)
        const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/deleteSubSection",data,{
            withCredentials:true
        })
        toast.success('Sub Section Deleted Successfully');
        console.log('Sub Section Delete response:', response.data);
        return response.data
    } catch (error) {
        console.error("Error Deleting Sub Section",error);
        toast.error(error.response.data.message);
    }finally{
        toast.dismiss(toastId)
    }
}
export const createSubSection=async(data)=>{
    const toastId = toast.loading('Loading');
    try {
        console.log("Data",data)
        const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/createSubSection",data,{
            withCredentials:true
        })
        toast.success('Sub Section Created Successfully');
        console.log('Sub Section Create response:', response.data);
        return response.data
    } catch (error) {
        console.error("Error Creating Sub Section",error);
        toast.error(error.response.data.message);
    }finally{
        toast.dismiss(toastId)
    }
}
export const updateSubSection=async(data)=>{
    const toastId = toast.loading('Loading');
    try {
        console.log("Data",data)
        const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/updateSubSection",data,{
            withCredentials:true
        })
        toast.success('Sub Section updated Successfully');
        console.log('Sub Section updated response:', response.data);
        return response.data
    } catch (error) {
        console.error("Error updating Sub Section",error);
        toast.error(error.response.data.message);
    }finally{
        toast.dismiss(toastId)
    }
}

export const updateSection=async(data)=>{
    const toastId = toast.loading('Loading');
    try {
        console.log("Data",data)
        const response=await axios.post("https://ed-tech-platform-1-n5ez.onrender.com/api/v1/course/updateSection",data,{
            withCredentials:true
        })
        toast.success(' Section updated Successfully');
        console.log(' Section updated response:', response.data);
        return response.data
    } catch (error) {
        console.error("Error  updating Section",error);
        toast.error(error.response.data.message);
    }finally{
        toast.dismiss(toastId)
    }
}