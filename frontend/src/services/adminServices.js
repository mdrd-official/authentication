import axios from "axios";

const BASE_URL = "http://localhost:3001/api/admin";
export const adminLoginDetails = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getUserLists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getUser = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const addUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addUser`, formData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const editUser = async (id, userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/edit-user`, {
      userData,
      id,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-user/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
