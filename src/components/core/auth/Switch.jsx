import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const Switch=({roll})=>{
    
    return  (
        <div className="flex items-center justify-center gap-2">
            <Link to={`/signup/${uuidv4()}/student`} className={`${roll==="Student"?"bg-blue-600 text-white ":"bg-white/10 text-white"}  font-bold p-2 w-[120px] text-center text-xl  rounded-l-full `}>Student</Link>
            <Link  to={`/signup/${uuidv4()}/instructor`} className={`${roll==="Instructor"?"bg-blue-600 text-white ":"bg-white/10 text-white"} font-bold p-2  w-[120px] text-center text-xl rounded-r-full `}>Instructor</Link>
        </div>
    );
}
export default Switch;