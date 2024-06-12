import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Homepage/Navbar";
import Footer from "./components/Homepage/Footer";
import github from "../src/assets/github.png";
import { Toaster } from "react-hot-toast";
import LoginForm from "./components/core/auth/LoginForm";
import OpenRoute from "./components/core/auth/OpenRoute";
import SignupForm from "./components/core/auth/SignpForm";
import VerifyEmail from "./Pages/Form/VerifyEmail";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProfileDashboard from "./Pages/Dashboard/ProfileDashboard";
import EnrolledCourse from "./Pages/Dashboard/EnrolledCourse/EnrolledCourse";
import Wishlist from "./Pages/Dashboard/Wishlist/Wishlist";
import PurchaseHistory from "./Pages/Dashboard/PurchaseHistory";
import Courses from "./Pages/Dashboard/ExploreCourses/Courses";
import Settings from "./Pages/Dashboard/Settings";
import Indexcourse from "./Pages/Dashboard/AddCourse/Indexcourse";
import AllCourse from "./Pages/Dashboard/InstructorCourse/AllCourse";
import ViewCourse from "./Pages/Dashboard/EnrolledCourse/ViewCourse";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./Pages/ForgotPassword/ResetPasswordOut";
import ViewExploreCourse from "./Pages/Dashboard/ExploreCourses/ViewExploreCourse";
import ViewWishlistCourse from "./Pages/Dashboard/Wishlist/ViewWishlistCourse";
import AboutUs from "./Pages/NavbarPages/AboutUs";
import ContactUs from "./Pages/NavbarPages/ContactUs";
import ViewInstructorCourse from "./Pages/Dashboard/InstructorCourse/ViewInstructorCourse";
import OpenInstructor from "./components/core/auth/OpenInstructor";


function App() {
  return (
    <>
      <div className="h-[15px] fixed z-[100] top-0 w-screen bg-gradient-to-br from-yellow-500 to-yellow-800 flex items-center text-black justify-center font-semibold ">
        Under Development!
      </div>
      <div className="bg-gradient-to-br from-[#000435] via-gray-950/100 to-black   ">
        <div className="fixed bottom-5 md:hover:scale-110 transition-transform duration-200 right-5 z-[2000] bg-black rounded-full ">
          <a href="https://github.com/vkas9/Ed-Tech-Platform" target="_blank">
            <img src={github} alt="" width={40} />
          </a>
        </div>
        <Toaster position="top-center" />
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <OpenInstructor>
                  <Home/>
                </OpenInstructor>
              }
            />

            <Route
              path="login"
              element={
                <OpenRoute>
                  <LoginForm />
                </OpenRoute>
              }
            />
            <Route
              path="signup/:id/:roll"
              element={
                <OpenRoute>
                  <SignupForm />
                </OpenRoute>
              }
            />
            <Route
              path="reset-password/verify"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
            <Route
              path="reset-password/change-password"
              element={
                <OpenRoute>
                  <ChangePassword />
                </OpenRoute>
              }
            />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route
              path="signup/verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
            <Route
              path="reset-password"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="my-profile" element={<ProfileDashboard />} />
              <Route path="enrolled-courses" element={<EnrolledCourse />} />
              <Route
                path="enrolled-courses/:ud/:courseId"
                element={<ViewCourse />}
              />
              <Route
                path="all-courses/:ud/:courseId"
                element={<ViewInstructorCourse />}
              />
              <Route
                path="courses/:ud/:courseId"
                element={<ViewExploreCourse />}
              />
              <Route
                path="wishlist/:ud/:courseId"
                element={<ViewWishlistCourse />}
              />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="purchase-history" element={<PurchaseHistory />} />
              <Route path="Courses" element={<Courses />} />
              <Route path="Settings" element={<Settings />} />
              <Route path="create-course" element={<Indexcourse />} />
              <Route path="all-courses" element={<AllCourse />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
    </>
  );
}

export default App;
