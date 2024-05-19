import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCourseDetail } from "../../../Auth/Authapi";
import WishlistCard from "./WishlistCard";
import { cardAction } from "../../../store/cardSlice";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((store) => store.card);
  const [Wishlist, setWishlist] = useState(wishlist);

  useEffect(() => {
    const controller=new AbortController();
    const signal=controller.signal;
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
        if (data && data.Courses && data.Courses.length > 0) {
          const courseData = await getCourseDetail(data.Courses,signal);
          localStorage.setItem("Wishlist", JSON.stringify(courseData.data.courseDetail));
          dispatch(cardAction.setWishlist(courseData.data.courseDetail));
        } else {
          localStorage.setItem("Wishlist", JSON.stringify([]));
          dispatch(cardAction.setWishlist([]));
        }
      } catch (error) {
        console.log("Unable to fetch wishlist courses");
      }
    };

    if (!Wishlist) {
      fetchData();
    }
    return ()=>{
      controller.abort();
    }
  }, [Wishlist, dispatch]);

  useEffect(() => {
    setWishlist(wishlist);
  }, [wishlist]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      className="flex font-semibold flex-col text-lg pt-2 pl-5"
    >
      <div className="flex gap-1 text-white/50 overflow-x-auto items-center">
        <span>Home</span>
        <span>/</span>
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-yellow-500">Wishlist</span>
      </div>

      <h1 className="text-3xl">My Wishlist</h1>
      <div className="overflow-auto h-[78vh]">
        {!Wishlist ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : Wishlist.length ? (
          Wishlist.map((course, index) => (
            <WishlistCard course={course} key={index} />
          ))
        ) : (
          <p className="relative text-center mr-3 top-1/3 sm:top-1/2 sm:left-[35%] text-2xl font-semibold sm:w-fit text-white/40">
            Your wishlist is empty!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
