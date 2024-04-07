import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="  relative bottom-0 overflow-hidden font-semibold  px-4 py-2 bg-gradient-to-b from-blue-950/20 to-transparent flex flex-col text-gray-400 md:flex-row text-[.6rem] md:text-lg  items-center md:justify-between ">
      <div>
        <h3>© 2024 All rights reserved</h3>
      </div>
      <div className=" flex gap-3">
        <Link className="  md:border-r md:px-4 border-white ">Privacy Policy</Link>
        <Link className="md:border-r md:px-4 border-white ">Terms & Conditions</Link>
        <Link>Terms of Use</Link>
      </div>
    </div>
  );
};
export default Footer;
