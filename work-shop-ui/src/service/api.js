import axios from 'axios';

const API_URL = 'http://localhost:5010/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkUsernameAvailability = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/user/check-username`, {
      params: { username }
    });
    return response.data.available;
  } catch (error) {
    throw error.response.data;
  }
};
export const authService = {
    login: async (credentials) => {
      try {
        const response = await axios.post(`${API_URL}/user/login`, credentials);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
    },
    
    // ฟังก์ชันอื่นๆ ที่เกี่ยวข้องกับการ authenticate
  };