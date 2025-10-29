import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_URL = `${BASE_URL}/api/contacts`;

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

export const getAllContacts = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getContact = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createContact = async (contactData) => {
  const response = await axios.post(API_URL, contactData);
  return response.data;
};

export const updateContact = async (id, contactData) => {
  const response = await axios.put(`${API_URL}/${id}`, contactData);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};