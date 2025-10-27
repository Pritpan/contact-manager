import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/contacts';

export const getAllContacts = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const getContact = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
};

export const createContact = async (contactData) => {
  try {
    const response = await axios.post(API_URL, contactData);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

export const updateContactService = async (id, contactData) => {
  try {
    console.log('Updating Contact:', id, contactData); // Debugging
    const response = await axios.put(`${API_URL}/${id}`, contactData);
    console.log('Update Response:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

export const deleteContactService = async (id) => {
  try {
    console.log('Deleting Contact:', id); // Debugging
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log('Delete Response:', response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};