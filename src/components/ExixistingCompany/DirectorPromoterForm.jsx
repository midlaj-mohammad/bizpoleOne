
import React, { useState } from "react";
import { upsertCompany } from "../../api/CompanyApi";
import { getSecureItem } from "../../utils/secureStorage";


const DirectorPromoterForm = ({ onNext, onBack }) => {
  const [count, setCount] = useState(1);
  const [directors, setDirectors] = useState([
    { fullName: "", designation: "", din: "", mobile: "", email: "", pan: "", aadhaar: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCountChange = (e) => {
    const newCount = Number(e.target.value);
    setCount(newCount);
    setDirectors((prev) => {
      if (newCount > prev.length) {
        return [
          ...prev,
          ...Array(newCount - prev.length).fill({ fullName: "", designation: "", din: "", mobile: "", email: "", pan: "", aadhaar: "" }),
        ];
      } else {
        return prev.slice(0, newCount);
      }
    });
  };

  const handleDirectorChange = (idx, field, value) => {
    setDirectors((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Get company info from localStorage (set by CompanyInformationForm)
    let companyInfo = null;
    try {
      const stored = getSecureItem("companyInfo");
      if (stored) companyInfo = JSON.parse(stored);
    } catch {}
    if (!companyInfo || !companyInfo.EmployeeID || !companyInfo.FranchiseID) {
      setError("Please complete the Company Information step to assign an agent and franchisee before proceeding.");
      setLoading(false);
      return;
    }
    // Map directors to Customers array, using company info for shared fields
    const Customers = directors.map((d) => ({
      FirstName: d.fullName,
      LastName: "",
      DateOfBirth: "",
      PreferredLanguage: companyInfo.Customers && companyInfo.Customers[0] ? companyInfo.Customers[0].PreferredLanguage : "",
      Email: d.email,
      Mobile: d.mobile,
      Country: "India",
      State: companyInfo.State || "",
      City: companyInfo.City || "",
      PinCode: companyInfo.PinCode || "",
      PANNumber: d.pan,
      IsComponyRegistered: 1,
      PrimaryCustomer: 0
    }));
    // Merge companyInfo and new Customers array
    const payload = {
      ...companyInfo,
      Customers,
      EmployeeID: companyInfo.EmployeeID,
      FranchiseID: companyInfo.FranchiseID
    };
    try {
      await upsertCompany(payload);
      if (onNext) onNext();
    } catch (err) {
      setError("Failed to save director/promoter details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f5f5]">
      {/* Left Section */}
      <div
        className="flex-1 p-4 sm:p-8 md:p-10 lg:p-12 bg-cover bg-center rounded-tl-2xl rounded-bl-2xl"
        style={{ backgroundImage: "url('/Images/hero-bg.webp')" }}
      >
        <h1 className="text-4xl font-bold text-center mb-12">
          Director/Promoter Details
        </h1>

        {/* Number of Directors/Partners */}
        <div className="max-w-6xl mx-auto mb-10">
          <label className="block mb-2 text-lg font-semibold">
            Number of Directors/Partners
          </label>
          <select
            className="w-48 border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={count}
            onChange={handleCountChange}
            disabled={loading}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Dynamic Director/Partner Forms */}
        <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto">
          {directors.map((director, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 bg-white/80 rounded-2xl p-4 md:p-8 shadow">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-lg font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={director.fullName}
                    onChange={e => handleDirectorChange(idx, "fullName", e.target.value)}
                    placeholder="e.g. John"
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                {/* Designation */}
                <div>
                  <label className="block mb-2 text-lg font-semibold">Designation</label>
                  <select
                    name="designation"
                    value={director.designation}
                    onChange={e => handleDirectorChange(idx, "designation", e.target.value)}
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">e.g. Advocate</option>
                    <option value="Director">Director</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
                {/* DIN */}
                <div>
                  <label className="block mb-2 text-lg font-semibold">DIN</label>
                  <input
                    type="text"
                    name="din"
                    value={director.din}
                    onChange={e => handleDirectorChange(idx, "din", e.target.value)}
                    placeholder="e.g. BNGY789878"
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-8">
                {/* Mobile Number */}
                <div>
                  <label className="block mb-2 text-lg ">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    value={director.mobile}
                    onChange={e => handleDirectorChange(idx, "mobile", e.target.value)}
                    placeholder="e.g. 12433547"
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                {/* Email ID */}
                <div>
                  <label className="block mb-2 text-lg ">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={director.email}
                    onChange={e => handleDirectorChange(idx, "email", e.target.value)}
                    placeholder="e.g. john@gmail.com"
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                {/* PAN */}
                <div>
                  <label className="block mb-2 text-lg ">PAN</label>
                  <input
                    type="text"
                    name="pan"
                    value={director.pan}
                    onChange={e => handleDirectorChange(idx, "pan", e.target.value)}
                    placeholder="e.g. BNGY789878"
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                {/* Aadhaar */}
                <div>
                  <label className="block mb-2 text-lg ">Aadhaar</label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={director.aadhaar}
                    onChange={e => handleDirectorChange(idx, "aadhaar", e.target.value)}
                    placeholder="e.g. 23424578"
                    className="w-full border-2 border-yellow-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-12 max-w-6xl mx-auto gap-6 md:gap-0">
          <button
            className="w-12 h-12 flex items-center justify-center border-2 border-yellow-400 rounded-full text-yellow-500 text-xl hover:bg-yellow-100 transition"
            type="button"
            disabled={loading}
            onClick={onBack}
          >
            ←
          </button>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-base">
              <input type="checkbox" className="accent-yellow-500" />
              Remind me later!
            </label>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition"
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </div>

      {/* Right Sidebar Timeline Stepper */}
  <div className="w-full lg:w-100 bg-yellow-400 text-black p-4 sm:p-8 rounded-tr-2xl rounded-br-2xl pt-10 lg:pt-60 flex flex-col items-center mt-8 lg:mt-0">
        <h2 className="font-bold text-xl mb-10 text-white">Quick & Easy Setup</h2>
        <ol className="relative border-l-2 border-black/30 ml-4">
          {/* Step 1 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-white rounded-full font-bold text-lg border-4 border-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="font-semibold text-lg mt-1">Company Information</span>
            <span className="text-xs text-black/70 mt-1">Step 1 of 4</span>
          </li>
          {/* Step 2 */}
          <li className="mb-10 ml-6 flex flex-col">
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-black text-yellow-400 rounded-full font-bold text-lg border-4 border-white">2</span>
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

export default DirectorPromoterForm;
