
import { FaHandPointRight } from "react-icons/fa";
import Button from "../../components/Homepage/Button";
import techimage from "../../assets/tech.png";

const SkillSection = () => {
    return (
        <div className="relative container mt-[4rem]  mx-auto px-[1rem] flex flex-col gap-7  lg:px-[4rem] md:flex-row">
            <div className=" z-10 text-center mx-auto sm:text-start max-w-[30em]  ">
                <h1 className=" text-3xl lg:text-5xl text-center font-bold mb-4 md:mb-10 ">AI Chat App for seamless collaboration</h1>
                <ul className=" text-xl lg:text-2xl  mx-auto text-center sm:text-start mb-11 md:mb-[5rem] max-w-[20rem]">
                    <li className="mb-3 ">
                        <div className="flex justify-center sm:justify-start items-center mb-2 gap-5">
                            <FaHandPointRight className="text-purple-500"/>
                            <h6>Seamless Integration</h6>
                        </div>
                        <p className="text-sm text-gray-300">With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.</p>
                    </li>
                    <li className="mb-3 ">
                        <div className="flex justify-center sm:justify-start items-center mb-2 gap-5">
                            <FaHandPointRight className="text-purple-500"/>
                            <h6>Smart Automation</h6>
                        </div>
                    </li>
                    <li className="mb-3 ">
                        <div className="flex justify-center sm:justify-start items-center mb-2 gap-5">
                            <FaHandPointRight className="text-purple-500"/>
                            <h6>Top-notch Security</h6>
                        </div>
                    </li>
                    
                </ul>
                <Button className={"outline-none bg-yellow-500 py-3 px-5 text-black font-semibold"} > Learn more</Button>
            </div>
            
            <div className=" hidden md:flex rounded-md">
                <img src={techimage} className="rounded-md opacity-80 overflow-hidden absolute lg:static top-0 left-0 z-1   " alt="" />
            </div>
        </div>
    );
}
export default SkillSection
