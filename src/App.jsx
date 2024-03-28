import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Homepage/Navbar";
import Footer from "./Pages/Home/Footer";

function App() {
  return (
    <div  className="bg-gradient-to-br from-blue-950 via-gray-950/100 to-black ">

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
