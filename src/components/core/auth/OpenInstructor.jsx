
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const OpenInstructor=({children})=>{
    const {token}=useSelector((store)=>store.auth)
   const {user}=useSelector((store)=>store.profile)
    if(token===null)return children;
    else{
        if(user?.role==="Instructor"){
            toast.success("You are now in Instructor mode")
            return <Navigate to="/dashboard/my-profile"/>
        }else{
            return children;
        }
    } 
}
export default OpenInstructor;