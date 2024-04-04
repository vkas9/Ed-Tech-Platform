import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="  overflow-hidden font-semibold text-gray-200 px-4 py-2 bg-gradient-to-b from-blue-950/20 to-transparent flex flex-col md:flex-row text-[.6rem] md:text-xl  items-center md:justify-between ">
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
};
export default Footer;
