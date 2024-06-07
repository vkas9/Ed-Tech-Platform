import axios from "axios";
import authSlice, { authAction } from "../store/authSlice";
import { toast } from "react-hot-toast";
import { profileAction } from "../store/profileSlice";
import { encryptData } from "../components/core/auth/crypto";
import { cardAction } from "../store/cardSlice";
import { courseAction } from "../store/courseSlice";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = (data, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(authAction.setLoading(true));
    let response;
    try {
      await axios
        .post(
          `${BASE_URL}/api/v1/auth/login`,
          {
            email: data.email,
            password: data.password,
          },
          {
            withCredentials: true, // Include cookies in the request
          }
        )
        .then((res) => {
          response = res.data;
        });

      toast.success(`Welcome to MASTER, ${response.registredUser.FirstName}`);
      dispatch(authAction.setToken(response.token));
      dispatch(profileAction.setProfile(response.registredUser.avatar));

      dispatch(profileAction.setProfile(response.registredUser));

      localStorage.setItem(
        import.meta.env.VITE_TOKEN,
        JSON.stringify(response.token)
      );
      const text = encryptData(response.registredUser);
      localStorage.setItem(import.meta.env.VITE_USER, text);

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("Login api error", error.response.data.message);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong or Server Offline");
      }
    }finally{
      dispatch(authAction.setLoading(false));
      toast.dismiss(toastId);
    }
    
  };
};

export const signup = (data, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(authAction.setLoading(true));
    let response;
    try {
      await axios
        .post(`${BASE_URL}/api/v1/auth/signup`, {
          FirstName: data.FirstName,
          LastName: data.LastName,
          Email: data.Email,
          Contact_Number: data.Contact_Number,
          Password: data.Password,
          ConfirmPassword: data.ConfirmPassword,
          role: data.role,
          otp: String(data.otp),
        })
        .then((res) => {
          response = res;
        });

      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
    dispatch(authAction.setLoading(false));
    toast.dismiss(toastId);}
  };
};
export const opt = (data, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(authAction.setLoading(true));
    let response;

    try {
      await axios
        .post(`${BASE_URL}/api/v1/auth/otp`, {
          email: data.Email,
        })
        .then((res) => {
          response = res;
        });
   

      dispatch(authAction.setSignUpData(data));
      toast.success(response.data.message);
      navigate("/signup/verify-email");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
    finally{
    dispatch(authAction.setLoading(false));
    toast.dismiss(toastId);}
  };
};
export const forgotPasswordOtp = async (data, navigate) => {
  const toastId = toast.loading("Loading");
  let response;
  try {
    await axios
      .post(`${BASE_URL}/api/v1/auth/forgotPasswordOTP`, {
        email: data.email,
      })
      .then((res) => {
        response = res;
      });
    // console.log("data", data.Email);

    toast.success(response.data.message);
    navigate("/reset-password/verify");
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    toast.dismiss(toastId);
  }
};

export const verifyForgotOTP = async (data, navigate) => {
  const toastId = toast.loading("Loading...");

  let response;
  try {
    await axios
      .post(`${BASE_URL}/api/v1/auth/verifyForgotPasswordOTP`, {
        email: data.email,
        otp: String(data.data.otp),
      })
      .then((res) => {
        response = res;
      });
    // console.log("response", response);

    navigate("/reset-password/change-password");
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const logout = (navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    var response;
    try {
      response = await axios.post(
        `${BASE_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      
      dispatch(authAction.setToken(null));
      dispatch(profileAction.setProfile(null));
      localStorage.clear();

      dispatch(cardAction.reset());
      dispatch(courseAction.resetCourseState());
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(response.data.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const changePasswordAuth = (data, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Changing...");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/changepassword`,
        {
          oldpassword: data.oldPassword,
          password: data.password,
          ConfirmPassword: data.confirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("Request headers:", response.config.headers);
      // console.log("Response headers:", response.headers);
      toast.success("Successfully Password Changed");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }finally{
    toast.dismiss(toastId);}
  };
};
export const resetPasswordOut = async (data, navigate) => {
  const toastId = toast.loading("Changing...");
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/resetPassword`, {
      email: data.email,
      password: data.data.password,
      ConfirmPassword: data.data.confirmPassword,
    });
    toast.success(response.data.message);
    navigate("/login");
  } catch (error) {
    if (error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    toast.dismiss(toastId);
  }
};
export const getCourseDetail = async (courseId, signal) => {
  const toastId = toast.loading("Loading");
  let response;

  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/profile/getEnrolledCourses`,
      {
        withCredentials: true,
        signal: signal,
      }
    );
    response = res;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      console.error("Error fetching course details", error);
    }
  } finally {
    toast.dismiss(toastId);
  }

  return response;
};

export const addCourseDetails = async (formData) => {
  const toastId = toast.loading("Loading");

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/createCourse`,
      formData,
      {
        withCredentials: true,
      }
    );

    toast.success("Course Details Added Successfully");
    // console.log("Course creation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    toast.error("Something went wrong while creating course");
  } finally {
    toast.dismiss(toastId);
  }
};
export const createSection = async (data) => {
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/createSection`,
      {
        sectionName: data.sectionName,
        courseId: data.courseId,
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Section Details Added Successfully");
    // console.log("Section creation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteSection = async (data) => {
  const toastId = toast.loading("Deleting");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/deleteSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Section Deleted Successfully");
    // console.log("Section Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Deleting Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateCartDetails = async (data) => {
  const toastId = toast.loading("Adding");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/updateCartDetails`,
      {
        courseId: data.toString(),
      },
      {
        withCredentials: true,
      }
    );

    const text = encryptData(response.data.updatedUser);
    localStorage.setItem(import.meta.env.VITE_USER, text);

    toast.success("Course Added to Cart");
    // console.log("Course Added to Cart", response.data);
    return response.data.updatedUser;
  } catch (error) {
    console.error("Error Course Added to Cart", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const deleteCartDetails = async (data) => {
  const toastId = toast.loading("Deleting");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/deleteCartDetails`,
      {
        courseId: data.toString(),
      },
      {
        withCredentials: true,
      }
    );

    const text = encryptData(response.data.updatedUser);
    localStorage.setItem(import.meta.env.VITE_USER, text);

    toast.success("Course Deleted from Wishlist");

    return response.data.updatedUser;
  } catch (error) {
    console.error("Error Course Deleting from Cart", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const getCartDetails = async (signal) => {
  const toastId = toast.loading("Fetching...");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/course/getCartDetails`,
      {
        withCredentials: true,
        signal: signal,
      }
    );

    return response.data.updatedCart.Cart;
  } catch (error) {
    console.error("Error fetching cart", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteSubSection = async (data) => {
  const toastId = toast.loading("Deleting");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/deleteSubSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Sub Section Deleted Successfully");
    // console.log("Sub Section Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Deleting Sub Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const createSubSection = async (data) => {
  const toastId = toast.loading("Uploading...");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/createSubSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Sub Section Created Successfully");
    // console.log("Sub Section Create response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Creating Sub Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const updateSubSection = async (data) => {
  const toastId = toast.loading("Uploading...");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/updateSubSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Sub Section updated Successfully");
    // console.log("Sub Section updated response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating Sub Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateSection = async (data) => {
  const toastId = toast.loading("Loading");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/updateSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(" Section updated Successfully");
    // console.log(" Section updated response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error  updating Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const updateCourse = async (data) => {
  const toastId = toast.loading("Loading");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/v1/course/updateCourse`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(" Course updated Successfully");
    // console.log(" Course updated response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error  updating Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const getAllInstructorCourses = async (signal) => {
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/profile/getAllInstructorCourses`,
      {
        withCredentials: true,
        signal: signal,
      }
    );
    toast.success("All Course Fetch Successfully");
    return response.data;
  } catch (error) {
    console.error("Error  Fetching Instructor Courses", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const getAllCourse = async (signal) => {
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/course/getAllCourse`, {
      withCredentials: true,
      signal: signal,
    });

    // console.log("res", response.data.allCourse);
    return response.data.allCourse;
  } catch (error) {
    console.error("Error Fetching All Courses", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
