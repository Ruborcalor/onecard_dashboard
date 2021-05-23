import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'https://api.mcgillonecard.com:2999/'
      : 'https://api.mcgillonecard.com:2999/',
})

// axiosInstance.defaults.withCredentials = true

export default axiosInstance
