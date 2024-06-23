import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseAction } from "../../../store/courseSlice";
import PurchaseCard from "./PurchaseCard";
import { decryptData, encryptData } from "../../../components/core/auth/crypto";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getPurchaseHistory } from "../../../APIs/mainAPI";
const PurchaseHistory = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const { allPurchaseHistory } = useSelector((store) => store.course);
  const { user } = useSelector((store) => store.profile);
  const [course, setCourses] = useState(allPurchaseHistory);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const controller = new AbortController();
      const signal = controller.signal;
      const fetchData = async () => {
        try {
          await getPurchaseHistory(dispatch);
        } catch (error) {
          if (!controller.signal.aborted) {
            toast.error("Unable to fetch all courses");
          }
        }
      };

      if (!course) {
        fetchData();
      }
      return () => {
        controller.abort();
      };
    }
  }, [course, dispatch]);

  useEffect(() => {
    setCourses(allPurchaseHistory);
  }, [allPurchaseHistory]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg  pt-2 pl-5 "
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto  scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full items-center ">
      <Link to={"/"} className="underline active:text-white  sm:hover:text-white ">Home</Link>
        <span>/</span>
        <Link to={"/dashboard/my-profile"} className="underline active:text-white  sm:hover:text-white " >Dashboard</Link>
        <span>/</span>
        <span className="text-yellow-500 ">Purchase History</span>
      </div>
      <h1 className="text-3xl mb-3">
        Purchase History <span>({course?.purchaseHistory?.length})</span>
      </h1>
      <div className="flex mr-5 rounded-lg overflow-x-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full items-center justify-start "></div>

      <div className="overflow-y-auto scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-bg scrollbar-thumb-rounded-full scrollbar-track-rounded-full   mt-2 rounded-md pb-[12rem] max-h-[calc(100vh-11.5rem)]">
        {!course ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : course?.purchaseHistory?.length ? (
          course.purchaseHistory
            .slice()
            .reverse()
            .map((courseItem, index) => (
              <PurchaseCard course={courseItem} key={index} />
            ))
        ) : (
          <p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[35%] text-2xl font-semibold sm:w-fit text-white/40">
            Purchase History is empty!
          </p>
        )}
      </div>
    </motion.div>
  );
};
export default PurchaseHistory;
