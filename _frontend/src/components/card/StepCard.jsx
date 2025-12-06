import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const StepCard = ({ step, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      variants={itemVariants}
      className={`flex items-center gap-8 mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'} flex-col md:flex-row`}
    >
      {/* Conteúdo */}
      <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 w-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </span>
          <h3 className="text-xl font-bold text-white">{step.title}</h3>
        </div>
        <p className="text-gray-400">{step.description}</p>
      </div>
      
      {/* Ícone central */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center z-10 flex-shrink-0">
        {step.icon}
      </div>
      
      {/* Espaço vazio (para alternar lados) */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

export default StepCard;
