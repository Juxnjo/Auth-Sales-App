import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const fetchSales = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${API_URL}/sales`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const deleteSale = async (id, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${API_URL}/sales/${id}`, { headers });
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const updateSale = async (id, updatedData, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    await axios.put(`${API_URL}/sales/${id}`, updatedData, { headers });
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};
