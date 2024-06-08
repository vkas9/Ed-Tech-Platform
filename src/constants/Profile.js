
import { BsPerson } from "react-icons/bs";

import { LuBookMarked } from "react-icons/lu";

import { FiBookmark } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";


import { MdOutlineShoppingCart } from "react-icons/md";
import { PiGraduationCap } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
export const Profile = [
  {
    id: "0",
    title: "My Profile",
    url: "/dashboard/my-profile",
    icon:BsPerson
  },
  {
    id: "1",
    title: "Enrolled Courses",
    url: "/dashboard/enrolled-courses",
    role: "Student",
    icon:LuBookMarked
  },
  {
    id: "2",
    title: "Wishlist",
    url: "/dashboard/wishlist",
    role: "Student",
    icon:FiBookmark
  },
  {
    id: "3",
    title: "Purchase History",
    url: "/dashboard/purchase-history",
    role: "Student",
    icon:MdOutlineShoppingCart
  },
  {
    id: "4",
    title: "Explore Courses",
    url: "/dashboard/courses",
    role: "Student",
    icon:PiGraduationCap
  },
  {
    id:"5",
    title: "My Courses",
    url: "/dashboard/all-courses",
    role: "Instructor",
    icon: PiGraduationCap,
  },{
    id: "6",
    title: "Create Course",
    url: "/dashboard/create-course",
    role: "Instructor",
    icon: IoIosAddCircleOutline,
  }
];
