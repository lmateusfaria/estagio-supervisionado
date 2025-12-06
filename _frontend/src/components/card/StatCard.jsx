import { motion } from "framer-motion";

const StatCard = ({ icon, number, label, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center"
    >
      <div className="text-green-400 mb-3 flex justify-center">
        {icon}
      </div>
      <div className="text-4xl font-bold text-white mb-2">{number}</div>
      <div className="text-sm text-gray-400">{label}</div>
      {trend && (
        <div className="mt-2 text-emerald-400 text-sm font-semibold">
          {trend}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;

