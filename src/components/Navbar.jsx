import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SigninModal from "./Modals/SigninModal";


export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignin, setShowSignin] = useState(false); // ✅ Added state

  const navItems = [
    { label: "Services", path: "/services" },
    { label: "Product", path: "/product" },
    { label: "Bizpole One", path: "/bizpoleone" },
    { label: "Partners", path: "/partners" },
    { label: "Companies", path: "/companies" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300  ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between py-5">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center cursor-pointer"
          >
            <img src="/Images/logo.png" alt="Bizpole Logo" className="h-17" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-12 font-medium text-xl">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigate(item.path)}
                  className={`transition navli cursor-pointer ${
                    isScrolled
                      ? "text-gray-900 hover:text-black"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Sign In Button */}
            <motion.button
              whileHover="hover"
              initial="rest"
              animate="rest"
              onClick={() => setShowSignin(true)} // ✅ Modal Trigger
              className={`relative overflow-hidden px-5 py-2 text-sm font-medium rounded-full cursor-pointer  bg-[#fbbf24] text-black`}
            >
              <motion.span
                variants={{
                  rest: { width: "0%", opacity: 0 },
                  hover: { width: "100%", opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`absolute left-1/2 top-0 h-full ${
                  isScrolled ? "bg-white" : "bg-[#fbbf24]"
                } -translate-x-1/2`}
              />
              <span className="relative z-10 text-xl">Sign In</span>
            </motion.button>

            {/* ✅ Keep this as you said - DO NOT REMOVE */}
            <motion.button
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative overflow-hidden px-5 py-2 text-sm font-semibold rounded-full text-black cursor-pointer bg-white shadow-md"
            >
              <motion.span
                variants={{
                  rest: { width: "0%", opacity: 0 },
                  hover: { width: "100%", opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-1/2 top-0 h-full bg-[#fbbf24] -translate-x-1/2"
              />
              <span className="relative z-10 text-xl">
                Get Start Your <span className="font-bold">Business</span>
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? "text-gray-800" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg"
            >
              <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-800">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className="w-full text-left hover:text-black transition"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}

                {/* Sign In Button Mobile */}
                <li>
                  <motion.button
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    onClick={() => setShowSignin(true)} // ✅ Modal Trigger
                    className="relative overflow-hidden w-full py-2 rounded-full bg-white text-black font-medium"
                  >
                    <motion.span
                      variants={{
                        rest: { width: "0%", opacity: 0 },
                        hover: { width: "100%", opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute left-1/2 top-0 h-full bg-[#fbbf24] -translate-x-1/2"
                    />
                    <span className="relative z-10">Sign In</span>
                  </motion.button>
                </li>

                {/* ✅ Keep this - DO NOT REMOVE */}
                <li>
                  <motion.button
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    className="relative overflow-hidden w-full py-2 rounded-full font-semibold text-black bg-white border border-black"
                  >
                    <motion.span
                      variants={{
                        rest: { width: "0%", opacity: 0 },
                        hover: { width: "100%", opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute left-1/2 top-0 h-full bg-[#fbbf24] -translate-x-1/2 "
                    />
                    <span className="relative z-10">
                      Get Start Your <span className="font-bold">Business</span>
                    </span>
                  </motion.button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Signin Modal */}
      <SigninModal isOpen={showSignin} onClose={() => setShowSignin(false)} />
    </>
  );
}
