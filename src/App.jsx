import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Navbar from "./components/Homepage/Navbar";
import Footer from "./Pages/Home/Footer";
import github from "../src/assets/github.png"

function App() {
  return (
    <div  className="bg-gradient-to-br from-[#000435] via-gray-950/100 to-black ">
    
      <div className="fixed bottom-5 md:hover:scale-110 transition-transform duration-200 right-5 z-[2000] bg-black rounded-full "><a href="https://github.com/vkas9/Ed-Tech-Platform" target="_blank"><img src={github} alt="" width={40} /></a></div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
