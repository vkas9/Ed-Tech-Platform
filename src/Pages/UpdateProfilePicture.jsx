import React, { useState } from "react";
import { Formik, Form } from "formik";
import UploadProfile from "./UploadProfile"
import { updateDisplayProfile } from "../APIs/Authapi";
import { useDispatch } from "react-redux";

const UpdateProfilePicture = ({show,setShow}) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    profilePicture: null,
  };
const dispatch=useDispatch()
  const handleSubmit = async(values) => {
    console.log("Form values:", values.profilePicture);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", values.profilePicture);
  
      await updateDisplayProfile(dispatch,formData);
      setShow(!show)
    
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  onClick={()=>{
   
      setShow(!show)}} className="h-screen z-[10] overflow-y-auto   px-2 w-screen fixed top-0 left-0 bg-black/50 flex items-start sm:items-center justify-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form onClick={(e)=>e.stopPropagation()}  className="bg-gradient-to-tr h-fit   mt-[6rem] sm:mt-[0rem] from-[#010035] via-gray-950/100 to-black   p-4 max-w-[500px] w-[500px] rounded-md">
            <UploadProfile name="profilePicture" label="Profile Picture" />
            <div className="w-full flex flex-col sm:flex-row items-center justify-between">

            
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-blue-950 active:bg-blue-600 sm:hover:bg-blue-600 py-1 px-4 rounded"
              disabled={isSubmitting}
            >
              Update Profile Picture
            </button>
            <button  onClick={()=>setShow(!show)} className="bg-white/10 py-1 mt-4 hover:bg-white/20 rounded-full px-7">Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfilePicture;
