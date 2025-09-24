import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPackagesByServiceType } from "../api/ServiceType";
import { motion } from "framer-motion";
import { Check, X, Users, Calendar } from "lucide-react";

const Subscription = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const location = useLocation();

  // Packages by service type
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get type id from location.state or localStorage
        let typeId = 4;
        if (location && location.state && location.state.type) {
          typeId = location.state.type;
        } else {
          // fallback to localStorage if needed
          const loc = localStorage.getItem('location');
          if (loc) {
            const parsed = JSON.parse(loc);
            if (parsed && parsed.type) typeId = parsed.type;
          }
        }
        const data = await getPackagesByServiceType(typeId);
        console.log('Fetched packages:', data.data || data);
        setPlans(data || []);
      } catch (err) {
        setError("Failed to load packages");
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Top Navbar */}
      <div className="w-full flex justify-start items-center p-6">
         <img
            src="/Images/logo.png"
            alt="Logo"
            className="absolute top-6 left-6 w-38 h-auto"
          />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className=" custom-container  rounded-4xl p-6 md:p-12">
          <h2 className="text-center text-3xl md:text-4xl pb-10 font-bold text-[#F3C625] ">
            The Right Plan for Your Business
          </h2>
          <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto pb-6 text-sm md:text-base">
            We have several powerful plans to showcase your business and get
            discovered as a creative entrepreneur. Everything you need.
          </p>

          {/* Package label */}
          <div className="text-center mb-8 flex flex-wrap gap-3 justify-center">
            <button className="inline-block bg-black text-white rounded-full px-4 py-2 font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-900 hover:text-white">
              Package
            </button>
            <button
              className="inline-block bg-white text-black rounded-full px-4 py-2 font-medium border-2 cursor-pointer transition-colors duration-200 hover:bg-[#F3C625] hover:text-black"
              style={{ borderColor: '#F3C625' }}
            >
              Choose individual service
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="mt-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ">
            {loading && (
              <div className="col-span-4 text-center text-gray-500">Loading packages...</div>
            )}
            {error && (
              <div className="col-span-4 text-center text-red-500">{error}</div>
            )}
            {!loading && !error && plans.length === 0 && (
              <div className="col-span-4 text-center text-gray-500">No packages found.</div>
            )}
            {!loading && !error && plans.map((plan, i) => (
              <motion.div
                key={plan.id || plan.packageId || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.02,
                  y: -15,
                  backgroundColor: "#1f1f1f",
                  color: "#ffffff",
                }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative rounded-3xl p-6 flex flex-col justify-between shadow-lg md:min-w-[400px] h-[590px] bg-white text-black transition-all duration-300 group border-2"
                style={{ borderColor: '#F3C625' }}
              >
                {/* Top-right tags with icons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <span className="bg-white border-2 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1" style={{ borderColor: '#F3C625' }}>
                    <Calendar size={14} className="text-gray-400" /> Yearly
                      {/* <Users size={14} className="text-gray-400" /> */}
                  </span>
                  {/* <span className="bg-white border-2 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1" style={{ borderColor: '#F3C625' }}>
                    <Calendar size={14} className="text-gray-400" /> Monthly
                  </span> */}
                </div>
                {/* Plan header */}
                <div>
                  <h3 className="text-xl md:text-2xl mb-2 mt-10  transition-colors">
                    {plan.name || plan.PackageName || plan.packageName}
                  </h3>
                  <span className="md:text-4xl font-semibold" >₹{plan.price || plan.YearlyMRP || plan.amount}</span>
                  <p className="text-lg text-gray-600 mt-2 mb-1 group-hover:text-gray-300 transition-colors">
                    {plan.description || plan.Description}
                  </p>
                  <p className="text-lg font-medium mt-4 text-gray-800 group-hover:text-gray-200 transition-colors">
                    {plan.audience || plan.Audience}
                  </p>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-300 group-hover:border-gray-600 transition-colors"></div>

                {/* Features (Services) */}
                {plan.services && Array.isArray(plan.services) && plan.services.length > 0 && (
                  <ul className="space-y-3 flex-1">
                    {plan.services.map((service, idx) => (
                      <li
                        key={service.ID || idx}
                        className="flex items-center gap-2 transition-colors text-gray-700 group-hover:text-white"
                      >
                        <span className="bg-gray-200 p-1 flex items-center justify-center group-hover:bg-[#3b393275]">
                          <Check size={18} className="transition-colors text-gray-500" style={hoveredCard === i ? { color: '#F3C625' } : {}} />
                        </span>
                        <span className="text-lg font-medium">{service.ServiceName}</span>
                     
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                <div className="mt-6">
                  <button
                    className={`w-full rounded-3xl py-3 font-semibold transition-colors cursor-pointer`}
                    style={{
                      backgroundColor: '#F3C625',
                      color: 'black',
                    }}
                  >
                    {plan.button || 'Get Quote  '}
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