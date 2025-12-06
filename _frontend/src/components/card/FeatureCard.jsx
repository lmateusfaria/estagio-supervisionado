import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description, color = "from-green-500 to-emerald-500" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className={`relative w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      
      <h3 className="relative text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="relative text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
