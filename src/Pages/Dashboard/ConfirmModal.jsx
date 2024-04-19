import Button from "../../components/Homepage/Button";
import IconBtn from "./IconBtn";
import { motion } from "framer-motion";
const ConfirmModal=({modalData})=>{
    console.log("modalData->",modalData)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.2,delay:0}}  className="right-0 flex  justify-center  fixed w-screen h-screen bg-black/60 backdrop-blur-md">
            <div className="fixed flex py-6 flex-col text-center items-center gap-3  w-[400px] top-[30%]   rounded-xl bg-white/10 p-2  ">
                <span className="text-4xl ">{modalData?.text1}</span>
                <p className="text-gray-500/80 ">{modalData?.text2}</p>
                <div className=" flex gap-5 ">
                   <IconBtn   
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    className={"bg-gray-400/20 text-4xl text-white/90 py-2  px-2 transition-all duration-100 hover:bg-white/20 rounded-md"}
                   />
                   <button onClick={modalData?.btn2Handler} className="bg-gray-400/20 text-white/90 text-4xl py-2 px-2 transition-all duration-100 hover:bg-white/20 rounded-md">
                    {modalData?.btn2Text}
                    

                   </button>
                </div>
            </div>
        </motion.div>
    );
}
export default ConfirmModal;