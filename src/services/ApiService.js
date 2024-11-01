import axios from 'axios';

const API_KEY = 'a58d09209c304872a01a3556e2f0c6c9';
const BASE_URL = 'https://api.spoonacular.com/food/products';

const ApiService = {
  // Search dishes by query
  searchDishes: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          apiKey: API_KEY,
          query: query,
          number: 10
        }
      });
      return response.data.products;
    } catch (error) {
      console.error('Error searching dishes:', error);
      return [];
    }
  },

  // Get dish details by ID
  getDishDetails: async (dishId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${dishId}`, {
        params: {
          apiKey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dish details:', error);
      return null;
    }
  }
};

export default ApiService;