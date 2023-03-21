import axios from 'axios'
import jwt_decode from "jwt-decode";
import { refreshToken } from './accountsSlice'

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: 'https://localhost:7044',
    headers: { Authorization: `Bearer ${token}` }
  });

let store

export const injectStore = _store => {
  store = _store
}

instance.interceptors.request.use(
  async (config) => {         
    let currentDate = new Date();

    const decodedToken = jwt_decode(token);   

    if (decodedToken.exp < currentDate.getTime()) {
      const rftoken = localStorage.getItem("rftoken")
        await store.dispatch(refreshToken(rftoken));
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;