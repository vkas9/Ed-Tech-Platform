import { Link } from "react-router-dom"


const Button=({children,className,link})=>{

    return (
        <Link to={link} className={`outline  text-xl px-4 py-1 rounded-md hover:cursor-pointer  transition-colors duration-300 ${className} `}>
            {children}
        </Link>
    )
}
export default Button;