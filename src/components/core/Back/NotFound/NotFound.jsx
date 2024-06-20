import { Link } from "react-router-dom";

const NotFound=()=>{
    
  
    return (
        <>
        <div className="relative  text-sm   xs:text-lg  min-h-screen  text-green-400 font-mono text-center">
      <div className="absolute inset-0  bg-cover opacity-20 z-0"></div>
      <div className="absolute inset-0  bg-repeat bg-opacity-30 z-10"></div>
      <div className="terminal absolute px-4 inset-0 flex items-center justify-center z-20">
        <div className="max-w-screen-lg   text-left">
          <h1 className="text-6xl mb-4">Error <span className="errorcode text-white">404</span></h1>
          <p className=" mb-2">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
          <p className=" mb-2">Please try to <Link to="/" className="text-white">return to the homepage</Link>.</p>
          <p className="">Good luck.</p>
        </div>
      </div>
    </div>
        </>
    )
}
export default NotFound;