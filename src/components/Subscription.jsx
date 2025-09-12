import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

// Plans data
const plans = [
  {
    name: "Intro",
    monthly: 19,
    yearly: 190,
    features: [
      { text: "xxxxxxxx", included: true },
      { text: "xxxxxxxxxx", included: true },
      { text: "xxxxxxxxxx", included: true },
      { text: "xxxxxxxxxx", included: true },
      { text: "xxxxxxxxxx", included: true },
    ],
    button: "Choose",
    highlight: false,
  },
  {
    name: "Base",
    monthly: 39,
    yearly: 390,
    features: [
      { text: "xxxxxxxxxxxx", included: true },
      { text: "xxxxxxxxxx", included: true },
      { text: "xxxx", included: false },
      { text: "xxxx", included: false },
      { text: "xxxx", included: false },
    ],
    button: "Choose",
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 79,
    yearly: 790,
    features: [
      { text: "xxxxx", included: true },
      { text: "xxxxx", included: true },
      { text: "xxxxx", included: true },
      { text: "xxxxx", included: true },
      { text: "xxxxx", included: false },
    ],
    button: "Try 1 month",
    highlight: true,
    save: "Save $40",
  },
  {
    name: "Enterprise",
    monthly: 129,
    yearly: 1290,
    features: [
      { text: "xxxxx", included: true },
      { text: "xxxx", included: true },
      { text: "xxxx", included: true },
      { text: "xxxx", included: true },
      { text: "xxxx", included: true },
    ],
    button: "Choose",
    highlight: false,
  },
];

const Subscription = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Top Navbar */}
      <div className="w-full flex justify-start items-center p-6">
        <img src="/Images/logo.png" alt="Bizpole Logo" className="h-14" />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="container w-full bg-[#F3C6254D] rounded-4xl p-6 md:p-12">
          <h2 className="text-center text-3xl md:text-4xl pb-4 font-bold text-yellow-600">
            The Right Plan for Your Business
          </h2>
          <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto pb-6 text-sm md:text-base">
            We have several powerful plans to showcase your business and get
            discovered as creative entrepreneurs. Everything you need.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-9 mt-6">
            <span
              className={`cursor-pointer transition ${
                billing === "monthly" ? "font-bold text-black" : "text-gray-500"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Bill Monthly
            </span>
            <motion.div
              className="w-12 h-6 bg-black rounded-full flex items-center cursor-pointer"
              layout
              onClick={() =>
                setBilling(billing === "monthly" ? "annual" : "monthly")
              }
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`w-5 h-5 rounded-full bg-yellow-400 ${
                  billing === "monthly" ? "ml-1" : "ml-6"
                }`}
              />
            </motion.div>
            <span
              className={`cursor-pointer transition ${
                billing === "annual" ? "font-bold text-black" : "text-gray-500"
              }`}
              onClick={() => setBilling("annual")}
            >
              Bill Annually
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.07,
                  y: -15,
                  backgroundColor: "#1f1f1f",
                  color: "#ffffff",
                  boxShadow: "0px 0px 35px rgba(243, 198, 37, 0.8)",
                }}
                className="relative rounded-3xl p-6 flex flex-col justify-between shadow-lg h-[490px] bg-white text-black transition-all duration-300"
              >
                {/* Save badge */}
                {plan.save && (
                  <span className="absolute bg-yellow-400 text-xs px-2 py-1 rounded-md -top-3 right-4">
                    {plan.save}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold transition-colors">
                  {plan.name}
                </h3>

                {/* Features */}
                <ul className="mt-6 space-y-2 flex-1">
                  {plan.features.map((f, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 transition-colors ${
                        f.included
                          ? "text-gray-700 group-hover:text-gray-200"
                          : "text-gray-400 line-through group-hover:text-gray-500"
                      }`}
                    >
                      {f.included ? (
                        <Check size={16} className="transition-colors" />
                      ) : (
                        <X size={16} className="transition-colors" />
                      )}
                      {f.text}
                    </li>
                  ))}
                </ul>

                {/* Price & Button */}
                <div className="mt-6">
                  <p className="text-xl md:text-2xl font-bold transition-colors">
                    ${billing === "monthly" ? plan.monthly : plan.yearly}
                    <span className="text-sm font-normal ml-1">
                      {billing === "monthly" ? "/month" : "/year"}
                    </span>
                  </p>
                  <button
                    className={`mt-4 w-full rounded-xl py-3 font-semibold transition-colors cursor-pointer ${
                      plan.highlight
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-yellow-100 text-black hover:bg-yellow-300"
                    }`}
                  >
                    {plan.button}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
