import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle2, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizQuestions = [
  {
    id: 1,
    question: "Do you plan to raise investment from outside?",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    question: "Do you have Partner ?",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    question: "Would you like to protect your personal Assets from business risk ?",
    options: ["Yes", "No"],
  },
  {
    id: 4,
    question: "Do you plan to scale your business significancy?",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    question: "Do You expect the annual revenue to exceed 40 Lakhs?",
    options: ["Yes", "No"],
  },
];

const Quiz = ({ onComplete = () => {} }) => {
  const [countdown, setCountdown] = useState(5);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  // Countdown loader
  useEffect(() => {
    if (!started && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setStarted(true);
    }
  }, [countdown, started]);

  // Handle answers
  const handleAnswer = (answer) => {
    setSelectedOption(answer);
    
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setFinished(true);
        onComplete(newAnswers);
        
        // Redirect to businessType page after a short delay
        setTimeout(() => {
          navigate("/startbusiness/choose");
        }, 2000);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCountdown(5);
    setStarted(false);
    setCurrentQuestion(0);
    setFinished(false);
    setAnswers([]);
    setSelectedOption(null);
  };

  // Floating particles for background
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 relative overflow-hidden">
      <FloatingParticles />

      {/* Loader Screen (Scanner Style) */}
      {!started && !finished && (
        <AnimatePresence>
          <motion.div
            className="fixed flex flex-col inset-0 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mt--6">
              <h1 className="text-2xl md:text-4xl ">Your <span className="font-bold">Quiz</span> Will Start in </h1>
            </div> 

            {/* Scanner Beam */}
            <div className="fixed inset-0 pointer-events-none z-10">
              <div
                className="absolute top-1/2 left-1/2 w-screen h-screen origin-center"
                style={{
                  transform: "translate(-50%, -50%)",
                  animation: "scannerRotate 3s linear infinite",
                }}
              >
                <div
                  className="absolute top-1/2 left-1/2 w-0.5 origin-top"
                  style={{
                    height: "50vh",
                    transform: "translateX(-50%)",
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(255, 215, 0, 0.8) 10%, rgba(255, 215, 0, 0.6) 30%, rgba(255, 215, 0, 0.4) 60%, rgba(255, 215, 0, 0.2) 80%, transparent 100%)",
                    boxShadow:
                      "0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)",
                  }}
                />
              </div>
            </div>
            
            {/* Scanner Pulse */}
            <motion.div
              className="fixed top-1/2 left-1/2 w-96 h-96 border-2 border-yellow-400/30 rounded-full"
              style={{ transform: "translate(-50%, -50%)" }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Countdown Display */}
            <motion.div
              key={countdown}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-20 text-8xl font-extrabold text-yellow-400 flex flex-col items-center"
              style={{
                textShadow: "0 4px 8px rgba(255, 215, 0, 0.5)",
              }}
            >
              {countdown > 0 ? (
                <>
                  <span>{countdown}</span>
                  <motion.span 
                    className="text-lg mt-4 text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Getting ready...
                  </motion.span>
                </>
              ) : (
                <motion.span
                  className="text-yellow-500 flex flex-col items-center"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Sparkles className="w-12 h-12 mb-2" />
                  START!
                </motion.span>
              )}
            </motion.div>

            {/* Floating Hexagon with Icon */}
            <motion.div
              className="absolute bottom-[8%] right-[8%] w-16 h-14 z-20"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                  transform: "rotate(30deg)",
                  boxShadow: "0 8px 16px rgba(255, 215, 0, 0.3)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                    transform: "rotate(60deg)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                    transform: "rotate(-60deg)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white/80" style={{ transform: "rotate(-30deg)" }} />
                </div>
              </div>
            </motion.div>

            {/* Custom Scanner Animation */}
            <style jsx>{`
              @keyframes scannerRotate {
                0% {
                  transform: translate(-50%, -50%) rotate(0deg);
                }
                100% {
                  transform: translate(-50%, -50%) rotate(360deg);
                }
              }
            `}</style>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Question Screen */}
      {started && !finished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-h-[500px]"
        >
          {/* Question counter */}
          <div className="absolute top-6 right-6 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            {currentQuestion + 1} / {quizQuestions.length}
          </div>

          {/* Progress Bar */}
          <div className="w-50 bg-gray-200 rounded-full h-4 mb-10 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full shadow-sm relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>

          {/* Question */}
          <motion.div 
            className="text-center mb-10"
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {quizQuestions[currentQuestion].question}
            </h2>
          </motion.div>

          {/* Options */}
          <div className="space-y-4 flex-1 flex flex-col justify-center mb-8">
            {quizQuestions[currentQuestion].options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`w-full group relative py-5 px-8 rounded-2xl text-left font-semibold transition-all duration-300 shadow-sm hover:shadow-lg ${
                  selectedOption === option
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                    : "bg-gray-200 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 hover:border-yellow-400"
                }`}
                whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                disabled={selectedOption !== null}
              >
                <span className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedOption === option && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Skip */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => handleAnswer(null)}
              className="text-black-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200 flex items-center justify-center mx-auto"
              disabled={selectedOption !== null}
            >
              Skip 
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Finished Screen */}
      {finished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center text-center space-y-8 max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle2 className="w-28 h-28 text-yellow-500" />
          </motion.div>
          
          <motion.p 
            className="text-gray-900 text-2xl font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Great, You're Almost There
            One more step, then you can stay focused on your business—we'll take care of the rest!
          </motion.p>
          
          {/* <motion.div 
            className="flex gap-4 flex-col sm:flex-row"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => navigate("/businessType")}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              Proceed
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={resetQuiz}
              className="bg-gray-100 text-gray-700 font-semibold px-10 py-4 rounded-2xl shadow-md hover:bg-gray-200 transition-all duration-300 flex items-center justify-center group"
            >
              <RotateCcw className="w-5 h-5 mr-2 group-hover:-rotate-45 transition-transform" />
              Take Again
            </button>
          </motion.div> */}
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;