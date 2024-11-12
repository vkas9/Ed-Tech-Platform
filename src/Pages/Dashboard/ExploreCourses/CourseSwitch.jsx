import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const CourseSwitch=({roll , search , setSearch})=>{
    
    return  (
        <div className="flex justify-between w-full">

        <div className="flex items-center justify-center gap-2">
            <Link to={`/dashboard/courses/all`} className={`${roll==="all"?"bg-blue-600 text-white":"bg-white/10 text-white"}  font-bold p-2 w-fit text-center text-sm sm:text-xl whitespace-nowrap  rounded-lg `}>All</Link>
            <Link to={`/dashboard/courses/cloud-computing`} className={`${roll==="cloud-computing"?"bg-blue-600 text-white":"bg-white/10 text-white"}  font-bold p-2 w-fit text-center text-sm sm:text-xl whitespace-nowrap  rounded-lg `}>Cloud Computing</Link>
            <Link  to={`/dashboard/courses/web-development`} className={`${roll==="web-development"?"bg-blue-600 text-white":"bg-white/10 text-white"} font-bold p-2  w-fit text-center text-sm sm:text-xl whitespace-nowrap rounded-lg `}>Web Development</Link>
        </div>
            <input value={search} placeholder={'Search Course'} onChange={(e)=>{setSearch(e.target.value)}}  className={"bg-white/10 font-bold p-2  w-fit text-center text-sm sm:text-xl whitespace-nowrap rounded-lg "} />
        </div>
    );
}
export default CourseSwitch;