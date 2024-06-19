import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  getAllCourse,
  getCartDetails,
  getCourseDetail,
} from "../../../APIs/mainAPI";
import WishlistCard from "./WishlistCard";
import { cardAction } from "../../../store/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { encryptData } from "./../../../components/core/auth/crypto";
import { courseAction } from "../../../store/courseSlice";
import toast from "react-hot-toast";
const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.profile);
  const { wishlist } = useSelector((store) => store.card);
  const { user: data } = useSelector((store) => store.profile);
  const [Wishlist, setWishlist] = useState(wishlist);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        if (data && data.Cart && data.Cart.length > 0) {
          const cartData = await getCartDetails(signal);
          const courseData = await getAllCourse(signal);
          const cartText = encryptData(cartData);
          const courseText = encryptData(courseData);
          localStorage.setItem(import.meta.env.VITE_CART_D, cartText);
          localStorage.setItem(import.meta.env.VITE_ALL_C, courseText);
          dispatch(cardAction.setWishlist(cartData));
          dispatch(courseAction.setExploreAllCourses(courseData));
        } else {
          localStorage.setItem(import.meta.env.VITE_CART_D, JSON.stringify([]));
          dispatch(cardAction.setWishlist([]));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          toast.error("Unable to fetch wishlist courses");
        }
      }
    };

    if (wishlist === null || wishlist?.length !== user?.Cart?.length) {
      fetchData();
    }
    return () => {
      controller.abort();
    };
  }, [user?.Cart?.length, user]);

  // useEffect(() => {
  //   setWishlist(wishlist);
  // }, [wishlist]);

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

      <h1 className="text-3xl mb-3 w-full whitespace-nowrap ">
        My Wishlist <span>({wishlist?.length}</span>)
      </h1>
      <div className="overflow-auto  pb-[12rem]  h-[75vh] ">
        {!wishlist ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : wishlist.length ? (
          wishlist.map((course, index) => (
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
