// src/api/hotelApi.js
import axios from 'axios';

export const fetchHotels = async () => {
  try {
    const response = await axios.get('../../data/hotel.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};
