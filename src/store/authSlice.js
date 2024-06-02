import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState: {token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
                    loading:false,
                    signupdata:null,
                    forgotPassword:false,
                    userEmail:null

},
    reducers:{
        setToken(state,action){
            state.token=action.payload;
        },
        setLoading(state,action){
            state.loading=action.payload;
        },
        setSignUpData(state,action){
            state.signupdata=action.payload;
        },
        setForgotPassword(state,action){
            state.forgotPassword=action.payload
        },
        setUserEmail(state,action){
            state.userEmail=action.payload
        },
        
    }
})
export const authAction=authSlice.actions;

export default authSlice;