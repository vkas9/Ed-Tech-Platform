import axios from "axios";
import authSlice, { authAction } from "../store/authSlice";
import { toast } from "react-hot-toast";
import { profileAction } from "../store/profileSlice";
import { encryptData } from "../components/core/auth/crypto";
import { cardAction } from "../store/cardSlice";
import { courseAction } from "../store/courseSlice";
import { decryptData } from "../components/core/auth/crypto";
import { fetchEnrollData } from "../Pages/Dashboard/EnrolledCourse/fetchEnrollData";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = (data, navigate) => {
  return async (dispatch) => {
    if (!navigator.onLine) {
      toast.error("No internet connection");
      throw new Error("No internet connection");
    }
    const toastId = toast.loading("Logging in...");
    dispatch(authAction.setLoading(true));
    let response;
    try {
      await axios
        .post(
          `${BASE_URL}/api/beta/auth/login`,
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
      const userd = decryptData(response.registredUser);

      toast.success(`Welcome to MASTER, ${userd.FirstName}`);
      dispatch(authAction.setToken(response.token));
      // dispatch(profileAction.setProfile(userd.avatar));

      dispatch(profileAction.setProfile(userd));

      localStorage.setItem(
        import.meta.env.VITE_TOKEN,
        JSON.stringify(response.token)
      );
      const text = encryptData(userd);
      localStorage.setItem(import.meta.env.VITE_USER, text);

      navigate("/dashboard/my-profile");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong or Server Offline");
      }
    } finally {
      dispatch(authAction.setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

export const signup = (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(authAction.setLoading(true));
    let response;
    try {
      await axios
        .post(`${BASE_URL}/api/beta/auth/signup`, {
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
    } finally {
      dispatch(authAction.setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
export const opt = (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(authAction.setLoading(true));
    let response;

    try {
      await axios
        .post(`${BASE_URL}/api/beta/auth/otp`, {
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
    } finally {
      dispatch(authAction.setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
export const forgotPasswordOtp = async (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  let response;
  try {
    await axios
      .post(`${BASE_URL}/api/beta/auth/forgotPasswordOTP`, {
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
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading...");

  let response;
  try {
    await axios
      .post(`${BASE_URL}/api/beta/auth/verifyForgotPasswordOTP`, {
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
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/beta/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.clear();

        dispatch(authAction.setToken(null));
        dispatch(profileAction.setProfile(null));
        dispatch(cardAction.reset());
        dispatch(courseAction.resetCourseState());

        navigate("/");

        // Show success toast
        toast.success(response.data.message);
      } else {
        toast.error("Failed to logout. Please try again.");
      }
    } catch (error) {
      toast.error(
        `Logout failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const changePasswordAuth = (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  return async (dispatch) => {
    const toastId = toast.loading("Changing...");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/beta/auth/changepassword`,
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
    } finally {
      toast.dismiss(toastId);
    }
  };
};
export const resetPasswordOut = async (data, navigate) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Changing...");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/auth/resetPassword`,
      {
        email: data.email,
        password: data.data.password,
        ConfirmPassword: data.data.confirmPassword,
      }
    );
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
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  let response;

  try {
    const res = await axios.get(
      `${BASE_URL}/api/beta/profile/getEnrolledCourses`,
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
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");

  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/createCourse`,
      formData,
      {
        withCredentials: true,
      }
    );

    toast.success("Course Details Added Successfully");
    const decryptCourse = decryptData(response.data.data);
    // console.log("Course creation response:", response.data);
    return decryptCourse;
  } catch (error) {
    console.error("Error creating course:", error);
    toast.error("Something went wrong while creating course");
  } finally {
    toast.dismiss(toastId);
  }
};
export const createSection = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/createSection`,
      {
        sectionName: data.sectionName,
        courseId: data.courseId,
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Section Details Added Successfully");
    const decryptCreateSection = decryptData(response.data.uCourse);
    // console.log("Section creation response:", response.data);
    return decryptCreateSection;
  } catch (error) {
    console.error("Error creating Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteSection = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Deleting");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/deleteSection`,
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

export const updateWishlistDetails = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Adding");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/updateWishlistDetails`,
      {
        courseId: data.toString(),
      },
      {
        withCredentials: true,
      }
    );
    localStorage.setItem(import.meta.env.VITE_USER, response.data.uu);
    const decuu = decryptData(response.data.uu);

    toast.success("Course Added to Wishlist");
    // console.log("Course Added to Wishlist", response.data);
    return decuu;
  } catch (error) {
    console.error("Error Course Added to Wishlist", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const deleteWishlistDetails = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Deleting");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/deleteWishlistDetails`,
      {
        courseId: data.toString(),
      },
      {
        withCredentials: true,
      }
    );
    localStorage.setItem(import.meta.env.VITE_USER, response.data.uUser);
    const decu = decryptData(response.data.uUser);
    toast.success("Course Deleted from Wishlist");

    return decu;
  } catch (error) {
    console.error("Error Course Deleting from Wishlist", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const getWishlistDetails = async (signal) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Fetching...");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/beta/course/getWishlistDetails`,
      {
        withCredentials: true,
        signal: signal,
      }
    );
    const decryptUpdatedWishlist = decryptData(response.data.uWishlist);
    const updatedWishlist = decryptUpdatedWishlist.Wishlist;
    return updatedWishlist.reverse();
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteSubSection = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Deleting");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/deleteSubSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Sub Section Deleted Successfully");
    // console.log("Sub Section Delete response:", response.data);
    const decryptCreateSubSection = decryptData(response.data.updatedCourse);
    return decryptCreateSubSection;
  } catch (error) {
    console.error("Error Deleting Sub Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const createSubSection = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Uploading...");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/createSubSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Sub Section Created Successfully");
    // console.log("Sub Section Create response:", response.data);
    const decryptCreateSubSection = decryptData(response.data.updatedCourse);
    return decryptCreateSubSection;
  } catch (error) {
    console.error("Error Creating Sub Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const updateSubSection = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Uploading...");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/updateSubSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success("Sub Section updated Successfully");
    // console.log("Sub Section updated response:", response.data);
    const decryptCreateSubSection = decryptData(response.data.updatedCourse);
    return decryptCreateSubSection;
  } catch (error) {
    console.error("Error updating Sub Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateSection = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/updateSection`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(" Section updated Successfully");
    const decryptUpdateSection = decryptData(response.data.upCourse);
    // console.log(" Section updated response:", response.data);
    return decryptUpdateSection;
  } catch (error) {
    console.error("Error  updating Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const editCourseDetails = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/editCourseDetails`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(" Course updated Successfully");
    const decryptupdatedCourse = decryptData(response.data.course);
    return decryptupdatedCourse;
  } catch (error) {
    console.error("Error  updating Course", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const updateCourse = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    // console.log("Data", data);
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/updateCourse`,
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(" Course updated Successfully");
    // console.log(" Course updated response:", response.data);
    // const deccryptupdatedCourse=decryptData(response.data);
    return response.data;
  } catch (error) {
    console.error("Error  updating Section", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};
export const getAllInstructorCourses = async (signal) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/beta/profile/getAllInstructorCourses`,
      {
        withCredentials: true,
        signal: signal,
      }
    );
    localStorage.setItem(
      import.meta.env.VITE_INSTRUCT_ALL_C,
      response.data.iCourses
    );
    const decryptAllInstructorCourses = decryptData(response.data.iCourses);
    toast.success("All Courses Fetched Successfully");

    return decryptAllInstructorCourses;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      toast.error("Error fetching course details");
      console.error("Error fetching course details", error);
    }
  } finally {
    toast.dismiss(toastId);
  }
};

export const getAllCourse = async (signal) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/beta/course/getAllCourse`,
      {
        withCredentials: true,
        signal: signal,
      }
    );

    // console.log("res", response.data.allCourse);
    const coursed = decryptData(response.data.allCourse);
    return coursed;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      toast.error("Error fetching course details", error);
    }
  } finally {
    toast.dismiss(toastId);
  }
};
export const updateProfile = async (dispatch, data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Saving");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/profile/updateProfile`,
      data,
      {
        withCredentials: true,
      }
    );
    const decryptUser = decryptData(response.data.registredUser);

    dispatch(profileAction.setProfile(decryptUser));

    localStorage.setItem(import.meta.env.VITE_USER, decryptUser);
    toast.success("Saved");
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateDisplayProfile = async (dispatch, data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Changing");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/profile/updateDisplayProfile`,
      data,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem(
      import.meta.env.VITE_USER,
      response.data.updatedProfile
    );
    const decryptUpdateDisplayProfile = decryptData(
      response.data.updatedProfile
    );
    dispatch(profileAction.setProfile(decryptUpdateDisplayProfile));

    toast.success("Changed");
  } catch (error) {
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const deleteEnrolledCourse = async (data, signal) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Loading");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/course/deleteEnrolledCourse`,
      data,
      {
        withCredentials: true,
        signal: signal,
      }
    );
    const userDetail = await axios.get(
      `${BASE_URL}/api/beta/auth/getUserDetail`,
      {
        withCredentials: true,
        signal: signal,
      }
    );
    const decu = decryptData(userDetail.data.rs);
    const decCourseDetail = decryptData(response.data.courseDetail);
    return {
      courseDetail: decCourseDetail,
      userDetail: decu,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled", error.message);
    } else {
      toast.error("Error Deleting course details", error);
    }
  } finally {
    toast.dismiss(toastId);
  }
};

export const PaymentComponent = async (data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/payment/createOrder`,
      data,
      {
        withCredentials: true,
      }
    );

    const res = response.data;
    if (res.success) {
      return new Promise((resolve, reject) => {
        const options = {
          key: res.key_id,
          amount: res.amount,
          currency: "INR",
          name: res.courseName,
          description: res.courseDescription,
          image: res.thumbnail,
          order_id: res.order_id,
          handler: function (response) {
            toast.success("Payment Succeeded");
            resolve(response); // Resolve the promise with the response on success
          },
          prefill: {
            contact: res.contact,
            name: res.name,
            email: res.email,
          },
          notes: {
            description: res.description,
          },
          theme: {
            color: "#000431",
          },
        };

        const razorpayObject = new Razorpay(options);
        razorpayObject.on("payment.failed", function (response) {
          toast.error("Payment Failed");
          reject(response); // Reject the promise with the response on failure
        });
        razorpayObject.open();
      });
    } else {
      toast.error(res.message);
      throw new Error(res.message);
    }
  } catch (error) {
    console.error("Error creating order:", error);
    toast.error(
      error.response?.data?.message || "An error occurred during payment"
    );
    throw error; // Ensure the error is thrown to be handled by the caller
  }
};

export const enrollCourse = async (
  dispatch,
  data,
  enrollData = null,
  navigate
) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Enrolling");
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/payment/enrollCourse`,
      data,
      {
        withCredentials: true,
      }
    );
    const userd = decryptData(response.data.ey);
    const updatedWishlist = userd.Wishlist;

    const cartText = encryptData(updatedWishlist.reverse());

    dispatch(profileAction.setProfile(userd));
    const text = encryptData(userd);
    localStorage.setItem(import.meta.env.VITE_USER, text);
    localStorage.setItem(import.meta.env.VITE_CART_D, cartText);
    const controller = new AbortController();
    const signal = controller.signal;
    await fetchEnrollData(enrollData, dispatch, signal, true);
    navigate(`/dashboard/enrolled-courses`);
    toast.success("Enrolled");
  } catch (error) {
    toast.error(response.error);
  } finally {
    toast.dismiss(toastId);
  }
};
export const deleteInstructorCourse = async (dispatch, data) => {
  if (!navigator.onLine) {
    toast.error("No internet connection");
    throw new Error("No internet connection");
  }
  const toastId = toast.loading("Deleting...");
  let response;
  try {
    response = await axios.post(
      `${BASE_URL}/api/beta/course/deleteInstructorCourse`,
      data,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem(
      import.meta.env.VITE_INSTRUCT_ALL_C,
      response.data.imc
    );
    localStorage.setItem(import.meta.env.VITE_USER, response.data.uur);
    const userd = decryptData(response.data.uur);
    const userinc = decryptData(response.data.imc);
    dispatch(profileAction.setProfile(userd));
    dispatch(courseAction.setIC(userinc));
    toast.success(response.data.message);
  } catch (error) {
    console.log("error->", error);
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const updatePurchaseHistory = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/beta/profile/updatePurchaseHistory`,
      data,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const getPurchaseHistory = async (dispatch) => {
  const toastId = toast.loading("loading...");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/beta/profile/getPurchaseHistory`,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem(
      import.meta.env.VITE_PURCHASE_HISTORY,
      response.data.purhc
    );
    const text = decryptData(response.data.purhc);
    dispatch(courseAction.setPurchaseHistory(text));
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};
