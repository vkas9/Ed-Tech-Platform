
import { motion } from "framer-motion";
const Settings=()=>{
    return (
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.4,delay:.2,ease:[0,.71,.2,1.01]}}   className="flex font-semibold gap-1 text-lg  pt-2 pl-5 ">
          <span>Home</span>
          <span>/</span>
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-yellow-500 ">Settings</span>
        </motion.div>
    )
}
export default Settings;