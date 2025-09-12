import { motion } from "framer-motion";
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const businessTypes = [
  "Private Limited",
  "Limited Liability Partnership",
  "Partnership",
  "Solo Entrepreneur",
  "Sole Proprietorship",
  "Trust",
];

const ChooseBusinessType = ({ onBack }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, x: 120 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -120 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        {/* Left Side */}
        <div
          className="lg:w-1/2 bg-gray-50 p-10 flex flex-col justify-center relative bg-cover bg-center bg-no-repeat rounded-2xl"
          style={{ backgroundImage: "url('/Images/hero-bg.png')" }}
        >
          {/* Logo at top-left */}
          <img
            src="/Images/logo.png"
            alt="Logo"
            className="absolute top-6 left-6 w-28 h-auto"
          />

          <motion.h1
            className="text-4xl font-extrabold mb-4 text-gray-900"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Choose Your Business Type
          </motion.h1>
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Select the business structure that best suits your needs and goals.
          </motion.p>

          {/* Business Type Buttons */}
          <div className="grid grid-cols-2 gap-10">
            {businessTypes.map((type, index) => (
              <motion.div
                key={type}
                className="relative group flex items-center justify-between py-4 px-5 border-2 border-gray-200 rounded-xl shadow-sm bg-white hover:bg-yellow-100 hover:border-yellow-400 text-gray-800 font-medium transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <span>{type}</span>

                {/* Hover Learn More Button */}
                <motion.button
                  className="absolute right-0 top-1 cursor-pointer -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3 transition-all duration-300 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-1 rounded-full shadow-md"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Help Section */}
          <motion.div
            className="mt-10 flex items-center justify-between bg-gray-900 text-white p-5 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div>
              <h3 className="font-semibold text-lg">Confused?</h3>
              <p className="text-sm text-gray-300">
                We’re here to help! Your solution’s just a page away.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-md hover:bg-yellow-500 cursor-pointer"
              onClick={() => navigate("/quiz")}
            >
              Take Quiz
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 relative flex items-center justify-center overflow-hidden">
          {/* Back Button */}
          <motion.button
            className="absolute left-4 top-4 flex items-center gap-2 bg-white text-gray-800 rounded-full px-4 py-2 shadow-lg hover:bg-gray-100 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          {/* Illustration */}
          <motion.div
            className="flex flex-col items-center justify-center text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="w-28 h-28 rounded-3xl bg-white/30 flex items-center justify-center mb-6">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-white font-extrabold text-3xl">
              Build Your Dream
            </h2>
            <p className="text-white/80 mt-2 max-w-xs">
              Every great company starts with the right foundations.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChooseBusinessType;
