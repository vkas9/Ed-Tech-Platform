const CourseCard=({course})=>{
    return (
        <div className="flex justify-between items-center rounded-xl mt-4 bg-gray-300/20 max-w-[60rem] p-3  ">
            <div className= "gap-3 p-3 flex">
              <img src={course.Thumbnail} alt="course-thumbnail" className="max-w-[100px] rounded-lg " />
             
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