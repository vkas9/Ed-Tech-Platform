const CourseCard=({course})=>{
    return (
        <div className="flex text-xl justify-between flex-col sm:flex-row mr-5 items-center rounded-xl mt-4 bg-gray-300/10 max-w-[60rem] p-3  ">
            <div className= "gap-3 p-2 items-center flex">
              <img src={course.Thumbnail} alt="course-thumbnail" className="w-[150px] max-w-[150px] rounded-lg " />
             
              <div>
                <h2>{course.CourseName}</h2>
                <p className="text-white/40 text-sm ">{course.CourseDescription}</p>
              </div>
            </div>
            <div>
              <span>Duration: {course?.duration}</span>
            </div>
            <div>
              <p>Progress: 0%</p>
            </div>

           
          </div>
    );
}
export default CourseCard;