import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return response.data;
  },
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', data);
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    document.cookie = `token=${access_token}; path=/`;
    return response.data;
  }
};

export const stepsApi = {
  submitStepOne: async (data: any) => {
    try {
      const response = await api.post('/steps/shipment', data);
      return response.data;
    } catch (error: any) {
      console.error('Full error:', error.response?.data || error);
      throw error;
    }
  },

  submitStepTwo: async (data: { products: any[] }, shipmentId: string) => {
    try {
      const response = await api.put(`/steps/shipment/${shipmentId}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Full error:', error.response?.data || error);
      throw error;
    }
  }
};