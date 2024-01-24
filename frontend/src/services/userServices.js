import axios from "axios";

const BASE_URL = "http://localhost:3001/api/users";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
}
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/logout`,{
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const updateUserProfile = async (userData) => {

  try {
    const response = await axios.post(`${BASE_URL}/profile`, userData, {
     
      withCredentials: true,
    });
   
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
export const deleteUserProfile = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
