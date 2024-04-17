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
import { useScroll ,motion} from "framer-motion";

function App() {

  const{scrollYProgress }= useScroll();
  return (
    <>
    <motion.div
       className="fixed top-0 left-0 right-0 bg-yellow-500 z-[20] h-[10px]  "
        style={{ scaleX: scrollYProgress }}
      />
    
    <div className="bg-gradient-to-br from-[#000435] via-gray-950/100 to-black h-screen  ">
      <div className="fixed bottom-5 md:hover:scale-110 transition-transform duration-200 right-5 z-[2000] bg-black rounded-full ">
        <a href="https://github.com/vkas9/Ed-Tech-Platform" target="_blank">
          <img src={github} alt="" width={40} />
        </a>
      </div>
      <Toaster position="top-center" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="login"
            element={
              <OpenRoute>
                <LoginForm />
              </OpenRoute>
            }
          />
          <Route
            path="signup"
            element={
              <OpenRoute>
                <SignupForm />
              </OpenRoute>
            }
          />
          <Route
            path="signup/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route path="dashboard/my-profile" element={<Dashboard />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
    </>
  );
}

export default App;
