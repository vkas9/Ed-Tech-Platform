import Button from "../../components/Homepage/Button";
import ButtonUse from "./ButtonUse";
import { motion } from "framer-motion";
const ConfirmModal=({modalData})=>{
  
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.2,delay:0}}  className="top-0  left-0 z-[9999] flex justify-center bg-black/60 fixed w-[100vw] h-[100vh]  backdrop-blur-md">
            <div className="fixed flex py-6 flex-col text-center items-center gap-3  w-[96%]  sm:w-[400px] top-[35%]   rounded-xl bg-white/10 p-2  ">
                <span className="text-4xl font-semibold">{modalData?.text1}</span>
                <p className="text-gray-500/80 font-semibold ">{modalData?.text2}</p>
                <div className=" flex gap-5 ">
                   <ButtonUse   
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    className={"bg-gray-400/20 text-2xl text-white/90  px-2 transition-all duration-100 hover:bg-white/20 rounded-md"}
                   />
                   <button onClick={modalData?.btn2Handler} className="bg-gray-400/20 text-white/90 text-2xl py-2 px-2 transition-all duration-100 hover:bg-white/20 rounded-md">
                    {modalData?.btn2Text}
                    

                   </button>
                </div>
            </div>
        </motion.div>
    );
}
export default ConfirmModal;