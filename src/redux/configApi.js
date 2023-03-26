import axios from 'axios'
import jwt_decode from "jwt-decode";
import { refreshToken } from './accountsSlice'
import { useNavigate } from "react-router-dom";
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

    if (new Date(decodedToken.exp * 1000) < currentDate) {
      const rftoken = localStorage.getItem("rftoken")
        await store.dispatch(refreshToken(rftoken));
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   response => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config

//     if (
//       error.response.status === 401 
//     ) {
//       navigator('/login')
//       return Promise.reject(error)
//     }

//     if (error.response.status === 403 ) {
//       // const rftoken = localStorage.getItem("rftoken")
//       // await store.dispatch(refreshToken(rftoken));
//       // ("/login")
//     }
//     return Promise.reject(error)
//   }
// )
export const AxiosInterceptorsSetup = navigate => {
  instance.interceptors.response.use(
      response => response,
      error => {
          if (error.response.status === 401) {
            
              navigate('/login');
          }
          if(error.response.status === 403){
            
          }
          return Promise.reject(error);
      }
  );
};



export default instance;