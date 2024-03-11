

const Button=({children,className})=>{

    return (
        <div className={`outline outline-gray-800 text-xl px-4 py-1 rounded-md hover:cursor-pointer hover:bg-gray-800/40  transition-colors duration-300 ${className} `}>
            {children}
        </div>
    )
}
export default Button;