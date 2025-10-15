import axiosInstance from "./axiosInstance";
import { setSecureItem, getSecureItem } from "../utils/secureStorage";

// 🔹 Add or update a company
export const upsertCompany = async (companyData) => {
  try {
    const response = await axiosInstance.post("/company/upsert", companyData);

    // If API returns CompanyId, save it securely in localStorage
    if (response.data?.CompanyId) {
      setSecureItem("CompanyId", response.data.CompanyId);
    }

    return response.data;
  } catch (error) {
    console.error("Error in upsertCompany:", error);
    throw error;
  }
};

// 🔹 Get company details by ID (from argument or encrypted localStorage)
export const getCompanyById = async (id) => {
  try {
    // If ID not provided, fetch securely from localStorage
    const companyId = id || getSecureItem("CompanyId");

    console.log("Using CompanyId:", companyId);

    if (!companyId) {
      throw new Error("CompanyId not found");
    }

    // API expects POST with payload { CompanyId: "235" }
    const response = await axiosInstance.post("/company/get-details", {
      CompanyId: companyId,
    });

    return response.data;
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    throw error;
  }
};
