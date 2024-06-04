import { motion } from "framer-motion";
import { useSelector } from "react-redux";
// import CourseCard from "./PurchaseHistoryList/CourseCard";
const PurchaseHistory = () => {
  const PurchaseHistoryList=[];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold  flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto items-center ">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500 ">PurchaseHistory</span>
      </div>

      <div className="overflow-auto h-[75vh]">
        {!PurchaseHistoryList ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : PurchaseHistoryList.length ? (
          PurchaseHistoryList.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))
        ) : (
          <p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[2%] md:left-[20%] lg:left-[35%] text-2xl font-semibold sm:w-fit text-white/40">
           Purchase History is empty!
          </p>
        )}
      </div>
    </motion.div>
  );
};
export default PurchaseHistory;
