
import { BsPerson } from "react-icons/bs";

import { LuBookMarked } from "react-icons/lu";

import { FiBookmark } from "react-icons/fi";


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
    icon:LuBookMarked
  },
  {
    id: "2",
    title: "Wishlist",
    url: "/dashboard/wishlist",
    icon:FiBookmark
  },
  {
    id: "3",
    title: "Purchase History",
    url: "/dashboard/purchase-history",
    icon:MdOutlineShoppingCart
  },
  {
    id: "4",
    title: "Courses",
    url: "/dashboard/courses",
    icon:PiGraduationCap
  },
  {
    id: "5",
    title: "Settings",
    url: "/dashboard/settings",
    icon:CiSettings
  },
  {
    id: "6",
    title: "Log out",
    url: "/",
    icon:CiLogout
  },
];
