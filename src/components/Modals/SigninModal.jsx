import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SigninModal = ({ isOpen = true, onClose = () => {} }) => {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [timer, setTimer] = useState(30);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const modalContentRef = useRef(null);

  // Timer countdown for OTP
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleResend = () => {
    setTimer(30);
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      
      // Auto focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        ref={modalContentRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.button>

        <AnimatePresence mode="wait">
          {/* Step 1 - Email / Phone */}
          {step === 1 && (
            <motion.div
              key="step1"
              className="flex flex-col items-center gap-6 w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-800 mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Sign In
              </motion.h2>

              <motion.div 
                className="w-full"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Email Address / Phone Number
                </label>
                <input
                  type="text"
                  placeholder="abc@xyz.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all"
                />
              </motion.div>

              {/* Switch Button */}
              <motion.div 
                className="relative bg-yellow-400 rounded-full w-20 h-12 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleNextStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
                  animate={{ x: isHovered ? 32 : 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  <motion.svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    animate={{ rotate: isHovered ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path 
                      d="M5 12h14m-7-7l7 7-7 7" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-sm text-center text-gray-600 leading-relaxed"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We Will send you a one time password <br /> 
                on this <span className="font-bold text-gray-800">Mobile Number</span>
              </motion.p>

              <motion.p 
                className="text-sm text-gray-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Don't Have An Account ? {" "}
                <span className="font-semibold underline cursor-pointer text-gray-800 hover:text-yellow-600 transition-colors">
                  Sign up
                </span>
              </motion.p>
            </motion.div>
          )}

          {/* Step 2 - OTP */}
          {step === 2 && (
            <motion.div
              key="step2"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <motion.h2 
                className="text-2xl font-bold text-gray-800 mb-2"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                OTP Verification
              </motion.h2>

              <motion.p 
                className="text-center text-gray-600 leading-relaxed"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                We Will send you a one time password on this{" "}
                <span className="font-bold text-gray-800">Mobile Number</span> <br />
                <span className="font-semibold text-gray-800">
                  {inputValue || "+91 - 12989200823"}
                </span>
              </motion.p>

              {/* OTP inputs */}
              <motion.div 
                className="flex gap-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, staggerChildren: 0.1 }}
              >
                {[0, 1, 2, 3].map((index) => (
                  <motion.input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={otpValues[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 border-2 border-yellow-400 rounded-full text-center text-xl font-semibold outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition-all"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  />
                ))}
              </motion.div>

              {/* Timer */}
              <motion.p 
                className="text-lg font-mono text-gray-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {`00:${timer.toString().padStart(2, "0")}`}
              </motion.p>

              <motion.p 
                className="text-sm text-gray-600"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Do not send OTP ?{" "}
                <span
                  className="text-yellow-500 font-semibold cursor-pointer hover:text-yellow-600 transition-colors"
                  onClick={handleResend}
                >
                  Resend OTP
                </span>
              </motion.p>

              {/* Back Button */}
              <motion.div 
                className="relative bg-yellow-400 rounded-full w-20 h-12 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleBackStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center"
                  animate={{ x: isHovered ? 32 : 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  <motion.svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    animate={{ rotate: isHovered ? -90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path 
                      d="M5 12h14M12 5l7 7-7 7" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SigninModal;