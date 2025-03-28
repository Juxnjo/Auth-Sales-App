import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible");
  return { Authorization: `Bearer ${token}` };
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios", error.response?.data || error.message);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario", error.response?.data || error.message);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario", error.response?.data || error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar usuario", error.response?.data || error.message);
    throw error;
  }
};
