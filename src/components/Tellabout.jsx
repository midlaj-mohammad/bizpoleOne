import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Tellabout = () => {
  return (
    <motion.div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Illustration / Decoration */}
        <div className="lg:w-1/2 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 relative flex items-center justify-center p-12">
          <motion.div
            className="relative z-10 bg-white/20 backdrop-blur-sm rounded-3xl p-16 border border-white/30 w-80 h-96 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-yellow-500/20 mix-blend-overlay blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative">
          {/* Logo */}
          <img
            src="/Images/logo.png"
            alt="Logo"
            className="absolute top-6 right-6 w-24 h-auto"
          />

          {/* Form Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
            Tell Us About You
          </h1>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <select className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 bg-white">
                <option>Country</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
           
              <input
                type="text"
                placeholder="Pin Code"
                className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <input
                type="text"
                placeholder="State"
                className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <select className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 bg-white md:col-span-2">
                <option>Select Language</option>
              </select>
                 <input
                type="text"
                placeholder="Address"
                className="w-full md:col-span-2 border-2 border-yellow-400 rounded-4xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
              />
              <select className="w-full border-2 border-yellow-400 rounded-4xl px-4 py-3 bg-white md:col-span-2">
                <option>How’d you spot us?</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center lg:justify-end mt-8">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full shadow-lg transition flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Tellabout;
