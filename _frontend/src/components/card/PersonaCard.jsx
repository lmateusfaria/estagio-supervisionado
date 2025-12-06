import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PersonaCard = ({ avatar, role, description, benefits }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gradient-to-br from-gray-900 to-green-950/30 border border-green-500/20 rounded-2xl p-8 text-center"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-5xl">
        {avatar}
      </div>
      
      <h3 className="text-2xl font-bold mb-3 text-white">{role}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-2 text-left">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="text-green-400 flex-shrink-0" size={16} />
            <span className="text-gray-300">{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PersonaCard;
