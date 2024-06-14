import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {profileAction} from "../../store/profileSlice"
import { useDispatch, useSelector } from "react-redux";
const SubTitle=({catagory})=>{
  const dispatch=useDispatch();
  const {openNavigation,sidebarShow:show} =useSelector((store)=>store.profile)
    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      className="z-[200] invisible group-hover:visible flex flex-col rounded-xl backdrop-blur-md bg-gradient-to-br from-gray-800 to-blue-900 fixed left-1/2 transform -translate-x-1/2 bottom-[0] lg:-bottom-[115px] lg:-right-[40px] transition-opacity opacity-0 group-hover:opacity-100 gap-4 py-4 duration-400 w-full lg:w-[250px] lg:absolute text-center"
    >
      {catagory.length
        ? catagory.map((item) => (
            <Link
            onClick={(e)=>{ e.stopPropagation()
              if(openNavigation) dispatch(profileAction.setOpenNavigation(!openNavigation))
                if(show)dispatch(profileAction.setSidebarShow(!show))
            }}
              key={item.name}
              to={item.link}
              className="bg-black/30 hover:bg-black/50 rounded-md py-2 mx-2"
              
            >
              <p className="text-white">{item.name}</p>
            </Link>
          ))
        : null}
    </motion.div>
    );

}
export default SubTitle;