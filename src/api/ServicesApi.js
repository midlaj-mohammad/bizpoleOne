// Fetch services for a specific category
export const getServicesByCategory = async (categoryId, { page = 1, limit = 2 } = {}) => {
  if (!categoryId) return { data: [] };
  const params = { page, limit };
  const res = await axiosInstance.get(`/service-categories/${categoryId}`, { params });
  // Normalize to array for compatibility
  return res.data?.data?.Services ? { data: res.data.data.Services, total: res.data.data.total || 0 } : { data: [], total: 0 };
};
import axiosInstance from "./axiosInstance";

// Fetch paginated service names
export const getServices = async ({ page = 1, limit = 10, filter = "", categoryId = "" } = {}) => {
  const params = { page, limit };
  if (filter) params.filter = filter;
  if (categoryId) params.categoryId = categoryId;
  const res = await axiosInstance.get("/service-names", { params });
  return res.data;
};

// Fetch service categories with their services
export const getServiceCategories = async () => {
  const res = await axiosInstance.get("/service-category");
  return res.data;
};

export default { getServices, getServiceCategories, getServicesByCategory };