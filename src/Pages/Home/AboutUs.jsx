import { Link } from "react-router-dom";

const AboutUs=()=>{
    return (
        <div className="py-[6rem] w-full container mx-auto ">
            <div className="py-4 gap-2 flex flex-col text-center h-full ">
                <span className="text-xl">Get Started Today</span>
                <h1 className="text-5xl">Learn. Grow. Succeed.</h1>
                <Link to={"/signup"} className="bg-yellow-500 mt-5 mx-auto p-3 rounded-md">Explore Courses</Link>
                
            </div>
            <div></div>

        </div>
    );
}

export default AboutUs;