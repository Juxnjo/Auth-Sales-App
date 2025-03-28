import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const loginRequest = async (email, password, captchaToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
      captchaToken,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};
