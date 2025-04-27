import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')
        if (accessToken && config.headers ) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle Common Errors Globally
        if (error.response) {
            if (error.response.status === 401) {
                //Redirect To Login page
                window.location.href = '/login';
            } else if (error.response.status === 500) {
                console.error("Server Error,Please Try Again Later")
            }
        }
        else if (error.code === 'ECONNABORTED') {
            console.error("Connection Timed Out")
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;

// import axios from 'axios';
// import { BASE_URL } from './apiPaths';

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('token');
//     if (accessToken && config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         window.location.href = '/login';
//       } else if (error.response.status === 500) {
//         console.error('Server Error, Please Try Again Later');
//       }
//     } else if (error.code === 'ECONNABORTED') {
//       console.error('Connection Timed Out');
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
