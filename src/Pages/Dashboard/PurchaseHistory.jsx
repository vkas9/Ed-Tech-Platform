import { motion } from "framer-motion";
const PurchaseHistory = () => {
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

      <div>Coming Soon...</div>
    </motion.div>
  );
};
export default PurchaseHistory;
