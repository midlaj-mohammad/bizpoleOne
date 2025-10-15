import React, { useEffect, useState } from "react";
import { getCompanyById } from "../api/CompanyApi";


const CompanyDetails = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompanyById();
        setCompany(data);
      } catch (err) {
        setError("Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading company details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Details</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Company ID:</span>
            <span>{company?.CompanyId}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Name:</span>
            <span>{company?.Name || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Address:</span>
            <span>{company?.Address || "N/A"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Email:</span>
            <span>{company?.Email || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Phone:</span>
            <span>{company?.Phone || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
