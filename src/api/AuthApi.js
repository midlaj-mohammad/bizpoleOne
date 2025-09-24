import axiosInstance from "./axiosInstance";


// Use this for both sign-in and sign-up (request OTP)
export const loginWithPhone = async (phone) => {
  try {
    const response = await axiosInstance.post("/websitelogin", { phone });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyOtp = async (phone, otp) => {
  try {
    const response = await axiosInstance.post("/verify-website-otp", { phone, otp });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


