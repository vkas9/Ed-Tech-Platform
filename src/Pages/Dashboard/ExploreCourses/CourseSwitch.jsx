import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const CourseSwitch=({roll})=>{
    
    return  (
        <div className="flex items-center justify-center gap-2">
            <Link to={`/dashboard/courses/cloud-computing`} className={`${roll==="cloud-computing"?"bg-yellow-500 text-yellow-950 ":"bg-white/10 text-white"}  font-bold p-2 w-fit text-center text-sm sm:text-xl whitespace-nowrap  rounded-lg `}>Cloud Computing</Link>
            <Link  to={`/dashboard/courses/web-development`} className={`${roll==="web-development"?"bg-yellow-500 text-yellow-950 ":"bg-white/10 text-white"} font-bold p-2  w-fit text-center text-sm sm:text-xl whitespace-nowrap rounded-lg `}>Web Development</Link>
        </div>
    );
}
export default CourseSwitch;