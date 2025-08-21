import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Building2, Sparkles } from 'lucide-react';

const StartYourBusiness = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { 
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const backgroundPattern = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 1 }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20 mt-6">
      <motion.div 
        className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Visual Section */}
          <motion.div 
            className="lg:w-1/2 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 relative overflow-hidden flex items-center justify-center p-8"
            variants={itemVariants}
          >
            {/* Background Pattern */}
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              fill="none"
            >
              <motion.path
                d="M50 200 Q200 50 350 200 Q200 350 50 200"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                variants={backgroundPattern}
              />
              <motion.path
                d="M100 150 Q200 100 300 150 Q200 200 100 150"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                fill="none"
                variants={backgroundPattern}
              />
              <motion.path
                d="M75 250 Q200 200 325 250 Q200 300 75 250"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                fill="none"
                variants={backgroundPattern}
              />
            </svg>

            {/* Main Card */}
            <motion.div 
              className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <Building2 className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-4xl font-bold text-gray-800 transform -rotate-12"
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  images
                </motion.h3>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-24 left-16 w-6 h-6 bg-white/20 rounded-full"
              animate={{ 
                y: [0, 10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

          {/* Right Side - Content Section */}
          <motion.div 
            className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
            variants={itemVariants}
          >
            {/* Header */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <span className="text-xl font-bold text-gray-800">Bizpole</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Prime</span>
                </motion.div>
              </div>

              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                variants={itemVariants}
              >
                Let's talk business!
              </motion.h1>
              
              <motion.p 
                className="text-gray-600 text-lg"
                variants={itemVariants}
              >
                To begin this journey, tell us what type of account you'd be opening.
              </motion.p>
            </motion.div>

            {/* Action Cards */}
            <motion.div className="space-y-4 mb-8" variants={itemVariants}>
              <motion.button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-left relative overflow-hidden group"
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                onHoverStart={() => setHoveredCard('new')}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <div className="font-bold text-lg mb-1">Start a New Company</div>
                    <div className="text-sm opacity-80">Perfect for entrepreneurs starting their first business venture</div>
                  </div>
                  <motion.div
                    variants={iconVariants}
                    className="flex-shrink-0 ml-4"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-left relative overflow-hidden group"
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                onHoverStart={() => setHoveredCard('existing')}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <div className="font-bold text-lg mb-1">Onboard Existing Company</div>
                    <div className="text-sm opacity-80">Own or belong to a company, this is for you</div>
                  </div>
                  <motion.div
                    variants={iconVariants}
                    className="flex-shrink-0 ml-4"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Help Section */}
            <motion.div 
              className="bg-gray-800 rounded-xl p-6 text-white"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-semibold text-lg mb-2">Not sure which to choose?</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Our business consultants are available to help you make the right decision for your specific situation. Get personalized recommendations tailored to your goals.
              </p>
              <motion.button 
                className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Talk to an expert</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StartYourBusiness;