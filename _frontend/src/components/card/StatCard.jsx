import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, title, value, color }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center"
        >
            <Icon className={`mb-2 ${color} w-10 h-10`} />
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </motion.div>
    );
};

export default StatCard;
