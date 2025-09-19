import axios from 'axios'

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL_MOBILE,
    headers: {
      'Content-Type': 'application/json'
    }
  })

export default api;