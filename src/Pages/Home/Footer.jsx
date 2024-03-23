import { Link } from "react-router-dom";

const Footer=()=>{
    return (
        <div className=" hidden md:flex  font-semibold text-gray-200 px-4 py-4 bg-gradient-to-t from-blue-950 to-transparent mt-[10rem] flex items-center justify-between ">
            <div>
                <h3>© 2024 All rights reserved</h3>
            </div>
            <div className=" flex gap-3">
                <Link>Privacy Policy</Link>
                <Link>Terms & Conditions</Link>
                <Link>Terms of Use</Link>
            </div>

        </div>
    );
}
export default Footer;