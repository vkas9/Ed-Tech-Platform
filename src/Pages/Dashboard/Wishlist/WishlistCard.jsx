import { FiMoreVertical } from "react-icons/fi";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const WishlistCard=({course})=>{
    return (
        <div className="flex text-[1.1rem] justify-between flex-col sm:flex-row mr-5 items-center rounded-xl mt-4 bg-gray-300/10 max-w-[60rem] p-1  ">
            <div className= "gap-3 p-2 items-center flex">
              <img src={course?.Thumbnail} alt="course-thumbnail" className="w-[100px] h-[90px] max-w-[110px] object-cover  rounded-lg " />
             
              <div>
                <h2>{course.CourseName}</h2>
                <p className="text-white/40 text-[.9rem] ">{course.CourseDescription}</p>
                <div className="flex gap-2 items-center">
                    <span>4.8</span>
                    <ReactStars count={5} size={25} edit={false} activeColor="#ffd700" emptyIcon={<FaRegStar/>} fullIcon={<FaStar/>}  />

                </div>
              </div>
            </div>
            <div>
              <span>Duration: {course?.duration?"":"2Hrs"}</span>
            </div>
            <div className="flex items-center gap-7 mr-3 ">
              <p>Price: ₹ 699</p>
              <RxCross2 className="text-[1.5rem] hover:bg-red-500/20 box-content p-3 transition-all hover:cursor-pointer duration-150 rounded-full  " />

            </div>

           
          </div>
    );
}
export default WishlistCard;