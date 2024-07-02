import { FaStar,FaStarHalfAlt } from "react-icons/fa";

import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";

const StarRating = ({setCount, starCount, setStarCount,flag }) => {

  
  const[hoverCount,setHoverCount]=useState(0);
  
  return (
    <div className="flex items-center bg-white/10 py-1 px-2 rounded-full">
     {
      [...Array(5)].map((_,index)=>{
        return <span onMouseEnter={()=>!flag&&setHoverCount(index+1)} onMouseLeave={()=>setHoverCount(0)} onClick={() => {
    if (!flag) {
        // setFlag(true);
        setStarCount(index + 1);
        setCount(index+1)
    }
}} key={index} className={` ${hoverCount>index?"text-yellow-500":""} ${index<starCount?"text-yellow-500":"" } 
${!flag&&"hover:cursor-pointer"}  transition-all duration-150 ease-in-out `}>
          <FaStar className=""/>
        </span>
      })
     }
    </div>
  );
};
export default StarRating;
