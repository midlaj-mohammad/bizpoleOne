import React from "react";

const CompanyInformationForm = ({ onNext }) => {
  return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f5f5]">
      {/* Left Section */}
      <div
        className="flex-1 p-4 sm:p-8 md:p-10 lg:p-12 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl"
        style={{ backgroundImage: "url('/Images/hero-bg.png')" }}
      >
        <h1 className="text-4xl font-bold text-center mb-12">
          Company Information
        </h1>

        {/* Form Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Type of Business */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Type of Business
              </label>
              <div className="flex flex-wrap gap-6 text-base">
                {["Pvt Ltd", "LLP", "OPC", "Sole proprietor"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="businessType"
                      className="accent-yellow-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Name of Business */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Name of Business
              </label>
              <input
                type="text"
                placeholder="e.g. Bizpole"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Date Of Incorporation */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Date Of Incorporation
              </label>
              <input
                type="date"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* PAN of the Entity */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                PAN of the Entity
              </label>
              <input
                type="text"
                placeholder="e.g. BNGY789B78"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* CIN/LLPIN */}
            <div>
              <label className="block mb-2 text-lg font-semibold">CIN/LLPIN</label>
              <input
                type="text"
                placeholder="e.g. BNGY789B78"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Business Activity */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Business Activity
              </label>
              <select className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>IT</option>
                <option>Finance</option>
                <option>Manufacturing</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* GST Registration Status */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                GST Registration Status
              </label>
              <div className="flex flex-wrap gap-6 text-base">
                {["Yes", "No", "NA"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gstStatus"
                      className="accent-yellow-500"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            {/* GST Registration Number */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                GST Registration Number
              </label>
              <input
                type="text"
                placeholder="e.g. Bizpole"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* GST Registration Type */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                GST Registration Type
              </label>
              <div className="flex flex-wrap gap-6 text-base">
                {["Regular", "Compostion", "IFF"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gstType"
                      className="accent-yellow-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Registered Office */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Registered Office
              </label>
              <input
                type="text"
                placeholder="e.g. BNGY789B78"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Communication Address */}
            <div>
              <label className="block mb-2 text-lg font-semibold">
                Communication Address
              </label>
              <input
                type="text"
                placeholder="Address (House No, Building, Street, Area)*"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                placeholder="Locality/Town*"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                placeholder="City/District*"
                className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="State*"
                  className="flex-1 border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="text"
                  placeholder="Pincode*"
                  className="flex-1 border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
  <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-12 max-w-6xl mx-auto gap-6 md:gap-0">
          <button className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full text-yellow-500 text-xl hover:bg-yellow-100 transition">
            ←
          </button>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-base">
              <input type="checkbox" className="accent-yellow-500" />
              Remind me later!
            </label>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition"
              onClick={onNext}
            >
              Next »
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar Timeline Stepper */}
  <div className="w-full lg:w-100 bg-yellow-400 text-black p-4 sm:p-8 rounded-tr-2xl rounded-br-2xl pt-10 lg:pt-60 flex flex-col items-center mt-8 lg:mt-0">
        <h2 className="font-bold text-xl mb-10 text-white">Quick & Easy Setup</h2>
        <ol className="relative border-l-2 border-black/30 ml-4">
          {/* Step 1 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-yellow-400">1</span>
            <span className="font-semibold text-lg mt-1">Company Information</span>
            <span className="text-xs text-black/70 mt-1">Step 1 of 4</span>
          </li>
          {/* Step 2 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full font-bold text-lg border-4 border-black/30">2</span>
            <span className="font-semibold text-lg mt-1">Director/Promoter Details</span>
            <span className="text-xs text-black/70 mt-1">Step 2 of 4</span>
          </li>
          {/* Step 3 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full font-bold text-lg border-4 border-black/30">3</span>
            <span className="font-semibold text-lg mt-1">Registration Status</span>
            <span className="text-xs text-black/70 mt-1">Step 3 of 4</span>
          </li>
          {/* Step 4 */}
          <li className="ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full font-bold text-lg border-4 border-black/30">4</span>
            <span className="font-semibold text-lg mt-1">Compliance</span>
            <span className="text-xs text-black/70 mt-1">Step 4 of 4</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default CompanyInformationForm;
