import Toasts from '../scripts/Toasts.js';


export const registerUser = async (userData) => {
    //const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    const API_BASE_URL = "http://192.168.1.33:8000";
    console.log('API_BASE_URL:', API_BASE_URL);
    try {
      const response = await fetch(`${API_BASE_URL}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Toasts.showErrorToast(errorData.detail || 'Error al registrar l\'usuari');
        throw new Error(errorData.detail || 'Error al registrar l\'usuari');
      }
  
      const data = await response.json(); 
  
      Toasts.showSuccessToast('Usuari creat correctament!');
  
      return data;
  
    } catch (error) {
      console.error('Error al registrar l\'usuari:', error);
      throw error;
    }
  };

  export default {
    registerUser,
};